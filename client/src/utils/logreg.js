import API from "./api";

export default class LogReg {
    // Get articles data from db for specific user
    getData = uid => {
        API.getArticles(uid)
            .then(res => {
                return this.processData(res.data);
            }).catch(err => console.log(err));
    };
    // Estimate parameter values of logistic regression model
    fit = (data,η) => {
        // Define sigma function
        const σ = z => 1/(1+Math.exp(-z));
        // Initialize parameters to zero
        let θ = Object.keys(data[0]).filter(col=>col!=="choice").map(col=>0);
        data.map(row=>{
            const x = Object.keys(row).filter(col=>col!=="choice").map(col=>row[col]);
            const z = x.map((val,i)=>val*θ[i]);
            const partial = 
        })
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
            data.map(row=>{
                return {
                    choice: row.choice === "yes" ? 1 : 0,
                    sentimentTitle: sentimentTitle.find(obj=>obj.id===row.id).score,
                    sentimentPreview: sentimentPreview.find(obj=>obj.id===row.id).score,
                    ...dummySource.find(obj=>obj.id===row.id)
                };
            })
        );
    };
    // Outputs array of objects with sentiment scores
    sentimentAnalysis = (data, column) => {
        const documents = data.map(row => {
            return { language: "en", id: row.id, text: row[column] };
        });
        API.sentiment({ documents })
            .then(results => results.documents)
            .catch(err => console.log(err));
    };
    // Outputs array of objects with dummy coded categorical variables
    dummyCode = (data, column) => {
        const categories = data.filter((row,i)=>data.indexOf(row[column])===i);
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