import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './OauthPopup.scss';

class OauthPopup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			name: 'New User'
		};

		this.logIn = this.logIn.bind(this);
	}

	logIn() {
		const OAuth = require( '../../../node_modules/oauthio-web/dist/oauth.js' );
		OAuth.OAuth.initialize('No2d6YEh-siKpGj1Coq-yl8whNY');
		OAuth.OAuth.popup('instagram').done(function(instagram) {
			//make API calls with `instagram`
			console.log(instagram);
			this.setState({
				name: 'Stephanie'
			});

		}.bind(this)).fail(function(err) {
			console.log('popup failed');
		});
	}

	render() {
		return(
			<a className={s.oauthLogin} href="#" onClick={this.logIn}>Hello, {this.state.name}</a>
		)
	}
}

export default withStyles(OauthPopup, s);