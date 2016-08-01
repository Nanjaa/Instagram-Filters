import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hello.scss';

      	// <Ajax url="https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=ACCESS_TOKEN"


function Hello({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Hello there! This is a test file I made called Hello.js!</p>
      	//<a href="https://api.instagram.com/oauth/authorize/?client_id=223a8cf623554845ab174c0e9d963712&redirect_uri=https://oauth.io/auth&response_type=code">authorize</a>
      </div>
    </div>
  );
}

Hello.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Hello, s);

