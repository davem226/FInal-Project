import API from "./api";

export default class LogReg {
    // Get articles data from db for specific user
    getData = uid => {
        API.getArticles(uid)
            .then(res => {
                return this.processData(res.data);
            }).catch(err => console.log(err));
    };
    // Make prediction
    predict = (θ, row, cutoff) => {
        const x = [1, ...Object.keys(row).filter(col => col !== "choice").map(col => row[col])];
        const z = x.reduce((acc, val, i) => acc + val * θ[i]);
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
            θ = θ.map((x, i) => x + η * gradients[i]);
            repeat--;
        }
        return θ;
    };
    // Make data analyzable
    processData = data => {
        // Run sentiment analyses (Microsoft Azure)
        const sentimentTitle = this.sentimentAnalysis(data, "title");
        const sentimentPreview = this.sentimentAnalysis(data, "preview");

        // Dummy code categorical data
        const dummySource = this.dummyCode(data, "source");

        // Concatenate data
        // Might have to async-await this with the sentimentAnalysis calls
        return (
            data.map(row => {
                return {
                    choice: row.choice === "yes" ? 1 : 0,
                    sentimentTitle: sentimentTitle.find(obj => obj.id === row.id).score,
                    sentimentPreview: sentimentPreview.find(obj => obj.id === row.id).score,
                    ...dummySource.find(obj => obj.id === row.id)
                };
            })
        );
    };
    // Outputs array of objects with dummy coded categorical variables
    dummyCode = (data, column) => {
        const categories = data.filter((row, i) => data.indexOf(row[column]) === i);
        return (
            data.map(row => {
                const dummyData = { id: row.id };
                categories.map(cat => {
                    dummyData[`${column}_${cat}`] = row[column] === cat ? 1 : 0;
                });
                return dummyData;
            })
        );
    };
}