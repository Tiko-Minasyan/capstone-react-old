import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import AdminPage from "../components/AdminPage";
import ProfilePage from "../components/ProfilePage";
import EditPage from "../components/EditPage";

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Switch>
				<Route path="/" component={LoginPage} exact={true} />
				<Route path="/admin/profile" component={AdminPage} exact={true} />
				<Route path="/profile" component={ProfilePage} exact={true} />
				<Route path="/edit" component={EditPage} exact={true} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;

// <Route component={NotFoundPage} />
// how to use react context
