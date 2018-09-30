import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Subs/Container";
import { InfoContainer, LoginContainer } from "../../components/Containers"
import { SignupBtn, LoginBtn } from "../../components/Forms";
import "./Home.css";

export class Home extends Component {
    state = {
        shown: "onLoad"
    };

    render() {
        return (
            <Container id="main">
                <InfoContainer />

                {this.state.shown === "onLoad" ? (
                    <LoginContainer>
                        <SignupBtn onClick={this.setState({ shown: "signup" })} />
                        <LoginBtn onClick={this.setState({ shown: "login" })} />
                    </LoginContainer>
                ) : this.state.shown === "signup" ? (

                ): ()}


                <div id="signup-div">

                    <Link to="/signup">
                    </Link>
                </div>

                <div id="login-div">
                    <Message text="Already have an account?" />

                    <Link to="/login">
                        <Button id="login-btn" text="Login" />
                    </Link>
                </div>
            </Container>
        );
    }
}