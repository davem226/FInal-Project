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
        haveArticles: false,
        contents: [],
        topicShown: "",
        toBeRated: [],
        analysis: {
            θ: [],
            X: []
        }
    };
    componentDidMount() {
        // Save uid in state for use in db calls
        const uid = document.getElementById("root").getAttribute("uid");
        if (uid) {
            this.getArticles(uid);
            this.setState({ uid: uid });
        }
        // Fit logistic regression model
        const LR = new LogReg;
        const reviewedArticles = LR.getData(uid);
        console.log(data);
        this.setState({ analysis: { θ: LR.fit(reviewedArticles, 1000) } });
    };
    getArticles = uid => {
        API.getTopics(uid).then(res => {
            const contents = res.data.map(x => this.searchArticles(x.topic));
            const sentiments = this.sentimentAnalysis(contents);
            const filteredContents = this.filterArticles(sentiments);
            this.setState({
                contents: filteredContents,
                haveArticles: true,
                query: ""
            });
        }).catch(err => console.log(err));
    };
    filterArticles = sentiments => {
        // Predict whether user will like each article
        const LR = new LogReg;
    };
    searchArticles = topic => {
        if (topic) {
            news.get(topic).then(results => {
                if (this.state.query) {
                    this.saveTopic({
                        uid: this.state.uid,
                        topic: this.state.query
                    });
                    document.getElementById("article-search").reset();
                }
                return this.showContent(topic, results);
            }).catch(err => console.log(err));
        }
    };
    // Outputs array of objects with sentiment scores
    sentimentAnalysis = (contents) => {
        // Concatenate all titles and previews into one array
        const documents = [];
        contents.map(topic => {
            topic.articles.map((article, i) => {
                documents.push({ language: "en", id: `${topic.topic}-${i}-title`, text: article.title });
                documents.push({ language: "en", id: `${topic.topic}-${i}-preview`, text: article.preview });
            });
        });
        API.sentiment({ documents })
            .then(results => results.documents)
            .catch(err => console.log(err));
    };
    saveTopic = ({ topic, uid }) => {
        API.saveTopic({ topic, uid })
            .then(res => null)
            .catch(err => console.log(err));
    };
    showContent = (topic, apiRes) => {
        return {
            topic: topic,
            articles: apiRes.data.articles.map((article, i) => {
                return {
                    id: i,
                    source: article.source.name,
                    link: article.url,
                    title: article.title,
                    preview: article.description
                }
            })
        };
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
        })
            .then(res => null)
            .catch(err => console.log(err));

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