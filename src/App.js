import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList'
import TodoItems from './TodoItems'
import firebase from './firebase.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {text: '', id: '', completed: false},
    }
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items')
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val()
      console.log('snapshot')
      console.log(items)
      let newItems = []
      for (let item in items) {
        newItems.push({
          id: item,
          text: items[item].text,
          completed: items[item].completed
        })
      }
      this.setState({items: newItems})
    })
  }

  inputElement = React.createRef()

  handleInput = event => {
    const new_current =
      {text: event.target.value, completed: false}
    console.log("new current: ")
    console.log(new_current)
    this.setState({
      currentItem: new_current
    })
  }

  toggleComplete = id => {
    const itemRef = firebase.database().ref(`items/${id}`)
    const item = this.state.items.find(obj => obj.id === id)
    itemRef.set({
      completed: !item.completed,
      text: item.text
    })
  }

  addItem = event => {
    event.preventDefault()
    const itemsRef = firebase.database().ref('items')
    const item = {
      text: this.state.currentItem.text,
      completed: this.state.currentItem.completed
    }
    console.log("new item")
    console.log(item)
    itemsRef.push(item)
    this.setState({currentItem: { text: '', completed: false}})
  }

  deleteItem = id => {
    const itemRef = firebase.database().ref(`/items/${id}`)
    itemRef.remove()
  }

  render() {
    return (
      <div className="todoListMain">
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem} />
        <TodoItems
          title={"Active:"}
          entries={this.state.items}
          showComplete={false}
          toggleComplete={this.toggleComplete}/>
        <TodoItems
          title={"Completed:"}
          entries={this.state.items}
          deleteItem={this.deleteItem}
          showComplete={true}
          toggleComplete={this.toggleComplete}/>
      </div>
    )
  }
}

export default App;
