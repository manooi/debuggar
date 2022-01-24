import { NgModule } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [],
  exports: [
    InputTextareaModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    MenuModule,
    CardModule,
    DividerModule,
    MessageModule,
    MessagesModule,
    PasswordModule,
    InputTextModule,
    ImageModule
  ],
})
export class PrimengModule {}
