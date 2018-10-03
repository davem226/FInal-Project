import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Containers/Subs";
import { InfoContainer, AuthContainer } from "../../components/Containers"
import { Tab, AuthForm, SignupBtn, LoginBtn } from "../../components/Forms";
import "./Home.css";

export class Home extends Component {
    state = {
        shown: "",
    };

    componentDidMount() {
        this.setState({ shown: "onload" });
    };

    changeView = view => this.setState({ shown: view });

    render() {
        return (
            <Container id="main">
                <InfoContainer />

                {this.state.shown === "onload" ? (
                    <AuthContainer>
                        <Tab />
                        <div className="onload">
                            <LoginBtn onClick={() => this.changeView("login")} />
                            <SignupBtn onClick={() => this.changeView("signup")} />
                        </div>
                    </AuthContainer>
                ) : this.state.shown === "signup" ? (
                    <AuthContainer>
                        <Tab>
                            <LoginBtn onClick={() => this.changeView("login")} />
                            <SignupBtn onClick={() => this.changeView("signup")} />
                        </Tab>
                        <AuthForm />
                        <Link to="/profile">
                            <SignupBtn />
                        </Link>
                    </AuthContainer>
                ) : this.state.shown === "login" ? (
                    <AuthContainer>
                        <Tab>
                            <LoginBtn onClick={() => this.changeView("login")} />
                            <SignupBtn onClick={() => this.changeView("signup")} />
                        </Tab>
                        <AuthForm />
                        <Link to="/profile">
                            <LoginBtn />
                        </Link>
                    </AuthContainer>
                ) : ("")
                }
            </Container>
        );
    }
}