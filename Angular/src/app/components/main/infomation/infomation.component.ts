import { Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { AccountDTO } from '../../../models/Account.model';
import { UserSignalService } from '../../../services/user-signal.service';
@Component({
  selector: 'app-infomation',
  standalone: true,
  imports: [
    PasswordModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FieldsetModule,
    AvatarModule,
    CardModule,
    ChipModule,
  ],
  templateUrl: './infomation.component.html',
  styleUrl: './infomation.component.css',
  host: { 'collision-id': 'InfomationComponent' },
})
export class InfomationComponent implements OnInit {
  CancelForm() {
    this.visible = false;
    this.formUpdate.reset();
    this.initForm();
  }
  formUpdate: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserSignalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = this.userService.getUserSignal;
    if (this.user != null) {
      this.initForm();
    }
  }
  ngOnInit(): void {}

  visible: boolean = false;
  user: AccountDTO;
  showDialog() {
    this.visible = true;
  }
  UpdateSubmit() {
    throw new Error('Method not implemented.');
  }

  initForm() {
    this.formUpdate = this.formBuilder.group({
      username: 'abc',
      password: '',
      Cpassword: '',
      fullName: '',
      email: '',
      phone: '',
    });
  }
}
