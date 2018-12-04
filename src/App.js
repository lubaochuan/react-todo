import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList'
import TodoItems from './TodoItems'

const API_URL = 'https://5c054cf66b84ee00137d2573.mockapi.io/api/todos'

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentItem: {text: '', key: '', completed: false},
    }
  }

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos = () => {
    this.setState({...this.state, isFetching: true})
    fetch(API_URL)
      .then(response => response.json())
      .then(result => this.setState({items: result,
                                     isFetching: false}))
      //.then(result => console.log(result))
      .catch(e => console.log(e));
  }

  inputElement = React.createRef()

  handleInput = event => {
    const new_current =
      {text: event.target.value, key: Date.now(), completed: false}
    console.log("new current: ")
    console.log(new_current)
    this.setState({
      currentItem: new_current
    })
  }

  toggleComplete = key => {
    const updatedItems =
      this.state.items.map(item => {
        return item.key === key? {...item, completed: !item.completed}:item
      })
    this.setState({
      items: updatedItems,
      currentItem: {text: '', key: '', completed: false},
    })
  }

  addItem = event => {
    event.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== ''){
      console.log(newItem)
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems,
    })
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
