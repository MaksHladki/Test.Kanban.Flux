import uuid from 'node-uuid';
import alt from '../lib/alt';

import NoteActions from '../actions/NoteActions';

class NoteStore{
    constructor(){
        this.bindActions(NoteActions);
        this.notes = [];

        this.exportPublicMethods({
            getNotesByIds: this.getNotesByIds.bind(this)
        });
    }

    create(note){
        const notes = this.notes;
        note.id = uuid.v4();
        
        this.setState({
            notes: notes.concat(note),
            editable: true
        });
    }

    update(updatedNote){
        const notes = this.notes.map(note => {
            if(updatedNote.id === note.id){
                return Object.assign({}, note, updatedNote);
            }

            return note;
        });

        this.setState({notes});
    }

    delete(id){
        this.setState({
            notes: this.notes.filter(note => note.id != id)
        });
    }

    getNotesByIds(ids = []){
        let notes = ids.map(id => {
            let note = this.notes.filter(n => n.id === id);
            return note;
        })
        .filter(a => a.length)
        .map(a => a[0]);

        return notes;
    }
}

export default alt.createStore(NoteStore, 'NoteStore');
