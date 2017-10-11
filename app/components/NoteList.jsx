import React from 'react';
import Autobind from 'autobind-decorator';

import Note from './Note.jsx';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions';

@Autobind
class NoteList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let notes = this.props.notes || [];

        return (
            <ul className="note-list">
                {notes.map(note =>
                    <Note className="note" id={note.id} key={note.id} editing={note.editing} onMove={LaneActions.moveNote}>
                        <Editable
                            value={note.task}
                            valueClass="note__text"
                            editing={note.editing}
                            editClass="note--edit"
                            onValueClick={this.props.onValueClick.bind(null, note.id)}
                            onEdit={this.props.onEdit.bind(null, note.id)}
                            onDelete={this.props.onDelete.bind(null, note.id)} />
                    </Note>
                )}
            </ul>
        );
    }
}

export default NoteList;