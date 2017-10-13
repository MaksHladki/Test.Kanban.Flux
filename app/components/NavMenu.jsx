import React from 'react';
import Autobind from 'autobind-decorator';

import LaneActions from '../actions/LaneActions';
import NavMenuItem from './NavMenuItem.jsx';

@Autobind
class NavMenu extends React.Component{
    constructor(props){
        super(props);

        this.menuItems = [
            {
                name: 'Add Lane',
                action: this.addLane
            }
        ];
    }

    addLane(){
        LaneActions.create({
            name: 'New Lane'
        });
     }

    render(){
        const menuItems = this.menuItems;

        return (
            <div className="menu" ref="menu">
                <div className="menu__row">
                    <ul className="menu__list">
                        {
                            menuItems.map((menuItem, index) => <NavMenuItem key={index} {...menuItem} /> )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavMenu;

