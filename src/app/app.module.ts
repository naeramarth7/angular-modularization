import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoAdapterLocalStorage } from './common/adapters/todo-adapter-local-storage';
import { TODO_ADAPTER } from './common/adapters/todo-adapter.interface';
import { TodoListAdapter } from './common/adapters/todo-list.adapter';
import { TodoItemModule } from './features/todo-item/todo-item.module';
import { TodoListModule, TODO_LIST_ADAPTER } from './features/todo-list';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoListModule.withAdapters([
      {
        provide: TODO_LIST_ADAPTER,
        useClass: TodoListAdapter,
      },
    ]),
    TodoItemModule,
  ],
  providers: [
    {
      provide: TODO_ADAPTER,
      useClass: TodoAdapterLocalStorage,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
