import React from 'react';
import ReactDOM from 'react-dom';
import Textarea from 'react-textarea-autosize';
import FontAwesome from 'react-fontawesome';
import Autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

@Autobind
class Editable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {editing, ...props} = this.props;
        
        return (
            <div {...props}>
                {editing ? this.renderEdit(): this.renderValue()}
            </div>
        );
    }

    renderEdit(){
        const {value, editClass, isEditInTextArea, ...props} = this.props;

        if(isEditInTextArea){
            return (
                <Textarea
                    ref={(e) => e ? e.selectionStart = value.length : null}
                    className={editClass}
                    autoFocus={true}
                    defaultValue={value}
                    onBlur={this.finishEdit}
                    onKeyPress={this.checkEnter}>
                </Textarea>
            );
        }

        return (
            <input 
                type="text"
                ref={(e) => e ? e.selectionStart = value.length: null}
                className={editClass}
                autoFocus={true}
                defaultValue={value}
                onBlur={this.finishEdit}
                onKeyPress={this.checkEnter}
            />
        );
    }

    renderValue(){
        const {value, valueClass, editClass, onValueClick, onDelete, ...props}  = this.props;
        
        return (
            <div onClick={onValueClick}>
                <span className={valueClass}>
                    {value}
                </span>
                {onDelete ? this.renderDelete(): null}
            </div>
        );
    }

    renderDelete(){
        const {onDelete, ...props} = this.props;

        return (
            <a className="delete" onClick={onDelete}>
                 <FontAwesome name="close"/>
            </a>
        );
    }

    checkEnter(ev){
        if(ev.key === 'Enter'){
            this.finishEdit(ev);
        }
    }

    finishEdit(ev){
        const value = ev.target.value;

        if(this.props.onEdit){
            this.props.onEdit(value);
        }
    }
}

Editable.PropTypes = {
    value: PropTypes.string,
    valueClass: PropTypes.string,
    onValueClick: PropTypes.func,
    editing: PropTypes.bool,
    isEditInTextArea: PropTypes.bool,
    editClass: PropTypes.string,
    onEdit: PropTypes.func
};

Editable.defaultProps ={
    value: '',
    editing: false,
    isEditInTextArea: false
};

export default Editable;