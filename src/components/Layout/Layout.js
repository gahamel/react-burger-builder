import React from 'react';

import Fragment from '../../Fragment';
// import classes from '*.module.scss';     Boilerplate automatique
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';


const layout = (props) => (
    <Fragment>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;