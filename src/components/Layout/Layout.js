import React from 'react';

import Fragment from '../../Fragment';
// import classes from '*.module.scss';     Boilerplate automatique
import classes from './Layout.module.css';


const layout = (props) => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;