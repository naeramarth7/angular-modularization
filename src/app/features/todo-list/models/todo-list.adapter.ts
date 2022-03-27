import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from './todo-list-item.model';

export interface ITodoListAdapter {
  readonly todoList$: Observable<TodoListItem[]>;
  addNew: () => Observable<TodoListItem[]>;
}

export const TODO_LIST_ADAPTER = new InjectionToken<ITodoListAdapter>(
  'TodoListAdapter'
);
