import React from 'react';
import axios from 'axios';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: 1
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  clean = () => {
    document.getElementById('note-title').value = '';
    document.getElementById('note-note').value = '';
  }

  saveNote = () => {
    let title = document.getElementById('note-title').value;
    let note = document.getElementById('note-note').value;
      axios.post('http://localhost:5000/api/Items',{
        title: title, note: note, tipo: "note"
      }); 

    this.toggle();
    
    // Updating <app /> state for re-rendering 
    this.setState(prevState => {
      return {
        id: prevState.id = prevState.id + 1
      }
    })
    let newNote = {title: title, note: note, tipo: "note", _id: this.state.id}
    this.props.stateUpdate(newNote);  
  }

  render() {
    return (
      <div> 
        <Button outline color="primary" style={{marginRight: "5px"}} onClick={this.toggle}>{this.props.buttonLabel}+ Note</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <form id="item-form">
            <ModalHeader toggle={this.toggle}>Add Note</ModalHeader>
            <ModalBody>
              <input type="textarea" style={{width: "45%", marginBottom: "10px"}} id="note-title" name="title" placeholder="Title" rows={5} />
              <FormGroup>
                <Input type="textarea" name="note" id="note-note" placeholder="Note" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.saveNote.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.clean}>Clean</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ModalInput;