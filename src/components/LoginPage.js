import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import setupAxios from "../axios/setup";

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "Tigran Minasyan",
			// username: "Ashot Ghazaryan",
			// password: "asdasdasd",
			password: "Tigran00",
			usernameError: "",
			passwordError: "",
		};
	}

	componentDidMount() {
		const cookies = new Cookies();
		if (!!cookies.get("token")) this.props.history.push("/profile");
	}
	onUsernameChange = (e) => {
		const username = e.target.value;
		this.setState(() => ({ username }));
	};
	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};
	onFormSubmit = (e) => {
		e.preventDefault();

		let error = false;

		this.setState(() => ({
			usernameError: "",
			passwordError: "",
		}));

		const { username, password } = this.state;

		if (!username) {
			error = true;
			this.setState(() => ({ usernameError: "Please write your username" }));
		}
		if (!password) {
			error = true;
			this.setState(() => ({ passwordError: "Please write your password" }));
		} else if (password.length < 8) {
			error = true;
			this.setState(() => ({ passwordError: "Password is too short!" }));
		}

		if (!error) {
			axios
				.post("http://localhost:8000/users/login", {
					username,
					password,
				})
				.then((res) => {
					const cookie = new Cookies();
					cookie.set("token", res.data);
					setupAxios();
					this.props.history.push("/profile");
				})
				.catch((e) => {
					console.log(e.response);
					this.setState(() => ({
						usernameError: "Incorrect username or password!",
					}));
				});
		}
	};

	render() {
		return (
			<div>
				<h1>Medical Center Application</h1>
				{this.state.usernameError && (
					<p className="error">{this.state.usernameError}</p>
				)}
				{this.state.passwordError && (
					<p className="error">{this.state.passwordError}</p>
				)}
				<form onSubmit={this.onFormSubmit}>
					<input
						placeholder="Username"
						value={this.state.username}
						onChange={this.onUsernameChange}
					/>
					<input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
					<button>Log in</button>
				</form>
			</div>
		);
	}
}
