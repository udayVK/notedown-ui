import { Component, OnInit } from '@angular/core';
import { ToDo, defaultDodo } from '../pojo/todo';
import { SpendsService } from '../spends.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoToAdd:ToDo = {...defaultDodo};
  todoList:ToDo[] = [];
  completedToDoList: ToDo[] = [];
  pendingToDoList: ToDo[] = [];

  constructor(private service: SpendsService) { }

  ngOnInit(): void {
    this.fetchTodyTodos();
  }
  
  addToDo() {
    console.log(this.todoToAdd);
    this.service.addToDo(this.todoToAdd).subscribe(
      //on success
      (todo)=>{
        console.log(todo);
        this.fetchTodyTodos();
        this.todoToAdd = {...defaultDodo};
      },
      //on error
      ()=>{console.log('error')}
      );
    }
    
  fetchTodyTodos() {
    this.service.findTodayTodos().subscribe((todos)=>{
      console.log(todos)
      this.todoList=todos;
      this.classifyToDos();
    })
  }

  classifyToDos() {
    this.pendingToDoList = [];
    this.completedToDoList = [];
    this.todoList.forEach((todo)=>{
      todo.status ? this.completedToDoList.push(todo) : this.pendingToDoList.push(todo);
      console.log('completed');
      console.log(this.completedToDoList);
      console.log('pending');
      console.log(this.pendingToDoList);
    })
  }

  markTodoAsComplete(todoId: number) {
    this.todoList.filter(todo=>todo.id==todoId).map((todo)=>todo.status=true).forEach(todo=>console.log(todo))
    this.classifyToDos();
    this.service.markTodoAsComplete(todoId).subscribe(()=>{console.log(document.querySelector('input.input[type=checkbox]'))});

  }

  saveTodoOnEnter(event: KeyboardEvent) {
    // console.log('working')
    console.log(event)
    if(event.code == 'Enter') {
      this.addToDo()
    }

  }
}


