import React from "react";
import { useSelector } from "react-redux";

export const User = () => {
    const user = useSelector((state) => state.user);

    const signedInUser = (user) => {
        return <div>User: {user.username}</div>;
    };

    const noUser = () => {
        <div>
            <a href="~/pages/Signin">Signin</a>/<a href="~/pages/Register">Register</a>
        </div>;
    };

    return <div>{user.username !== "" ? signedInUser(user) : noUser()}</div>;
};
