import React, {Component} from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom";
import { Auth } from "../utils/Auth.js";


class Login extends Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            isSubmitted: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginUserSubmit = (e) => {
        debugger
        e.preventDefault()
        const {username, password} = this.state;
        axios.post("/api/sessions/login", {username, password})
        .then(()=> {
            Auth.authenticateUser(username)
        })
        .then(()=> {
            this.props.checkAuthenticationStatus()
        })
        .then(()=> {
            this.setState({
                username: "",
                password: "",
                isSubmitted: true
            })
        })
    }

    // conditionalRouting = () => {
    //     if(this.state.isSubmitted === true){

    //     }
    // }


    loginForm = () => {
        return(
            <div>
            <form onSubmit={this.loginUserSubmit}>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username"></input>
            <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"></input>
            <input type="submit" value="continue"/>
            </form>
            </div>
        )
    }




    render(){
        console.log(this.state)
        return(
            <div>
                Login
                {this.loginForm()}
            </div>    
        )
    }
}

export default Login