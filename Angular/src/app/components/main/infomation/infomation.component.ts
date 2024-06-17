import { Component, OnInit, Signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { AccountDTO } from '../../../models/AccountDto.model';
import { UserSignalService } from '../../../services/user-signal.service';
import { MatchPasswordValidator } from '../../../shared/validation.directive';
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
    this.visibleFormEdit = false;
    this.formUpdate.reset();
    this.initForm(this.user);
  }
  formUpdate: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private userService: UserSignalService,
    public toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.userService.getUserSignal;
    if (this.user != null) {
      this.initForm(this.user);
    }
  }

  visibleFormEdit: boolean = false;
  visibleDeposite: boolean = false;
  visibleWithdraw: boolean = false;
  user: AccountDTO;

  UpdateSubmit() {
    if (this.formUpdate.valid) {
      this.accountService.edit(this.formUpdate.getRawValue()).then(
        (res: AccountRequest) => {
          this.userService.setUserSignal(res.data);
          this.toastr.success(res.message);
          this.ngOnInit();
          this.visibleFormEdit = false;
          console.log(res);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    }
  }

  initForm(user: AccountDTO) {
    this.formUpdate = this.formBuilder.group({
      accId: new FormControl({ value: user.accId, disabled: true }),
      username: new FormControl({ value: user.username, disabled: true }),
      password: '',
      Cpassword: ['', [MatchPasswordValidator('password')]],
      fullName: user.fullName,
      email: new FormControl({ value: user.email, disabled: true }),
      phone: new FormControl({ value: user.phone, disabled: true }),
    });
  }
  get Cpassword() {
    return this.formUpdate.get('Cpassword');
  }
  showDialogEdit = () => (this.visibleFormEdit = true);
  showDialogDeposite = () => (this.visibleDeposite = true);
  showDialogWithdraw = () => (this.visibleWithdraw = true);
}

interface AccountRequest {
  message: string;
  data: AccountDTO;
}
