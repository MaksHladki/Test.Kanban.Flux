import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Scrollbars } from 'react-custom-scrollbars';
import Autobind from 'autobind-decorator';

import Lane from './Lane.jsx';
import LaneActions from '../actions/LaneActions';

@DragDropContext(HTML5Backend)
@Autobind
class LaneList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const lanes = this.props.lanes || [];
        const maxHeight = this.props.maxHeight;
     
        return (
            <Scrollbars style={{ height: maxHeight }}>
                <div className="lane-list">
                    {
                        lanes.map((lane, i) => <Lane className="lane" key={lane.id} lane={lane} index={i} maxHeight={maxHeight} onMove={LaneActions.moveLane} />)
                    }
                </div>
            </Scrollbars>
        );
    }
}

export default LaneList;