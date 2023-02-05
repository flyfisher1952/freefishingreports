import React from "react";

class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.userName = "Anonymous";
        this.email = "";
        this.country = {};
        this.postalCode = "";
        this.password = "";
    }
}

export default CurrentUser;
