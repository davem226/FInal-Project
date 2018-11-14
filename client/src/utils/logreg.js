import API from "./api";

export default class LogReg {
    // Get articles data from db
    getData = uid => {
        API.getArticles(uid)
            .then(res => {
                return this.processData(res.data);
            }).catch(err => console.log(err));
    };
    // Make data analyzable
    processData = data => {
        // Run sentiment analyses (Microsoft Azure)
        const sentimentTitle = this.sentimentAnalysis(data, "title");
        const sentimentPreview = this.sentimentAnalysis(data, "preview");

        // Get dummy coded categorical data with user's choice
        const dummySource = this.dummyCode(data, "source");

        // Concatenate data
        
    };
    // Outputs array of objects with sentiments scores
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
        const categories = this.uniq(data, column);
        return (
            data.map(row => {
                const dummyData = { id: row.id, choice: row.choice === "yes" ? 1 : 0 };
                categories.map(cat => {
                    dummyData[`${column}_${cat}`] = row.source === cat ? 1 : 0;
                });
                return dummyData;
            })
        );
    };
    // Outputs array of unique categories of a categorical variable
    uniq = (data, columnToDummy) => {
        // Try to refactor using .map().filter()
        let uniqCats = [];
        for (let row of data) {
            if (!dummyCols.includes(row[columnToDummy])) {
                uniqCats.push(row[columnToDummy]);
            }
        }
        return uniqCats;
    }
}