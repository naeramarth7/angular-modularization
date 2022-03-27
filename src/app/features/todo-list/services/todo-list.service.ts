import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from '../models/todo-list-item.model';

import {
  ITodoListAdapter,
  TODO_LIST_MODULES_ADAPTER,
} from '../models/todo-list.adapter';

@Injectable()
export class TodoListService {
  public readonly todoList$: Observable<TodoListItem[]>;

  private readonly todoListAdapter: ITodoListAdapter;

  constructor(injector: Injector) {
    this.todoListAdapter = injector.get(TODO_LIST_MODULES_ADAPTER);
    this.todoList$ = this.todoListAdapter.todoList$;
  }

  public addNew(): void {
    this.todoListAdapter.addNew().subscribe();
  }

  public update(item: TodoListItem): void {
    this.todoListAdapter.update(item).subscribe();
  }

  public delete(item: TodoListItem): void {
    this.todoListAdapter.delete(item.id);
  }
}
