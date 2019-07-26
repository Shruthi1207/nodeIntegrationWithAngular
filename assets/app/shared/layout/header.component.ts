import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

    firstName = this.authService.currentNameSubject;

    onLogout() {
      this.authService.logout();
      this.router.navigate(['/auth', 'signin']);
    }

    isLoggedIn() {
      return this.authService.isLoggedIn();
    }

    manageAccount() {
      this.router.navigate(['/auth', 'account']);
    }
    isAdmin() {
      return this.authService.isAdmin();
    }


}
