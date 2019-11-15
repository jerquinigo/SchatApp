import React, { Component } from "react";
import openSocket from "socket.io-client";
//import { runInThisContext } from "vm";
const socket = openSocket("http://localhost:3100/");

class MainChat extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			chatBoxText: "",
			broadcast: [],
			broadcastCurrTyping: ""
		};

		// socket.on("message", (username, text) => {
		// 	console.log("message");
		// 	this.addMessage(username, text);
		// });
		// socket.on("join", username => {
		// 	console.log("Someone joined.");
		// 	this.addMessage(username, "joined");
		// });
		// socket.on("leave", username => {
		// 	console.log("Someone left.");
		// 	this.addMessage(username, "left");
		// });

	}

	componentDidMount() {
		socket.on("chat", data => {

			this.setState({
				broadcastCurrTyping: "",
				broadcast: [...this.state.broadcast, data]
			});
		});

		socket.on("typing", data => {
			this.setState({
				broadcastCurrTyping: data
			});
		});
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleCurrentTyping = e => {
		socket.emit("typing", this.state.username);
	};

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
						onKeyPress={this.handleCurrentTyping}
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
			broadcastName: this.state.username,
			message: this.state.chatBoxText
		});
		this.setState({
			chatBoxText: ""
		});
	};

	displayMessageOnScreen = () => {
		if (this.state.broadcast.length !== 0) {
			return this.state.broadcast.map(el => {
				return (
					<div>
						<span>{el.broadcastName}: </span>
						<span>{el.message}</span>
					</div>
				);
			});
		}
	};

	displayCurrentTyper = () => {
		if(this.state.broadcastCurrTyping !== ""){
		return(
			<div>
	<span>{this.state.broadcastCurrTyping} is now typing...</span>
			</div>
		)
		}
	}

	render() {
		console.log(this.state.broadcastCurrTyping);
		return (
			<div>
				Main chat component
				{this.displayInputFields()}
				{this.displayMessageOnScreen()}
				{this.displayCurrentTyper()}
			</div>
		);
	}
}

export default MainChat;
