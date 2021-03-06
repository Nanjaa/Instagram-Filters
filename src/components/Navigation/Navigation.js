/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';
import OauthPopup from "../OauthPopup/OauthPopup.js";

function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <OauthPopup />
      <Link className={s.link} to="/hello">Hello</Link>
      <Link className={s.link} to="/about">About</Link>
      <Link className={s.link} to="/contact">Contact</Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/login">Log in</Link>
      <span className={s.spacer}>or</span>
      <p>Hello there! About - Sign Up can be found in components > Navigation > Navigation.js</p>
      <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
};

export default withStyles(Navigation, s);