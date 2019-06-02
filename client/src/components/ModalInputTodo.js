import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalInputTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      todos: [],
      id: 100,
      
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  clean = () => {
    document.getElementById('todo-title').value = '';
    this.setState({todos: []});
  }

  saveItem = () => {
    let title = document.getElementById('todo-title').value;
    let finalList = this.state.todos.map(item => {
    let newItem = {name: item.todo, done: false};
         return newItem
          });
          console.log(finalList)

    // Making the POST request
    axios.post('http://localhost:5000/api/Items',      
        { 
        "title": title,
        "tipo": "todo",
        "todoList" : finalList
    })

    this.setState({todos: []})
    this.toggle();
    
    // Updating <app /> state for re-rendering 
    this.setState(prevState => {
      return {
        id: prevState.id = prevState.id + 2
      }
    })
    let newTodo = {title: title, tipo: "todo", _id: this.state.id, todoList: finalList}
    this.props.stateUpdate(newTodo);
  }

  handleTodos = () => {
    let todo = document.getElementById('todo-todo').value;
    
    let newList = this.state.todos;
    newList.push({todo});
    this.setState( {
        todos: newList
    })

    let list = this.state.todos.map(item => {
      return (
           <p>
             {" "}
             <input type="checkbox" />
             {item}
             {" "}
           </p>
      );
    })
    this.setState({currentTodos: list})
    document.getElementById("todo-todo").value = "";
  }

  

  render() {
    return (
      <div>
        <Button outline color="primary" onClick={this.toggle}>{this.props.buttonLabel}+ To-do</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <form id="item-form">
            <ModalHeader toggle={this.toggle}>
              Add to-do list
            </ModalHeader>
            <ModalBody>
              <input type="textarea" id="todo-title" name="title" placeholder="To-do Title" rows={5} />
              <div style={{display: "flex"}}>
                <input style={{width: "50%", marginLeft: "10%"}} type="textarea" id="todo-todo" name="todo" placeholder="Item" rows={5} />
                <Button outline color="primary" onClick={this.handleTodos}>Add</Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <p>Tip: Give a title, add each item then press save ;)</p>
              <Button color="primary" onClick={this.saveItem.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.clean.bind(this)}>Clean</Button>
            </ModalFooter>
          </form>
        </Modal> 
      </div>
    );
  }
}

export default ModalInputTodo;