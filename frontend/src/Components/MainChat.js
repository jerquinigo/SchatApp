import React, { Component } from "react";
import openSocket from "socket.io-client";
import { runInThisContext } from "vm";
const socket = openSocket("http://localhost:3100/");

class MainChat extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
            chatBoxText: "",
            broadcast: [],
            broadcastName: [],
            broadcastText: []
		};

		socket.on("message", (username, text) => {
			console.log("message");
			this.addMessage(username, text);
		});
		socket.on("join", username => {
			console.log("Someone joined.");
			this.addMessage(username, "joined");
		});
		socket.on("leave", username => {
			console.log("Someone left.");
			this.addMessage(username, "left");
		});
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
    };
    
    componentDidMount(){
        socket.on("chat", (data) => {
            let nameServ = data.mainName
            let message = data.message
            this.setState({
                [...this.state.broadcast],

            })
        })
    }

    // this.setState(() => ({
    //     person: {
    //       ...this.state.person,
    //       firstName: "Tom",
    //       secondName: "Jerry"
    //     }
    //   }));

	displayInputFields = () => {
		return (
			<div>
				<form onSubmit={this.sendMessage}>
					<input
						type="text"
						onChange={this.handleChange}
						value={this.state.username}
						name="username"
						placeholder="username"
					/>
					<input
						type="text"
						onChange={this.handleChange}
						value={this.state.chatBoxText}
						name="chatBoxText"
						placeholder="enter message"
					/>
					<input type="submit" />
				</form>
			</div>
		);
	};

	sendMessage = e => {
		e.preventDefault();
		socket.emit("chat", {
			message: this.state.chatBoxText,
			mainName: this.state.username
		});
		this.setState({
			chatBoxText: ""
		});
	};


    // displayUsernameOnScreen = () => {
    //     if(this.state.broadcastName.length !== 0 && this.state.broadcastText.length !== 0){
    
    //     return this.state.broadcastName.map(el => {
    //         return(
    //             <div>
    //     <span>{el}:</span>
    //             </div>
    //         )
    //     })
    //     }
    //     else return null
    // }

    // displayMessagesOnScreen = () => {
    //     if(this.state.broadcastName.length !== 0 && this.state.broadcastText.length !== 0){
    
    //     return this.state.broadcastText.map(el => {
    //         return(
    //             <div>
    //     <span>{el}</span>
    //             </div>
    //         )
    //     })
    //     }
    //     else return null
    // }

	render() {

		console.log(this.state);
		return (
			<div>
				Main chat component
				{this.displayInputFields()}
                {this.displayUsernameOnScreen()}
                {this.displayMessagesOnScreen()}
               
        

			</div>
		);
	}
}

export default MainChat;
