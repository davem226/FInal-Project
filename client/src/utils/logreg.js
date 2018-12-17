export default class LogReg {
    predict = (θ, article, cutoff) => {
        // Construct X array
        const X = θ.map(θobj => {
            const key = Object.keys(θobj)[0];
            if (key === "intercept") return { key: 1 };
            // Return value of all non dummy-coded columns (except the intercept of course)
            else if (article[key]) return { key: article[key] };
            // Return 1 for matching dummy-coded column
            else if (key.split("_")[1] === article.source) return { key: 1 };
            // Return 0 for all unmatched dummy-coded columns
            else return { key: 0 }
        });
        // Make prediction
        const z = X.reduce((acc, x) => {
            const key = Object.keys(x)[0];
            // Find θ and X values for the same data column
            const xVal = x[key];
            const θVal = θ.find(obj => obj[key])[key];
            return acc + xVal * θVal;
        });
        const σ = z => 1 / (1 + Math.exp(-z));
        // P is probability of positive response (i.e. y=1)
        const P = σ(z);
        return P > cutoff ? 1 : 0;
    };
    // Estimate parameter values of logistic regression model
    fit = (data, repeat) => {
        const σ = z => 1 / (1 + Math.exp(-z));
        const η = 0.05;
        // Initialize parameters to zero, including intercept
        let θ = [{ intercept: 0 }, ...Object.keys(data[0]).filter(col => col !== "choice").map(col => { return { [col]: 0 } })];
        // Repeat many times
        while (repeat) {
            const gradients = [0, ...Object.keys(data[0]).filter(col => col !== "choice").map(col => 0)];
            // Calculate gradients by summing values over each data point
            data.map(row => {
                // The intercept x-value is set to 1
                const x = [1, ...Object.keys(row).filter(col => col !== "choice").map(col => row[col])];
                const z = x.reduce((acc, val, i) => acc + val * θ[i]);
                // Update the gradient of each parameter using the current data point
                gradients.map((grad, i) => {
                    gradients[i] = grad + (row.choice - σ(z)) * x[i];
                });
            });
            // Update parameters after gradients are calculated
            θ = θ.map((obj, i) => { return { [Object.keys(obj)[0]]: Object.values(obj)[0] + η * gradients[i] } });
            repeat--;
        }
        return θ;
    };
    // Make data analyzable
    processData = data => {
        // Dummy code categorical data
        const dummySource = this.dummyCode(data, "source");
        // Concatenate data
        return data.map(row => {
            return {
                choice: row.choice === "yes" ? 1 : 0,
                sentimentTitle: row.sentimentTitle,
                sentimentPreview: row.sentimentPreview,
                ...dummySource.find(obj => obj.id === row.id)
            };
        })
    };
    // Outputs array of objects with dummy coded categorical variables
    dummyCode = (data, column) => {
        const categories = data.filter((row, i) => data.indexOf(row[column]) === i);
        return data.map(row => {
            const dummyData = { id: row.id };
            categories.map(cat => {
                dummyData[`${column}_${cat}`] = row[column] === cat ? 1 : 0;
            });
            return dummyData;
        })
    };
}