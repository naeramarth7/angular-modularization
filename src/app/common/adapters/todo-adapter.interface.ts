import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItem } from '../models/todo-item.model';

export interface ITodoAdapter {
  getTodos(): Observable<TodoItem[]>;
  addNew(): Observable<TodoItem[]>;
}

export const TODO_ADAPTER = new InjectionToken<ITodoAdapter>('ITodoAdapter');
