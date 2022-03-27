import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListItem } from './todo-list-item.model';

export interface ITodoListAdapter {
  readonly todoList$: Observable<TodoListItem[]>;
  addNew: () => Observable<TodoListItem[]>;
  update: (item: TodoListItem) => Observable<TodoListItem>;
  delete: (id: TodoListItem['id']) => Observable<boolean>;
}

export const TODO_LIST_MODULES_ADAPTER = new InjectionToken<ITodoListAdapter>(
  'TodoListAdapter'
);
