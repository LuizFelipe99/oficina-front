import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
