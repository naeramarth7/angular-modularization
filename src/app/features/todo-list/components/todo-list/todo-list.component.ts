import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoListFacade } from '../../facades/todo-list.facade';
import { TodoListItem } from '../../models/todo-list-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  constructor(public readonly facade: TodoListFacade) {}

  public trackById = (_index: number, item: TodoListItem) => item.id;
}
