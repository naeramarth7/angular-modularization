import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  first,
  firstValueFrom,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

import { TodoItem } from '../models/todo-item.model';
import { ITodoAdapter } from './todo-adapter.interface';

@Injectable()
export class TodoAdapterLocalStorage implements ITodoAdapter {
  private static STORAGE_KEY = '_todos';
  private readonly todos = new BehaviorSubject<TodoItem[]>([]);

  constructor() {
    const dataString =
      window.localStorage.getItem(TodoAdapterLocalStorage.STORAGE_KEY) || '[]';

    try {
      const data = JSON.parse(dataString);
      this.todos.next(data);
    } catch {
      this.todos.next([]);
    }
  }

  getTodos(): Observable<TodoItem[]> {
    return this.todos.asObservable();
  }

  addNew(): Observable<TodoItem[]> {
    const newItem: TodoItem = {
      id: this.generateId(),
      created: new Date().toISOString(),
      title: 'New Todo',
    };

    return this.todos.pipe(
      first(),
      map((currentItems) => [...currentItems, newItem]),
      map((newItems) => {
        const dataString = JSON.stringify(newItems);

        try {
          window.localStorage.setItem(
            TodoAdapterLocalStorage.STORAGE_KEY,
            dataString
          );
          return newItems;
        } catch (e) {
          return [];
        }
      }),
      tap((items) => this.todos.next(items))
    );
  }

  private generateId() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    // prettier-ignore
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  }
}
