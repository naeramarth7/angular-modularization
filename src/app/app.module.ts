import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoStorageAdapterLocalStorage } from './common/adapters/todo-storage-adapter-local-storage';
import { TODO_STORAGE_ADAPTER } from './common/adapters/todo-storage-adapter.interface';
import { TodoListAdapter } from './common/adapters/todo-list.adapter';
import { TodoItemModule } from './features/todo-item/todo-item.module';
import {
  TodoListModule,
  TODO_LIST_MODULES_ADAPTER,
} from './features/todo-list';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoListModule.withAdapters([
      {
        provide: TODO_LIST_MODULES_ADAPTER,
        useClass: TodoListAdapter,
      },
    ]),
    TodoItemModule,
  ],
  providers: [
    {
      provide: TODO_STORAGE_ADAPTER,
      useClass: TodoStorageAdapterLocalStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
