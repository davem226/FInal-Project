import React, { Component } from "react";
import Container from "../../components/Containers/Subs";
import { TopicContainer, ArticleContainer, TopicList } from "../../components/Containers"
import { AppName } from "../../components/Logo";
import Message from "../../components/Message";
import { ArticleSearch, SearchBtn, IsLiked } from "../../components/Forms";
import Topic from "../../components/Topic";
import Article from "../../components/Article";
import news from "../../utils/news";
import "./Profile.css";

export class Profile extends Component {
    state = {
        query: "",
        contents: [],
        topicShown: ""
    };

    componentDidMount() {
        this.getArticles();
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getArticles = () => {
        console.log("I Understand How React Works")
    };

    searchArticles = event => {
        event.preventDefault();
        if (this.state.query) {
            news.get(this.state.query)
                .then(results => this.addTopic(results))
                .catch(err => console.log(err));
        }
    };

    addTopic = (apiRes) => {
        const newEntry = {
            topic: this.state.query,
            articles: apiRes.data.articles
        }
        console.log(apiRes.data.articles);
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

    saveChoice = () => {

    };

    render() {
        console.log(this.state.contents);
        return (
            <Container id="profile">
                <TopicContainer>
                    <AppName />
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
                            .map(article => (
                                < Article
                                    link={article.url}
                                    title={article.title}
                                    source={article.source.name}
                                    preview={article.description}
                                >
                                    <IsLiked onClick={() => this.saveChoice} />
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