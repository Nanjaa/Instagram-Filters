import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hello.scss';

function Hello({ title }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>Hello there! This is a test file I made called Hello.js!</p>
      </div>
    </div>
  );
}

Hello.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Hello, s);