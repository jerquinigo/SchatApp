import React, {Component} from "react"

class Signup extends Component{
    constructor(){
        super()
        this.state = {
            username = "",
            password = "",
            isSubmitted = false
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    displaySignupForm = () => {
        return(
        <div>
        <form>
            <input type="text" value="username" />
        </form>
        </div>
        )
    }







    render(){
        return(
            <div>
                signup
            </div>    
        )
    }
}

export default Signup