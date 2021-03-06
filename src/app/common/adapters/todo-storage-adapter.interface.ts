import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItem } from '../models/todo-item.model';

export interface ITodoStorageAdapter {
  getTodos: () => Observable<TodoItem[]>;
  addNew: () => Observable<TodoItem[]>;
  update: (item: Partial<TodoItem>) => Observable<TodoItem>;
  delete: (id: TodoItem['id']) => Observable<boolean>;
}

export const TODO_STORAGE_ADAPTER = new InjectionToken<ITodoStorageAdapter>(
  'ITodoStorageAdapter'
);
