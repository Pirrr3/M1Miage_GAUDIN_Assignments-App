import { Injectable } from '@angular/core';

export type Role = 'user' | 'admin';

export interface User {
  username: string;
  password: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private users: User[] = [
    { username: 'user', password: 'user', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' }
  ];

  // utilisateur courant
  private currentUser: User | null = null

  loggedIn = false;

  // connexion avec vérification du tableau d'utilisateurs (démo)
  login(username: string, password: string): Promise<boolean> {
    const found = this.users.find(u => u.username === username && u.password === password);
    if (found) {
      this.currentUser = found;
      this.loggedIn = true;
      return Promise.resolve(true);
    }
    this.currentUser = null;
    this.loggedIn = false;
    return Promise.resolve(false);
  }

  logout(): void {
    this.currentUser = null;
    this.loggedIn = false;
  }

  // renvoie l'état de connexion immédiatement
  isLogged(): boolean {
    return this.loggedIn;
  }

  /*
  isAdmin(): Promise<boolean> {
    return Promise.resolve(this.currentUser?.role === 'admin');
  }
*/

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

}
