import React from 'react';
import FontAwesome from 'react-fontawesome';
import Autobind from 'autobind-decorator';
import {DropTarget} from 'react-dnd';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';
import NoteList from './NoteList.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import ItemType from '../constants/itemType';

const noteTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        
        if (!targetProps.lane.notes.length) {
            LaneActions.attachToLane({
                laneId: targetProps.lane.id,
                noteId: sourceId
            });
        }
    }
};

@DropTarget(ItemType.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
@Autobind
class Lane extends React.Component {
    constructor(props) {
        super(props);
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
        }

        LaneActions.update({ id: laneId, name, editing: false });
    }

    deleteLane() {
        const laneId = this.props.lane.id;

        LaneActions.delete(laneId);
    }

    activateLaneEdit() {
        const laneId = this.props.lane.id;

        LaneActions.update({ id: laneId, editing: true });
    }

    activateNoteEdit(id) {
        NoteActions.update({ id, editing: true });
    }

    render() {
        const { connectDropTarget, lane, ...props } = this.props;

        return connectDropTarget(
            <div {...props}>
                <div className="lane__header" >
                    <a className="button lane-button__btn-add" onClick={this.addNote}>
                        <FontAwesome name="plus"/>
                    </a>
                    <Editable className="lane-header__name"
                        
                        value={lane.name}
                        editing={lane.editing}
                        onClick={this.activateLaneEdit}
                        onEdit={this.editName} />
                </div>
                <div className="lane__body">
                    <AltContainer stores={[NoteStore]} inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}>
                        <NoteList
                            onValueClick={this.activateNoteEdit}
                            onEdit={this.editNote}
                            onDelete={this.deleteNote} />
                    </AltContainer>
                </div>
                <div className="lane__footer">
                    <a className="button lane-button__btn-delete" onClick={this.deleteLane}>
                        <FontAwesome name="trash"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Lane;