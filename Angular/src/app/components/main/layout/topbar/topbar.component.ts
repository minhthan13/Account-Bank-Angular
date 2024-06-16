import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [TabMenuModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  constructor(private router: Router) {}
  items: MenuItem[] | undefined;
  none: any;
  ngOnInit() {
    this.initMenu();
  }

  initMenu() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/dashboard']);
        },
      },
      {
        label: 'Information',
        icon: 'pi pi-id-card',
        command: () => {
          this.router.navigate(['/infomation']);
        },
      },

      {
        label: 'Deposite',
        icon: 'pi pi-dollar',
        command: () => {
          this.router.navigate(['/deposite']);
        },
      },
      {
        label: 'Withdraw',
        icon: 'pi pi-angle-double-down',
        command: () => {
          this.router.navigate(['/withdraw']);
        },
      },
      {
        label: 'History',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/history']);
        },
      },
      {
        label: 'Not Found',
        icon: 'pi pi-exclamation-circle',
        command: () => {
          this.router.navigate(['/notfound']);
        },
      },
    ];
  }
}
