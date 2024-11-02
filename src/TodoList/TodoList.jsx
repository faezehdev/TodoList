import React, { Component } from 'react'
import '../App.css';
import Todo from '../Todo/Todo';
export default class TodoList extends Component {
    constructor(props){
        super(props)
        this.state={
         todos:[],
         todoTitle:'',
         status:'all'
        }
    }
    changeInput = (e) =>{
     console.log(e.currentTarget.value);
     this.setState({
        todoTitle :e.currentTarget.value
     })
    }
    addTodo = () =>{
        let newTodoObj = {
            id :this.state.todos.length + 1,
            title: this.state.todoTitle,
            completed: false,
        }
        this.setState((prev)=>{
            return{
                todos :[...this.state.todos,newTodoObj] ,
                todoTitle:''
            }
        })

    }
    complete = (id,title)=>{
        let newTodos = [...this.state.todos]
     console.log('complete',id);
    for(let i =0 ; i< newTodos.length ; i++){
        if(newTodos[i].id === id){
            newTodos[i].completed = !newTodos[i].completed
        }
        console.log(newTodos);
    }
   
    
     this.setState({
      todos :[...newTodos]
       
     })
    }
    remove = (id)=>{
        console.log('removeTodo',id);
        let newTodo = this.state.todos.filter(todo=>{
            return id !== todo.id
        })
        this.setState({
            todos : newTodo
        })
       }
filter = (e)=>{
    this.setState({
        status :e.currentTarget.value
    })
}
  render() {
    return (
      <div className='TodoContainer'>
        <h1>
            ToDoList
        </h1>
        <div className="Inputs-Container">
           <div className="input">
            <input type="text" onChange={this.changeInput.bind(this)} value={this.state.todoTitle}/>
            <div class="icon-plus blue w25" onClick={this.addTodo.bind(this)}></div>
           </div>
        <div className="select">
            <select  id="" name="todos" className="filter-todos" onChange={(event)=>this.filter(event)}>
                <option value="all">all</option>
                <option value="completed">completed</option>
                <option value="uncompleted">uncompleted</option>

            </select>
        </div>
        </div>
        <div className="todos">
            {this.state.status === 'all' && this.state.todos.map((todo)=>(
                <Todo title={todo.title} key={todo.id} id={todo.id}
                 iscomplete={todo.completed} removeTodo={this.remove.bind(this)}
                 completeTodo={this.complete.bind(this)}/>
            ))}
           {this.state.status === 'completed' && this.state.todos.filter(todo=> todo.completed).map((todo)=>(
                <Todo title={todo.title} key={todo.id} id={todo.id}
                 iscomplete={todo.completed} removeTodo={this.remove.bind(this)}
                 completeTodo={this.complete.bind(this)}/>
            ))}
            {this.state.status === 'uncompleted' && this.state.todos.filter(todo=> !todo.completed).map((todo)=>(
                <Todo title={todo.title} key={todo.id} id={todo.id}
                 iscomplete={todo.completed} removeTodo={this.remove.bind(this)}
                 completeTodo={this.complete.bind(this)}/>
            ))}
        </div>
      </div>
    )
  }
}
