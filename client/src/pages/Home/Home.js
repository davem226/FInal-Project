import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { NavBar, Icon, AppName } from "../../components/Nav";
import Container from "../../components/Container";
import { Button } from "../../components/Form";
import Message from "../../components/Message";

class Home extends Component {
    state = {

    };

    render() {
        return (
            <Wrapper>
                <NavBar>
                    <Icon />
                    <AppName />
                </NavBar>

                <Container>
                    <Message text="Signup now to get news you like!" />

                    <Link to="/signup">
                        <Button text="Signup" />
                    </Link>

                    <Message text="Already have an account?" />

                    <Link to="/login">
                        <Button text="Login" />
                    </Link>
                </Container>
            </Wrapper>
        );
    }
}
export default Home;