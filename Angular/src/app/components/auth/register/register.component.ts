import { NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MatchPasswordValidator } from '../../../shared/validation.directive';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from '../../../models/Response.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  CancelForm() {
    this.formRegister.reset();
    this.router.navigate(['/login']);
  }
  formRegister: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  registerSubmit() {
    if (this.formRegister.valid) {
      const { Cpassword, ...newForm } = this.formRegister.value;
      const formData = new FormData();
      formData.append('account', JSON.stringify(newForm));
      this.accountService.register(formData).then(
        (res: ResponseModel) => {
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, 'Error');
        }
      );
    } else {
      this.toastr.error('invalid', 'Error');
    }
  }
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
