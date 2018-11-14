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

        // Dummy code categorical data
        const dummySource = this.dummyCode(data, "source");

        // Concatenate data
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
                const dummyData = { id: row.id };
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