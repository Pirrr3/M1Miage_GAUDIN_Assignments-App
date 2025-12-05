import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments-connexion',
  imports: [],
  templateUrl: './assignments-connexion.html',
  styleUrls: ['./assignments-connexion.css']
})
export class AssignmentsConnexion {
	// constructor
	constructor(private auth: AuthService, private router: Router) {}

	// remplace l'émission d'événements : tente la connexion et navigue
	submit(username: string, password: string) {
		this.auth.login(username, password).then(success => {
			if (success) {
				// connexion réussie -> retour à l'accueil
				this.router.navigate(['/home']);
			} else {
				alert('Identifiants incorrects');
			}
		});
	}

	// annuler -> revenir à l'accueil
	cancel() {
		this.router.navigate(['/home']);
	}
}
