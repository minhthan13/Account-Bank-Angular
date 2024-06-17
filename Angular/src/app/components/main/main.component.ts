import { Component, OnInit, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { UserSignalService } from '../../services/user-signal.service';
import { FooterComponent } from './layout/footer/footer.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { ChipModule } from 'primeng/chip';
import { AccountDTO } from '../../models/AccountDto.model';
import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    RouterOutlet,
    ConfirmPopupModule,
    NgClass,
    FooterComponent,
    TopbarComponent,
    ChipModule,
  ],
  styleUrl: './main.component.css',
  host: { 'collision-id': 'MainComponent' },
  providers: [ConfirmationService],
})
export class MainComponent implements OnInit {
  constructor(
    private userSignal: UserSignalService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService
  ) {
    this.userLogin = this.userSignal.user$;
  }
  userLogin: Signal<AccountDTO>;
  ngOnInit(): void {}
  Logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to Logout?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userSignal.clearUser();
        this.toastr.success('See Yout late !!', 'Log Out!');
        this.router.navigate(['/']);
      },
    });
  }
}
