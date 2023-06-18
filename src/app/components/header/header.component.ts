import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  redirectToHome() {
    this.router.navigate(['/home']);
  }
  redirectToFavorite(){
    this.router.navigate(['/favorite']);
  }
}