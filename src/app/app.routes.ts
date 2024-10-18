import { Routes } from '@angular/router';
import { FormExampleComponent } from './form-example/form-example.component';

export const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: FormExampleComponent },
];
