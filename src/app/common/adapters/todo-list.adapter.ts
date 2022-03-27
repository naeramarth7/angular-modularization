import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, first, map, Observable, of, tap } from 'rxjs';
import { TodoListItem } from 'src/app/features/todo-list/models/todo-list-item.model';

import { ITodoListAdapter } from '../../features/todo-list';
import { TodoItem } from '../models/todo-item.model';
import {
  ITodoStorageAdapter,
  TODO_STORAGE_ADAPTER,
} from './todo-storage-adapter.interface';

@Injectable()
export class TodoListAdapter implements ITodoListAdapter {
  public readonly todoList$: Observable<TodoListItem[]>;

  private readonly todos: BehaviorSubject<TodoItem[]>;
  private readonly todoList: BehaviorSubject<TodoListItem[]>;

  private todoStorageAdapter: ITodoStorageAdapter;

  constructor(injector: Injector) {
    this.todoStorageAdapter = injector.get(TODO_STORAGE_ADAPTER);

    this.todos = new BehaviorSubject<TodoItem[]>([]);
    this.todoList = new BehaviorSubject<TodoListItem[]>([]);
    this.todoList$ = this.todoList.asObservable();

    this.todoStorageAdapter
      .getTodos()
      .pipe(
        tap((elements) => this.todos.next(elements)),
        map((todos: TodoItem[]): TodoListItem[] =>
          todos.map(this.todoItemToListItem)
        ),
        tap((elements) => this.todoList.next(elements))
      )
      .subscribe();
  }

  addNew(): Observable<TodoListItem[]> {
    return this.todoStorageAdapter
      .addNew()
      .pipe(
        map((todos: TodoItem[]): TodoListItem[] =>
          todos.map(this.todoItemToListItem)
        )
      );
  }

  update(item: TodoListItem): Observable<TodoListItem> {
    const itemToUpdate = { ...this.todos.value.find((e) => e.id === item.id) };
    if (!itemToUpdate) return of(item);

    itemToUpdate.title = item.title;
    return this.todoStorageAdapter
      .update(itemToUpdate)
      .pipe(map(this.todoItemToListItem));
  }

  delete(id: TodoListItem['id']): Observable<boolean> {
    return this.todoStorageAdapter.delete(id);
  }

  private todoItemToListItem(item: TodoItem): TodoListItem {
    return {
      id: item.id,
      title: item.title,
      done: !!item.finished,
    };
  }
}
