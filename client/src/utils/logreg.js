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

        
    };
    sentimentAnalysis = (data, column) =>{
        const documents = data.map(row => {
            return { language: "en", id: row.id, text: row[column] };
        });
        API.sentiment({ documents })
            .then(results => results.documents)
            .catch(err => console.log(err));
    };
    dummyCode = (data) => {
        const processedData = [];
        const categories = this.uniq(data, "source");
        data.map(row=>{
            categories.map(cat=>{
                row[`source_${cat}`] = row.source===cat?1:0;
            });
        });
        for (let row of data) {
            const datum = {};
            datum.choice = row.choice === "yes" ? 1 : 0;
            for (let i in dummyCols) {
                datum[`source_${dummyCols[i]}`] = row.source === dummyCols[i] ? 1 : 0;
            }
            // console.log(datum);
            processedData.push(datum);
        }
        console.log(processedData);
        return processedData;
    };
    uniq = (data, columnToDummy) => {
    // Try to refactor using .map().filter()
        let uniqCats = [];
        // Create array of unique categories in a categorical data column
        for (let row of data) {
            if (!dummyCols.includes(row[columnToDummy])) {
                uniqCats.push(row[columnToDummy]);
            }
        }
        return uniqCats;
    }
}