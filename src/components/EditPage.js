import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie"

export default class EditPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: "",
			password: "",
			confirmPassword: "",
			error: ""
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get('token');
		if(!token) {
			console.log('Please log in');
			this.props.history.push('/');
		}
	}
	backButton = () => {
		this.history.push('/profile');
	}
	onOldPasswordChange = (e) => {
		const oldPassword = e.target.value;
		this.setState(() => ({ oldPassword }));
	}
	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	}
	onConfirmPasswordChange = (e) => {
		const confirmPassword = e.target.value;
		this.setState(() => ({ confirmPassword }));
	}
	onFormSubmit = (e) => {
		e.preventDefault();

		this.setState(() => ({
			error: ""
		}))

		let { oldPassword, password, confirmPassword } = this.state;

		if(!oldPassword) {
			this.setState(() => ({ error: "Please write your old password" }));
		} else if(!password) {
			this.setState(() => ({ error: "Please write your new password" }));
		} else if(password.length < 8) {
			this.setState(() => ({ error: "Password length is too short" }));
		} else if(!confirmPassword) {
			this.setState(() => ({ error: "Please confirm your new password" }));
		} else if(password !== password) {
			this.setState(() => ({ error: "Passwords don't match" }));
		} else {

		}
	}

	render() {
		return (
			<div></div>
		)
	}
}