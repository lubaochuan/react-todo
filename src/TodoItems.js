import React, { Component } from 'react'
import { Icon } from 'react-materialize'

class TodoItems extends Component {
  createTasks = (item) => {
    const {toggleComplete, deleteItem, showComplete} = this.props;
    const checkedString =
      item.completed?'radio_button_checked':'radio_button_unchecked';

    return (
      <li key={item.id}>
        <span onClick={()=>toggleComplete(item.id)}>
          <Icon left>{checkedString}</Icon>
        </span>
        {item.text}
        {showComplete?
          <span onClick={()=>deleteItem(item.id)}>
            <Icon right>delete</Icon>
          </span>:null}
      </li>)
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
