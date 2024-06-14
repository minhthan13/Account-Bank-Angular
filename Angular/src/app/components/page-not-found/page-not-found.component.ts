import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
