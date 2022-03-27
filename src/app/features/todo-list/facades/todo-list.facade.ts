import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from '../models/todo-list-item.model';
import { TodoListService } from '../services/todo-list.service';

@Injectable()
export class TodoListFacade {
  public readonly todoList$: Observable<TodoListItem[]>;

  constructor(private readonly todoListService: TodoListService) {
    this.todoList$ = this.todoListService.todoList$;
  }

  public addNew(): void {
    this.todoListService.addNew();
  }
}
