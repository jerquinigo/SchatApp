import React, {Component} from "react";
import Login from "./Login.js"


class MainSignupLoginForm extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <span>main login form</span>
                <Login/>
            </div>
        )
    }
}

export default MainSignupLoginForm;