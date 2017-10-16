import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import Autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import ItemType from '../constants/itemType';

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
};

const noteTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if(sourceId !== targetId && targetProps.onMove){
            targetProps.onMove({sourceId, targetId});
        }
    }
};

@DragSource(ItemType.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
@DropTarget(ItemType.NOTE, noteTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}))
@Autobind
class Note extends React.Component {
    render() {
        const { connectDragSource, connectDropTarget, isDragging, isOver, editing, ...props } = this.props;
        const dragSource = editing ? a => a : connectDragSource;
        const style = {
            opacity: isDragging || isOver ? 0 : 1
        };
        
        return dragSource(connectDropTarget(
            <li style={style} {...props}>{props.children}</li>
        ));
    }
};

Note.propTypes = {
    id: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onMove: PropTypes.func
};

Note.defaultProps = {
    editing: false
};

export default Note;