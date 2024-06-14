import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: { 'collision-id': 'LoginComponent' },
})
export class LoginComponent implements OnInit {
  Register() {
    console.log('register');
  }
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initFormLogin();
  }

  loginForm: FormGroup;

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('invalid username or password');
    } else {
    }
  }
  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
