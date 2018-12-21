export default class LogReg {
    predict = (θ, article, cutoff) => {
        const z = this.z(θ, this.X(θ, article));
        const σ = z => 1 / (1 + Math.exp(-z));
        // P is probability of positive response (i.e. y=1)
        const P = σ(z);
        console.log("id: " + article.id);
        console.log("Prob: " + P);
        // Make prediction
        return P > cutoff ? 1 : 0;
    };
    X = (θ, article) => {
        return θ.map(θobj => {
            const key = Object.keys(θobj)[0];
            // The intercept x-value is set to 1 by assumption
            if (key === "intercept") return { [key]: 1 };
            // Return value of all non dummy-coded columns (except the intercept of course)
            else if (article[key]) return { [key]: article[key] };
            // Return 1 for matching dummy-coded column
            else if (key.split("_")[1] === article.source) return { [key]: 1 };
            // Return 0 for all unmatched dummy-coded columns
            else return { [key]: 0 }
        });
    }
    z = (θ, X) => {
        return X.reduce((acc, x) => {
            const key = Object.keys(x)[0];
            // Find θ and X values for the same data column
            const xVal = x[key];
            const θVal = θ.find(obj => Object.keys(obj)[0] === key)[key];
            return acc + xVal * θVal;
        }, 0);
    }
    // Estimate parameter values of logistic regression model
    fit = (data, repeat) => {
        const σ = z => 1 / (1 + Math.exp(-z));
        const η = 0.05;
        // Initialize parameters to zero, including intercept
        let θ = [{ intercept: 0 }, ...Object.keys(data[0]).filter(col => col !== "choice").map(col => { return { [col]: 0 } })];
        // Repeat many times
        while (repeat) {
            const gradients = [{ intercept: 0 }, ...Object.keys(data[0]).filter(col => col !== "choice").map(col => { return { [col]: 0 } })];
            // Calculate gradients by summing values over each data point
            data.map(row => {
                const X = this.X(θ, row);
                const z = this.z(θ, X);
                // Update the gradient of each parameter using the current data point
                gradients.map((grad, i) => {
                    const key = Object.keys(grad)[0];
                    const XVal = X.find(obj => Object.keys(obj)[0] === key)[key];
                    gradients[i][key] = grad[key] + (row.choice - σ(z)) * XVal;
                });
            });
            // Update parameters after gradients are calculated
            θ = θ.map(obj => {
                const key = Object.keys(obj)[0];
                const gradVal = gradients.find(obj => Object.keys(obj)[0] === key)[key];
                const θold = obj[key];
                const θnew = θold + η * gradVal;
                return {
                    [key]: θnew
                }
            });
            repeat--;
        }
        return θ;
    };
    // Make data analyzable
    processData = data => {
        // Dummy code categorical data
        // const dummySource = this.dummyCode(data, "source");

        // Concatenate data
        return data.map(row => {
            return {
                choice: row.choice === "yes" ? 1 : 0,
                sentimentTitle: row.sentimentTitle,
                sentimentPreview: row.sentimentPreview,
                // ...dummySource.find(obj => obj.id === row.id)
            };
        })
    };
    // Outputs array of objects with dummy coded categorical variables
    dummyCode = (data, column) => {
        const categories = data.filter((row, i) => i === data.findIndex(obj => obj[column] === row[column])).map(row => row[column]);
        return data.map(row => {
            const dummyData = { id: row.id };
            categories.map(cat => {
                dummyData[`${column}_${cat}`] = row[column] === cat ? 1 : 0;
            });
            return dummyData;
        });
    };
}