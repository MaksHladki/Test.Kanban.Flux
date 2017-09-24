import React from 'react';
import Autobind from 'autobind-decorator';
import AltContainer from 'alt-container';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LaneList from './LaneList.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

@Autobind
@DragDropContext(HTML5Backend)
class App extends React.Component{
    addLane(){
       LaneActions.create({
           name: 'New Lane'
       });
    }

    render(){
        return (
            <div>
                <button className="lane-add" onClick={this.addLane}>Add Lane</button>
                <AltContainer 
                    stores={[LaneStore]} 
                    inject={{lanes: () => LaneStore.getState().lanes || []}}>
                        <LaneList />
                </AltContainer>
            </div>
        );
    }
}

export default App;