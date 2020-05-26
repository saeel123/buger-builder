import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/original.png'

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;