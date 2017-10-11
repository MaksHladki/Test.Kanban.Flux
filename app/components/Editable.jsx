import React from 'react';
import FontAwesome from 'react-fontawesome';
import Autobind from 'autobind-decorator';

@Autobind
class Editable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {value, editing, onEdit, onValueClick, ...props} = this.props;

        return (
            <div {...props}>
                {editing ? this.renderEdit(): this.renderValue()}
            </div>
        );
    }

    renderEdit(){
        const {value, editClass, ...props} = this.props;
        return (
            <input type="text" 
                className={editClass}
                ref={(e) => e ? e.selectionStart = this.props.value.length: null}
                autoFocus={true}
                defaultValue={value}
                onBlur={this.finishEdit}
                onKeyPress={this.checkEnter}
            />
        );
    }

    renderValue(){
        const {onDelete, valueClass, ...props}  = this.props;

        return (
            <div onClick={this.props.onValueClick}>
                <span className={valueClass}>
                    {this.props.value}
                </span>
                {onDelete ? this.renderDelete(): null}
            </div>
        );
    }

    renderDelete(){
        return (
            <a className="delete" onClick={this.props.onDelete}>
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

export default Editable;