import React from 'react';
import ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Autobind from 'autobind-decorator';
import AltContainer from 'alt-container';

import NavMenu from './NavMenu.jsx';
import LaneList from './LaneList.jsx';
import LaneStore from '../stores/LaneStore';

@DragDropContext(HTML5Backend)
@Autobind
class App extends React.Component{
    constructor(props){
        super(props);
        
        this.menuElement = null;
        this.state = { 
            contentWidth: 0, 
            contentHeight: 0
        };
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
                contentWidth: window.innerWidth,
                contentHeight: window.innerHeight - menuHeight
            }
        );
    }

    render(){
        const {contentHeight} = this.state;

        return (
            <div className="page-container">
                <NavMenu ref="menu" />
                <AltContainer stores={[LaneStore]} inject={{ lanes: () => LaneStore.getState().lanes}}>
                    <LaneList maxHeight={contentHeight} />
                </AltContainer>
            </div>
        );
    }
}

export default App;