import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import {DragSource, DropTarget} from 'react-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import AltContainer from 'alt-container';
import Autobind from 'autobind-decorator';

import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';
import NoteList from './NoteList.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import ItemType from '../constants/itemType';
import Helper from '../lib/helper';

const dragSource = {
    canDrag(props) {
        return props.lane && props.lane.editing == false;
    },
    beginDrag(props) {
        return {
            id: props.lane.id,
            index: props.index
        };
    },
};

const dragTarget = {
    hover(props, monitor, component) {
        if (monitor.getItem().index == null) {
            dragTargetNote(props, monitor, component);
        } else {
            dragTargetLane(props, monitor, component);
        }
    },
};

function dragTargetLane(props, monitor, component){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.onMove(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
}

function dragTargetNote(targetProps, monitor, component){
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    
    if (!targetProps.lane.notes.length) {
        LaneActions.attachToLane({
            laneId: targetProps.lane.id,
            noteId: sourceId
        });
    }
}

@DropTarget([ItemType.LANE, ItemType.NOTE], dragTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemType.LANE, dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@Autobind
class Lane extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.laneBody = ReactDOM.findDOMNode(this.refs.laneBody);
    }

    editNote(id, task) {
        if (!task || !task.trim()) {
            NoteActions.update({ id, editing: false });
            return;
        }

        NoteActions.update({ id, task, editing: false });
    }

    addNote(ev) {
        const laneId = this.props.lane.id;
        const note = NoteActions.create({ task: 'New task' });

        LaneActions.attachToLane({
            noteId: note.id,
            laneId
        });
    }

    deleteNote(noteId, ev) {
        ev.stopPropagation();
        const laneId = this.props.lane.id;

        LaneActions.detachFromLane({ laneId, noteId });
        NoteActions.delete(noteId);
    }

    editName(name) {
        const laneId = this.props.lane.id;

        if (!name || !name.trim()) {
            LaneActions.update({ id: laneId, editing: false });
            return;
        }

        LaneActions.update({ id: laneId, name, editing: false });
    }

    deleteLane() {
        const laneId = this.props.lane.id;

        LaneActions.delete(laneId);
    }

    activateLaneEdit() {
        const lane = this.props.lane;

        if(!lane.editing){
            LaneActions.update({ id: lane.id, editing: true });
        }
    }

    activateNoteEdit(id) {
        NoteActions.update({ id, editing: true });
    }

    render() {
        const { connectDragSource, isDragging, connectDropTarget, lane, ...props } = this.props;
        const style = {
            opacity: isDragging ? 0 : 1
        };
        
        const scrollHeight = this.laneBody != null
            ? Helper.calculateScrollHeight(this.laneBody.parentNode, this.laneBody, this.props.maxHeight, 6)
            : 0;
       
        return connectDragSource(connectDropTarget(
            <div style={style} {...props}>
                <div className="lane__header">
                    <a className="button lane-button__btn-add" onClick={this.addNote}>
                        <FontAwesome name="plus"/>
                    </a>
                    <Editable className="lane-header__name"
                        value={lane.name}
                        valueClass="lane-header__name__text"
                        editing={lane.editing}
                        editClass="lane-header__name--edit"
                        onClick={this.activateLaneEdit}
                        onEdit={this.editName} />
                </div>
                <div className="lane__body" ref="laneBody">
                    <Scrollbars autoHeight={true} autoHeightMax={scrollHeight}>
                        <AltContainer stores={[NoteStore]} inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}>
                            <NoteList
                                onValueClick={this.activateNoteEdit}
                                onEdit={this.editNote}
                                onDelete={this.deleteNote} />
                        </AltContainer>
                    </Scrollbars>
                </div>
                <div className="lane__footer">
                    <a className="button lane-button__btn-delete" onClick={this.deleteLane}>
                        <FontAwesome name="trash"/>
                    </a>
                </div>
            </div>
        ));
    }
}

export default Lane;