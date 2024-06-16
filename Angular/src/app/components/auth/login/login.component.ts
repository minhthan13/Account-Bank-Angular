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
import { NgStyle } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { AccountDTO } from '../../../models/Account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSignalService } from '../../../services/user-signal.service';
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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private userService: UserSignalService
  ) {}
  ngOnInit(): void {
    this.initFormLogin();
  }

  loginForm: FormGroup;

  login() {
    if (this.loginForm.valid) {
      let account = this.loginForm.value as AccountDTO;
      this.accountService.login(account).then(
        (res) => {
          this.toastr.success('Login success ');
          let user = res as AccountDTO;
          this.userService.setUserSignal(user);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          let message = err.error.errors;
          message?.forEach((m) => {
            this.toastr.error(m, 'Error');
          });
        }
      );
    } else {
      this.toastr.error('invalid username or password');
    }
  }
  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
