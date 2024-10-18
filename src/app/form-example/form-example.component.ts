import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../material.import';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { InputHoverDirective } from '../directive/input-hover.directive';
import { map, Observable, startWith } from 'rxjs';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CUSTOMS_DATE_FORMAT } from '../shared/mat-dateformat';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [...MaterialModule, CommonModule, InputHoverDirective],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOMS_DATE_FORMAT },
  ],
  templateUrl: './form-example.component.html',
  styleUrl: './form-example.component.scss',
})
export class FormExampleComponent implements OnInit {
  country = ['India', 'USA', 'Shri Lanka'];
  terms = ['15 Days', '30 Days', '45 Days'];

  currentDate = moment();
  minDate = this.currentDate.clone().subtract(18, 'years');
  maxDate = this.currentDate.clone().add(18, 'years');

  formbuilder = inject(NonNullableFormBuilder);

  userForm = this.formbuilder.group<UserForm>({
    firstName: this.formbuilder.control('', Validators.required),
    emailAddress: this.formbuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    address: this.formbuilder.control(''),
    country: this.formbuilder.control('', Validators.required),
    dateOfBirth: this.formbuilder.control(null, Validators.required),
    gender: this.formbuilder.control('', Validators.required),
    terms: this.formbuilder.control('', Validators.required),
    isActive: this.formbuilder.control(true, Validators.required),
  });

  filterOption!: Observable<string[]>;

  ngOnInit(): void {
    console.log(this.maxDate);
    console.log(this.minDate);

    this.filterOption = this.userForm.get('terms')!.valueChanges.pipe(
      startWith(''),
      map((value) => this.onFilter(value || '')),
    );
  }

  onUserFormSubmit() {
    console.log(this.userForm.getRawValue());
  }

  onCancelClick() {
    this.userForm.reset();
  }

  onFilter(value: string): string[] {
    const searchValue = value.toLocaleLowerCase();
    return this.terms.filter((option) =>
      option.toLocaleLowerCase().includes(searchValue),
    );
  }
}

export interface UserForm {
  firstName: FormControl<string>;
  emailAddress: FormControl<string>;
  address: FormControl<string>;
  country: FormControl<string>;
  terms: FormControl<string>;
  dateOfBirth: FormControl<Moment | null>;
  gender: FormControl<string>;
  isActive: FormControl<boolean>;
}
