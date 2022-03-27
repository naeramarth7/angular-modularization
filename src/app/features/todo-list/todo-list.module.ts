import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListFacade } from './facades/todo-list.facade';
import { TodoListService } from './services/todo-list.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TodoListComponent],
  providers: [TodoListFacade, TodoListService],
  exports: [TodoListComponent],
})
export class TodoListModule {
  public static withAdapters(
    providers: Provider[]
  ): ModuleWithProviders<TodoListModule> {
    return {
      ngModule: TodoListModule,
      providers,
    };
  }
}
