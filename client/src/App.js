import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import './App.css';
import Data from "./components/Data";

import AppNavbar from './components/AppNavbar';
import ModalInput from './components/ModalInput';
import ModalInputTodo from './components/ModalInputTodo';





class App extends Component {
  constructor(){
    super()
    this.state = {
      list: []
    }
    
  }

  componentWillMount() {
    axios.get('http://localhost:5000/api/Items')
    .then((res)=> {
        this.setState({list: res.data});
    })
  }

  stateUpdate = (newUpdate) => {
    let newList = this.state.list
    newList.unshift(newUpdate)
    this.setState({ list: newList })
  }

  deleteStateUpdate = (id) => {
    let oldList = this.state.list
    let newList = oldList.filter(item => {
      return item._id !== id
    })
    this.setState({ list: newList })
  }

  todosStyle = (status) => {
    if(status === true){
      let style = { textDecoration: "line-through", color: "lightGrey" }
      return  (style)
    } else {
      let style = { }
      return (style) 
    }
  }

  checked = (item) => {
    if(item === true) {
      return true
    }else {
      return false
    }
  }

  checkboxUpdate = (dataId, todoId) => {
    let list = this.state.list
    
    let updatedItem = list.filter(item => item._id === dataId);

    let updatedTodos = updatedItem[0].todoList.map(todo => {
      if ( todo._id === todoId ){ todo.done = !todo.done }
       return todo;
    })
    updatedItem[0].todoList = updatedTodos;
    axios.put('http://localhost:5000/api/Items/'+ dataId,      
      updatedItem[0]
    )
    let updatedList = list.map(item => {
      if ( item._id ===  updatedItem[0]._id ){
        return  updatedItem[0]
       } else {
        return item
       }
    })
    this.setState({list: updatedList})
  }

    toggleTodo = (e) => {
      e.target.parentElement.classList.toggle("checkedtodo")
    }
  
  render(){
       const elements = this.state.list.map(data =>
          data.tipo === "todo" ? (
            <Data
              deleteStateUpdate ={this.deleteStateUpdate}
              tipo={data.todo}
              key={data._id}
              id={data._id}
              title={data.title}
              todoList={ data.todoList.map(item => {
                for(var i in item) {
                  return (
                       <p key={item._id} className={item.done ? "checkedtodo" : ""}>
                         {" "}
                        <input type="checkbox" 
                          defaultChecked={item.done}
                          onChange={this.toggleTodo} 
                          onClick={this.checkboxUpdate.bind(this, data._id, item._id)}  />
                         {item.name}
                         {" "}
                       </p>
                  );
                }
                // return (
                //   <p>
                //     {" "}
                //     <input type="checkbox" name="item" onClick = {this.handleChange(item.id)}/>
                //     {item}{" "}
                //   </p>
                // );
              })}
            />
          ) : (
            <Data key={data._id} id={data._id} tipo={data.note} title={data.title} note={data.note} deleteStateUpdate ={this.deleteStateUpdate} />
          )
        );

        return (
          <div className="app">
            <AppNavbar />
            <div className="modals">
              <ModalInput stateUpdate={this.stateUpdate}/>
              <ModalInputTodo stateUpdate={this.stateUpdate}/>
            </div>
            
            <div className="elements">{elements}</div>
          </div>
         ); 
      }        
        
    
  
}

export default App;
