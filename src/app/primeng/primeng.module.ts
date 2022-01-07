import { NgModule } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  exports: [
    InputTextareaModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
  ],
})
export class PrimengModule {}
