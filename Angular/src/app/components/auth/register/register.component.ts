import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MatchPasswordValidator } from '../../../shared/validation.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    FormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  host: { 'collision-id': 'RegisterComponent' },
})
export class RegisterComponent implements OnInit {
  registerSubmit() {
    if (this.formRegister.valid) {
      console.log('Form Submitted!', this.formRegister.value);
    } else {
      console.log('Form is invalid');
    }
  }
  formRegister: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }
  ngOnInit(): void {}
  value: string | undefined;

  initForm() {
    this.formRegister = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      Cpassword: [
        '',
        [Validators.required, MatchPasswordValidator('password')],
      ],
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    });
  }

  get username() {
    return this.formRegister.get('username');
  }
  get password() {
    return this.formRegister.get('password');
  }
  get Cpassword() {
    return this.formRegister.get('Cpassword');
  }
  get fullName() {
    return this.formRegister.get('fullName');
  }
  get email() {
    return this.formRegister.get('email');
  }
  get phone() {
    return this.formRegister.get('phone');
  }
}
