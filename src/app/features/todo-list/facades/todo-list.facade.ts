import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  public rename(item: TodoListItem, $event: KeyboardEvent): void {
    const title = ($event.target as HTMLInputElement).value;
    const updatedItem = {
      ...item,
      title,
    };

    this.todoListService.update(updatedItem);
  }

  public delete(item: TodoListItem): void {
    this.todoListService.delete(item);
  }
}
