import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {Assignments} from './assignments/assignments';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatDividerModule, MatIconModule, Assignments, MatSlideToggleModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit {
  titre = "Application de gestion des assignments";

  processing = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.authService.isLogged()) {
      const username = prompt("Nom d'utilisateur :");
      const password = prompt("Mot de passe :");
      if (!username || !password) {
        return;
      }
      this.authService.login(username, password).then(ok => {
        if (ok) {
          // connecté — rediriger si besoin
          this.router.navigate(['/home']);
        } else {
          alert('Identifiants invalides');
        }
      });
    } else {
      this.authService.logout();
      this.router.navigate(['/home']);
    }
  }


  ngOnInit(): void {
  }
  
  //protected readonly title = signal('assignment-app');
}
