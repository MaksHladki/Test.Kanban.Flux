import React from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Autobind from 'autobind-decorator';
import AltContainer from 'alt-container';

import LaneList from './LaneList.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

@DragDropContext(HTML5Backend)
@Autobind
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = { width: 0, height: 0};
        this.menuElement = null;
    }

    addLane(){
       LaneActions.create({
           name: 'New Lane'
       });
    }

    componentDidMount() {
        this.menuElement = ReactDOM.findDOMNode(this.refs.menu);
        this.updateWindowDimensions();
      
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        const menuHeight = this.menuElement.getBoundingClientRect().height;
        this.setState(
            {
                width: window.innerWidth,
                height: window.innerHeight - menuHeight
            }
        );
    }

    render(){
        const {width, height} = this.state;

        return (
            <div className="page-container">
                <div className="menu" ref="menu">
                    <div className="menu__row">
                        <ul className="menu__list">
                            <li className="menu__col">
                                <a className="menu__link" onClick={this.addLane}>Add Lane</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <AltContainer stores={[LaneStore]} inject={{ lanes: () => LaneStore.getState().lanes || [] }}>
                    <LaneList maxHeight={height} />
                </AltContainer>
            </div>
        );
    }
}

export default App;