import React from 'react';
import Autobind from 'autobind-decorator';

@Autobind
class NavMenuItem extends React.Component{
    render(){
        const {action, name, ...props} = this.props;

        return (
            <li className="menu__col">
                <a className="menu__link" onClick={action}>{name}</a>
            </li>
        );
    }
}

export default NavMenuItem;