import React, { Component } from 'react'

class TodoItems extends Component {
  createTasks = (item) => {
    return (
      <li key={item.key}>
        <input type="checkbox"
          checked={item.completed}
          onChange={()=>this.props.toggleComplete(item.key)}/>
        {item.text}</li>)
  }

  render() {
    const todoEntries = this.props.entries
    console.log(todoEntries)
    let listItems
    if(this.props.showComplete){
      listItems = todoEntries.filter(item => item.completed).map(this.createTasks)
    }else{
      listItems = todoEntries.filter(item => !item.completed).map(this.createTasks)
    }
    return (
      <div>
      <label>{this.props.title}</label><br />
      <ul className="theList">{listItems}</ul>
      </div>
    )
  }
}

export default TodoItems
