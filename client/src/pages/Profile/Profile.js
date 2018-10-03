import React, { Component } from "react";
import Container from "../../components/Containers/Subs";
import { TopicContainer, ArticleContainer, TopicList } from "../../components/Containers"
import { AppName } from "../../components/Logo";
import Message from "../../components/Message";
import { ArticleSearch, SearchBtn, isLiked } from "../../components/Forms";
import Topic from "../../components/Topic";
import Article from "../../components/Article";
import "./Profile.css";

export class Profile extends Component {
    state = {
        query: "",
        topics: {},
        isSelected: ""
    };

    componentDidMount() {
        this.getTopics();
    };

    getTopics = () => {

    };

    searchArticles = () => {

    };

    saveChoice = () => {

    };

    render() {
        return (
            <Container id="profile">
                <TopicContainer>
                    <AppName />
                    <Message id="enter" text="Enter a topic and get your personalized news!" />
                    <ArticleSearch>
                        <SearchBtn onClick={() => this.searchArticles} />
                    </ArticleSearch>

                    <TopicList>
                        <Topic />
                    </TopicList>
                </TopicContainer>
                <ArticleContainer>
                    <Article>
                        <isLiked onClick={() => this.saveChoice} />
                    </Article>
                </ArticleContainer>
            </Container>
        );
    }
}