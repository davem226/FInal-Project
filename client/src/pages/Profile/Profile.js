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
        articles: [],
        isSelected: ""
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
        this.showTopic();


    };

    showTopic = () => {
        const newTopic = this.state.query;
        const newArticle = { topic: newTopic };
        if (newTopic) {
            this.setState((state) => {
                return {
                    articles: state.articles.concat(newArticle),
                    query: ""
                };
            });
        }
        document.getElementById("article-search").reset();
    };

    showArticles = (event, topic) => {
        event.preventDefault();

    };

    saveChoice = () => {

    };

    render() {
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
                        {this.state.articles.map(article => (
                            <Topic
                                topic={article.topic}
                                onClick={this.showArticles}
                            />
                        ))}
                    </TopicList>
                </TopicContainer>
                <ArticleContainer>
                    <Article>
                        <IsLiked onClick={() => this.saveChoice} />
                    </Article>
                </ArticleContainer>
            </Container>
        );
    }
}