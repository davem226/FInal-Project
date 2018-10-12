// import jsregression from "js-regression";

// // === Create the linear regression === //
// const logistic = new jsregression.LogisticRegression({
//     alpha: 0.001,
//     iterations: 1000,
//     lambda: 0.0
// });
// module.exports = logistic;

// // can also use default configuration: const logistic = new jsregression.LogisticRegression(); 

// // === Train the logistic regression === //
// const model = logistic.fit(trainingData);

// // === Print the trained model === //
// console.log(model);

// // === Testing the trained logistic regression === //
// for (let i = 0; i < testingData.length; ++i) {
//     const probabilityOfSpeciesBeingIrisVirginica = logistic.transform(testingData[i]);
//     const predicted = logistic.transform(testingData[i]) >= logistic.threshold ? 1 : 0;
//     console.log("actual: " + testingData[i][4] + " probability of being Iris-virginica: " + probabilityOfSpeciesBeingIrisVirginica);
//     console.log("actual: " + testingData[i][4] + " predicted: " + predicted);
// }

