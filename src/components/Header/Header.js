/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Navigation from '../Navigation';
import oauthio from '../../../bower_components/oauth-js/dist/oauth.js';

OAuth.initialize('No2d6YEh-siKpGj1Coq-yl8whNY')

OAuth.popup('instagram').done(function(instagram) {
  //make API calls with `facebook`
}).fail(function(err) {
  //todo when the OAuth flow failed
});

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation className={s.nav} />
        <Link className={s.brand} to="/">
          <img src={require('./logo-small.png')} width="38" height="38" alt="React" />
          <span className={s.brandTxt}>The logo - the heading can be found in components > Header > Header.js</span>
        </Link>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Instagram Filters</h1>
          <p className={s.bannerDesc}>Sort Your Instagram Feed</p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(Header, s);
