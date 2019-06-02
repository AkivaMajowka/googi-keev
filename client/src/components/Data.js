import React, {Component} from "react";
import axios from 'axios'

class Data extends Component {
  constructor(props){
    super()
    this.state = {
      note: props.note,
      title: props.title,
      todoList: props.todoList,
      id: props.id,
      elementsList: props.elementsList,
      tipo: props.tipo
    }
    
  }
 // NOT WORKING
  handleDelete = (() => {
    let item = `http://localhost:5000/api/Items/${this.state.id}`
    axios.delete(item, 
        { _id: this.state.id, title: this.state.title, note: this.state.note, tipo: this.state.tipo }
    );
    this.props.deleteStateUpdate(this.state.id)
  }) 

  render(){
    return(
        <div className="box">
          <div style={{display: "flex"}}> 
            <h5 style={{width: "80%"}}>{this.state.title}</h5>
            <div id="deleteDiv"><a id="delete" onClick={this.handleDelete}></a></div>
          </div>  
          <p>{this.state.note}</p>
          {this.state.todoList}
        </div> 
    )   
  } 
}   
 
    
  


export default Data;
