import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Container from "../../components/Containers/Subs";
import { InfoContainer, AuthContainer } from "../../components/Containers"
import { Tab, AuthForm, SignupBtn, LoginBtn } from "../../components/Forms";
import API from "../../utils/api";
import "./Home.css";

export class Home extends Component {
    state = {
        shown: "",
        username: "",
        password: "",
        uid: "",
        isAuthenticated: false
    };

    componentDidMount() {
        this.setState({ shown: "onload" });
    };

    componentWillUnmount() {
        if (this.state.uid) {
            document.getElementById("root").setAttribute("uid", this.state.uid);
        }
    }

    changeView = view => this.setState({ shown: view });

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    signup = () => {
        if (this.state.username && this.state.password) {
            API.signUp({
                username: this.state.username,
                password: this.state.password
            })
                .then(res => res.data ? this.authenticateUser(res.data.id) : null)
                .catch(err => console.log(err))
        }
    };

    login = () => {
        if (this.state.username && this.state.password) {
            API.logIn(this.state.username)
                .then(res => {
                    res.data.password === this.state.password ? (
                        this.authenticateUser(res.data.id)
                    ) : null;
                })
                .catch(err => console.log(err))
        }
    };

    authenticateUser = (uid) => {
        this.setState({
            isAuthenticated: true,
            uid: uid
        });
    };

    render() {
        return (
            <Container id="main">
                {this.state.isAuthenticated ? <Redirect to="/profile" /> : null}
                <InfoContainer />

                {this.state.shown === "onload" ? (
                    <AuthContainer>
                        <Tab />
                        <div className="onload">
                            <LoginBtn onclick={() => this.changeView("login")} />
                            <SignupBtn onclick={() => this.changeView("signup")} />
                        </div>
                    </AuthContainer>
                ) : this.state.shown === "signup" ? (
                    <AuthContainer>
                        <Tab>
                            <LoginBtn onclick={() => this.changeView("login")} />
                            <SignupBtn onclick={() => this.changeView("signup")} />
                        </Tab>
                        <AuthForm onchange={this.handleInputChange} />
                        <SignupBtn onclick={this.signup} />
                    </AuthContainer>
                ) : this.state.shown === "login" ? (
                    <AuthContainer>
                        <Tab>
                            <LoginBtn onclick={() => this.changeView("login")} />
                            <SignupBtn onclick={() => this.changeView("signup")} />
                        </Tab>
                        <AuthForm onchange={this.handleInputChange} />
                        <LoginBtn onclick={this.login} />
                    </AuthContainer>
                ) : ("")
                }
            </Container>
        );
    }
}