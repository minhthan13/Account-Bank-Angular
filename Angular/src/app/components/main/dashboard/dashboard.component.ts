import { Component, Signal } from '@angular/core';
import { UserSignalService } from '../../../services/user-signal.service';
import { AccountDTO } from '../../../models/Account.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  host: { 'collision-id': 'DashboardComponent' },
})
export class DashboardComponent {
  constructor(private userService: UserSignalService) {
    this.user = userService?.user$;
  }
  user: Signal<AccountDTO | null>;
}
