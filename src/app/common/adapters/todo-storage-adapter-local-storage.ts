import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable, of, tap } from 'rxjs';

import { TodoItem } from '../models/todo-item.model';
import { ITodoStorageAdapter } from './todo-storage-adapter.interface';

@Injectable()
export class TodoStorageAdapterLocalStorage implements ITodoStorageAdapter {
  private static STORAGE_KEY = '_todos';
  private readonly todos = new BehaviorSubject<TodoItem[]>([]);

  constructor() {
    const dataString =
      window.localStorage.getItem(TodoStorageAdapterLocalStorage.STORAGE_KEY) ||
      '[]';

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
      tap((items) => this.todos.next(items)),
      tap(() => this.save())
    );
  }

  public update(item: Partial<TodoItem>): Observable<TodoItem> {
    const index = this.todos.value.findIndex((e) => e.id === item.id);
    if (index < 0) return of(item as any);

    const updatedItem = {
      ...this.todos.value[index],
      ...item,
    };

    this.todos.next([
      ...this.todos.value.slice(0, index),
      updatedItem,
      ...this.todos.value.slice(index + 1),
    ]);
    this.save();

    return of(updatedItem);
  }

  public delete(id: TodoItem['id']): Observable<boolean> {
    const index = this.todos.value.findIndex((e) => e.id === id);
    this.todos.next([
      ...this.todos.value.slice(0, index),
      ...this.todos.value.slice(index + 1),
    ]);
    this.save();
    return of(true);
  }

  private save() {
    const newItems = this.todos.value;
    const dataString = JSON.stringify(newItems);

    try {
      window.localStorage.setItem(
        TodoStorageAdapterLocalStorage.STORAGE_KEY,
        dataString
      );
      return newItems;
    } catch (e) {
      return [];
    }
  }

  private generateId() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    // prettier-ignore
    return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
  }
}
