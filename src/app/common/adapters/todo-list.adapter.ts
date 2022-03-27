import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, tap } from 'rxjs';
import { TodoListItem } from 'src/app/features/todo-list/models/todo-list-item.model';

import { ITodoListAdapter } from '../../features/todo-list';
import { TodoItem } from '../models/todo-item.model';
import { ITodoAdapter, TODO_ADAPTER } from './todo-adapter.interface';

@Injectable()
export class TodoListAdapter implements ITodoListAdapter {
  public readonly todoList$: Observable<TodoListItem[]>;

  private readonly todos: BehaviorSubject<TodoItem[]>;
  private readonly todoList: BehaviorSubject<TodoListItem[]>;

  private todoAdapter: ITodoAdapter;

  constructor(injector: Injector) {
    this.todoAdapter = injector.get(TODO_ADAPTER);

    this.todos = new BehaviorSubject<TodoItem[]>([]);
    this.todoList = new BehaviorSubject<TodoListItem[]>([]);
    this.todoList$ = this.todoList.asObservable();

    this.todoAdapter
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
    return this.todoAdapter
      .addNew()
      .pipe(
        map((todos: TodoItem[]): TodoListItem[] =>
          todos.map(this.todoItemToListItem)
        )
      );
  }

  private todoItemToListItem(item: TodoItem): TodoListItem {
    return {
      id: item.id,
      title: item.title,
      done: !!item.finished,
    };
  }
}
