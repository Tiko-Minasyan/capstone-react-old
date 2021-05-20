import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			surname: "",
			profession: "",
			rendered: false
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		axios.get('http://localhost:3000/profile')
		.then((res) => {
			if(res.data.admin) {
				this.props.history.push('/admin/profile')
			}
			this.setState(() => ({
				name: res.data.name,
				surname: res.data.surname,
				profession: res.data.profession,
				rendered: true
			}))
		}).catch(() => {
			console.log('Please log in');
			cookies.remove('token');
			this.props.history.push('/');
		})
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
					<h1>Welcome, {this.state.name} {this.state.surname}, {this.state.profession}</h1>
					<span id='logout' onClick={this.logout}>Logout</span>
					<Link to='/edit'>Edit account</Link>
				</div>
			)
		}
	}
}