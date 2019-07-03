import React from 'react';

import classes from './Modal.module.css';
import Fragment from '../../../Fragment';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) { // Modal updates only upon show. This improves props.children aka OrderSummary rendering
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
        }
    componentWillUpdate () {
        console.log('[Modal] WILLUpdate')
    }
    render () {
        return (
            <Fragment>
                <Backdrop show ={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
};

export default Modal;