import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Containers/Subs";
import { TopicContainer, ArticleContainer, TopicList } from "../../components/Containers"
import { AppName } from "../../components/Logo";
import Message from "../../components/Message";
import { ArticleSearch, SearchBtn, IsLiked } from "../../components/Forms";
import Topic from "../../components/Topic";
import Article from "../../components/Article";
import news from "../../utils/news";
import API from "../../utils/api";
import LogReg from "../../utils/LogReg";
import "./Profile.css";

export class Profile extends Component {
    state = {
        uid: "",
        isAuthenticated: false,
        query: "",
        contents: [],
        topicShown: "",
        toBeRated: [],
        θ: []
    };
    componentDidMount() {
        // Ensure user is logged in
        const uid = document.getElementById("root").getAttribute("uid");
        this.setState({ uid: uid });
        if (!uid) break;
        this.showSavedArticles(uid);
    };
    showSavedArticles(uid) {
        // Array of parameters specific to user
        const θ = this.estimateParameters(uid);
        if (!θ) return null;

        // Array of articles JSON for each topic
        const contents = this.getContents(uid);
        if (!contents) return null;

        // Keep only the articles the user is predicted to like
        const filteredContents = this.filterArticles(θ, contents);
        // Render articles in DOM; Save θ for use if user add new topic during session
        this.setState({ contents: filteredContents, θ: θ });
    };
    async estimateParameters(uid) {
        const LR = new LogReg;
        let reviewedArticles = await API.getArticles(uid);
        if (reviewedArticles.length === 0) return null;
        const analyzableData = LR.processData(reviewedArticles);
        return LR.fit(analyzableData, 1000);
    };
    async getContents(uid) {
        let savedTopics = await API.getTopics(uid);
        if (savedTopics.length === 0) return null;
        let newsAPIresults = savedTopics.map(topic => {
            let articleJSON = await news.get(topic);
            return articleJSON;
        });
        return this.parseArticleJSON(savedTopics, newsAPIresults);
    };
    filterArticles = (θ, contents) => {
        const sentiments = this.sentimentAnalysis(contents);
        // Map through each article of each topic and predict if user will like it
        return contents.map(content => {
            const filteredArticles = content.articles.map(article => {
                // "Add" sentiment scores to each article so LR.predict can run on it 
                const updatedArticle = Object.assign({}, article, {
                    ...article,
                    sentimentTitle: sentiments.find(entry => entry.id === `${content.topic}-${article.id}-title`).score,
                    sentimentPreview: sentiments.find(entry => entry.id === `${content.topic}-${article.id}-preview`).score,
                });
                const LR = new LogReg;
                return LR.predict(θ, updatedArticle, 0.5) ? updatedArticle : null;
                // Filter out articles user predicted to not like
            }).filter(article => article);

            // "Update" each contents object
            return Object.assign({}, content, {
                ...content,
                articles: filteredArticles
            });
        });
    };
    // Outputs array of objects with sentiment scores
    async sentimentAnalysis(contents) {
        // Concatenate all titles and previews into one array
        const documents = [];
        contents.map(content => {
            content.articles.map(article => {
                documents.push({ language: "en", id: `${content.topic}-${article.id}-title`, text: article.title });
                documents.push({ language: "en", id: `${content.topic}-${article.id}-preview`, text: article.preview });
            });
        });
        let results = await news.sentiment({ documents });
        return results.documents;
    };
    parseArticleJSON = (topics, newsResults) => {
        return topics.map((topic, i) => {
            return {
                topic: topic,
                articles: newsResults[i].data.articles.map((article, j) => {
                    return {
                        id: j,
                        source: article.source.name,
                        link: article.url,
                        title: article.title,
                        preview: article.description
                    }
                })
            };
        });
    };
    async searchArticles(topic) {
        if (!topic) return null;
        this.saveTopic({ topic: topic, uid: this.state.uid });
        let articleJSON = await news.get(topic);
        const content = this.parseArticleJSON([topic], articleJSON);
        let filteredContent = this.filterArticles(this.state.θ, [content]);

        // Update state
        this.setState(state => { return { contents: [...state.contents, filteredContent] } });
        document.getElementById("article-search").reset();
    };
    saveTopic = ({ topic, uid }) => {
        API.saveTopic({ topic, uid })
            .then(res => null)
            .catch(err => console.log(err));
    };
    showArticles = (topic) => {
        this.setState({ topicShown: topic });
    };
    showIsLiked = (id) => {
        this.setState(state => {
            return {
                toBeRated: state.toBeRated.concat(id)
            }
        });
    };
    saveChoice = (choice, uid, article, articleID) => {
        API.saveArticle({
            source: article.source.name,
            title: article.title,
            preview: article.description,
            uid: uid,
            choice: choice
        }).catch(err => console.log(err));

        this.setState(state => {
            return {
                toBeRated: state.toBeRated.filter(i => i !== articleID)
            }
        });
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <Container id="profile">
                <TopicContainer>
                    <AppName />
                    <Link to="/">
                        <div id="logout">Log Out</div>
                    </Link>
                    <Message id="enter" text="Enter a topic and get your personalized news!" />
                    <ArticleSearch
                        onchange={this.handleInputChange}
                    >
                        <SearchBtn onClick={() => this.searchArticles(this.state.query)} />
                    </ArticleSearch>

                    <TopicList>
                        {this.state.contents.map(x => (
                            <Topic
                                topic={x.topic}
                                onclick={() => this.showArticles(x.topic)}
                            />
                        ))}
                    </TopicList>
                </TopicContainer>
                {this.state.topicShown ? (
                    <ArticleContainer>
                        {this.state.contents.filter(x =>
                            x.topic === this.state.topicShown)[0].articles
                            .map((article, i) => (
                                < Article
                                    id={i}
                                    link={article.url}
                                    title={article.title}
                                    source={article.source.name}
                                    preview={article.description}
                                    onclick={() => this.showIsLiked(i)}
                                >
                                    {this.state.toBeRated.includes(i) ? (
                                        <IsLiked
                                            onYesClick={() => this.saveChoice("yes", this.state.uid, article, i)}
                                            onNoClick={() => this.saveChoice("no", this.state.uid, article, i)}
                                        />
                                    ) : ("")}
                                </Article>
                            ))
                        }
                    </ArticleContainer>
                ) : ("")
                }
            </Container>
        );
    }
}