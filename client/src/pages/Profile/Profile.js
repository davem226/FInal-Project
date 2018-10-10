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
import "./Profile.css";

export class Profile extends Component {
    state = {
        uid: "",
        isAuthenticated: false,
        query: "",
        contents: [],
        topicShown: "",
        toBeRated: []
    };

    componentDidMount() {
        const uid = document.getElementById("root").getAttribute("uid");
        if (uid) { this.getArticles(uid) };
        this.setState({uid: uid});
    };

    getArticles = (uid) => {
        API.getTopics(uid)
            .then(res => {
                res.data.map(x => this.searchArticles(x.topic));
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    searchArticles = (event, savedTopic) => {
        event.preventDefault();
        const topic = savedTopic ? savedTopic : this.state.query;
        if (topic) {
            news.get(topic)
                .then(results => {
                    this.saveTopic({
                        uid: this.state.uid,
                        topic: this.state.query
                    });
                    this.addTopic(this.state.query, results);
                })
                .catch(err => console.log(err));
        }
    };

    saveTopic = ({ topic, uid }) => {
        API.saveTopic({topic, uid})
            .then(res => console.log("topic saved"))
            .catch(err => console.log(err));
    };

    addTopic = (topic, apiRes) => {
        const newEntry = {
            topic: topic,
            articles: apiRes.data.articles
        }
        this.setState((state) => {
            return {
                contents: state.contents.concat(newEntry),
                query: ""
            }
        });
        document.getElementById("article-search").reset();
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

    saveChoice = (id) => {
        this.setState(state => {
            return {
                toBeRated: state.toBeRated.filter(i => i !== id)
            }
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
                        <SearchBtn onClick={this.searchArticles} />
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
                                        <IsLiked onClick={() => this.saveChoice(i)} />
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