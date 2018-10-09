import React from "react";
import { Input } from "./Subs/Input";

export const AuthForm = (props) => (
    <form>
        <Input
            id="un"
            name="username"
            value={props.username}
            onChange={props.onchange}
            placeholder="USERNAME"
        />
        <Input
            id="pw"
            name="password"
            value={props.password}
            onChange={props.onchange}
            placeholder="PASSWORD"
            type="password"
        />
    </form>
);