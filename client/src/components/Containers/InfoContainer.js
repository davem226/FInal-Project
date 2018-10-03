import React from "react";
import Container from "./Subs/Container";
import { AppName } from "../Logo";
import Message from "../Message";

export const InfoContainer = () => (
    <Container id="info">
        <AppName />
        <Message id="signup" text="SIGN UP now to get personalized news!" />
        <Message id="free" text="It's quick and FREE!" />
    </Container>
);