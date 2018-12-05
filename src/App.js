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
      currentItem: {text: '', id: '', completed: false},
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
      {text: event.target.value, id: Date.now(), completed: false}
    console.log("new current: ")
    console.log(new_current)
    this.setState({
      currentItem: new_current
    })
  }

  toggleComplete = id => {
    let item = this.state.items.find(obj => obj.id === id);
    item = {...item, completed: !item.completed}

    fetch(
      API_URL+'/'+id,
      {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(item)
      })
      .then(response => response.json())
      .then(result => {
        const updatedItems =
          this.state.items.map(item => {
            return item.id === id? {...item, completed: !item.completed}:item
          })
        this.setState({
          items: updatedItems,
          currentItem: {text: '', id: '', completed: false},
        })
      })
      .catch(err => console.error('Request failed', err))
  }

  addItem = event => {
    event.preventDefault()
    const newItem = this.state.currentItem
    console.log(newItem)
    fetch(
      API_URL,
      {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(newItem)
      })
    .then(response => response.json())
    .then(result => this.setState({
      items: [...this.state.items, result],
      currentItem: { text: '', id: '' },}))
    .catch(err => console.error('Request failed', err))
  }

  deleteItem = id => {
    fetch(
      API_URL+'/'+id,
      {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(result => {
        console.log('deleted:', result)
        const filteredItems = this.state.items.filter(item => {
          return item.id !== id
        })
        this.setState({
          items: filteredItems,
        })
      })
      .catch(err => console.error('Request failed', err))
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
