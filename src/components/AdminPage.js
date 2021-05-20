import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';

export default class AdminPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			surname: "",
			profession: "",
			rendered: false,
			doctorName: "",
			doctorSurname: "",
			doctorProfession: "",
			doctorPassword: "",
			nameError: "",
			surnameError: "",
			professionError: "",
			passwordError: ""
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		axios.get('http://localhost:3000/profile')
		.then((res) => {
			console.log(res.data.admin)
			if(!res.data.admin) {
				cookies.remove('token');
				this.props.history.push('/');
			}
			this.setState(() => ({
				name: res.data.name,
				surname: res.data.surname,
				profession: res.data.profession,
				rendered: true
			}))

			// document.getElementById('logoutItem').onclick = this.logout;
		}).catch(() => {
			console.log('Please log in');
			this.props.history.push('/');
			cookies.remove('token');
		})
	}
	onDoctorNameChange = (e) => {
		const doctorName = e.target.value
		this.setState(() => ({ doctorName }))
	}
	onDoctorSurnameChange = (e) => {
		const doctorSurname = e.target.value
		this.setState(() => ({ doctorSurname }))
	}
	onDoctorProfessionChange = (e) => {
		const doctorProfession = e.target.value
		this.setState(() => ({ doctorProfession }))
	}
	onDoctorPasswordChange = (e) => {
		const doctorPassword = e.target.value
		this.setState(() => ({ doctorPassword }))
	}
	onFormSubmit = (e) => {
		e.preventDefault()

		let error = false;

		this.setState(() => ({
			nameError: "",
			surnameError: "",
			professionError: "",
			passwordError: ""
		}))

		const { doctorName, doctorSurname, doctorProfession, doctorPassword } = this.state;
		
		if(!doctorName) {
			error = true;
			this.setState(() => ({ nameError: "Please write a name" }))
		}
		if(!doctorSurname) {
			error = true;
			this.setState(() => ({ surnameError: "Please write a surname" }))
		}
		if(!doctorProfession) {
			error = true;
			this.setState(() => ({ professionError: "Please write a profession" }))
		}
		if(!doctorPassword) {
			error = true;
			this.setState(() => ({ passwordError: "Please write a password" }))
		} else if(doctorPassword.length < 8) {
			error = true;
			this.setState(() => ({ passwordError: "Password is too short!" }))
		}

		if(!error) {
			axios.post('http://localhost:3000/register', {
				name: doctorName,
				surname: doctorSurname,
				profession: doctorProfession,
				password: doctorPassword
			}).then((res) => {
				console.log(res);
				this.setState(() => ({
					doctorName: "",
					doctorSurname: "",
					doctorProfession: "",
					doctorPassword: ""
				}))
				document.getElementById('registerDoc').innerHTML = 'Successfully registered!';
			}).catch((e) => {
				console.log(e.response)
				document.getElementById('registerDoc').innerHTML = 'An error occured!';
			})
		}
	}

	logout = () => {
		const cookies = new Cookies();
		axios.get('http://localhost:3000/logout')
		.then(() => {
			cookies.remove('token');
			this.props.history.push('/');
		}).catch((e) => console.log(e))
	}

	render() {
		if(!this.state.rendered) {
			return <div></div>;
		} else {
			return (
				<div>
					<h1>Welcome, admin: {this.state.name} {this.state.surname}, {this.state.profession}</h1>
					<span id='logout' onClick={this.logout}>Logout</span>
					<h3 id='registerDoc'>Register a new doctor</h3>
					{this.state.nameError && <p className='error'>{this.state.nameError}</p>}
					{this.state.surnameError && <p className='error'>{this.state.surnameError}</p>}
					{this.state.professionError && <p className='error'>{this.state.professionError}</p>}
					{this.state.passwordError && <p className='error'>{this.state.passwordError}</p>}
					<form onSubmit={this.onFormSubmit}>
						<input
							placeholder="Doctor name"
							value={this.state.doctorName}
							onChange={this.onDoctorNameChange}
						/>
						<input
							placeholder="Doctor surname"
							value={this.state.doctorSurname}
							onChange={this.onDoctorSurnameChange}
						/>
						<input
							placeholder="Doctor profession"
							value={this.state.doctorProfession}
							onChange={this.onDoctorProfessionChange}
						/>
						<input
							type="password"
							placeholder="Doctor password"
							value={this.state.doctorPassword}
							onChange={this.onDoctorPasswordChange}
						/>
						<button>Register new doctor</button>
					</form>
				</div>
			)
		}
	}
}