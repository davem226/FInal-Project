import React, { Component } from "react";
import Container from "../../components/Containers/Subs";
import { TopicContainer, ArticleContainer, TopicList } from "../../components/Containers"
import { AppName } from "../../components/Logo";
import Message from "../../components/Message";
import {ArticleSearch, SearchBtn} from "../../components/Forms";
import Topic from "../../components/Topic";
import "./Profile.css";

export class Profile extends Component {
    state = {
        query: "",
        topics: {},
        isSelected: ""
    };

    componentDidMount() {
        this.getSavedArticles();
    };

    getSavedArticles = () => {

    };

    searchArticles = () => {

    };

    saveChoice = () => {

    };

    render() {
        return (
            <Container id="main">
                <TopicContainer>
                    <AppName />
                    <Message text="Enter a topic and get your personalized news!" />
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