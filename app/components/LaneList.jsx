import React from 'react';
import Autobind from 'autobind-decorator';
import Lane from './Lane.jsx';

@Autobind
class LaneList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const lanes = this.props.lanes || [];

        return (
            <div className="lane-list">
                {
                   lanes.map(lane => <Lane className="lane" key={lane.id} lane={lane} />)
                }
            </div>
        );
    }
}

export default LaneList;