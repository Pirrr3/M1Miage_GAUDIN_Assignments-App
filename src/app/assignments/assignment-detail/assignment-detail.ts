import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.css']
})
export class AssignmentDetail implements OnInit {
  //@Input()
  //assignmentTransmis!: Assignment;
  assignmentTransmis?: Assignment;

  @Output() supprimerAssignment = new EventEmitter<Assignment>();

  constructor(public assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe(a => {this.assignmentTransmis = a});

  }


  onAssignmentRendu() {
    // Vérifier que l'utilisateur est connecté
    if (!this.authService.isLogged()) {
      alert('Vous devez être connecté pour rendre un devoir');
      this.router.navigate(['/login']);
      return;
    }

    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;
      this.assignmentsService.updateAssignment(this.assignmentTransmis).subscribe(msg => {
        console.log(msg),
        this.router.navigate(['/home']);
      });
    }
  }
  

  onSupprimer(): void {      
    if (this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis).subscribe(msg => {
        console.log(msg),
        this.router.navigate(['/home']);
      });
      //this.assignmentTransmis = null;  
      //this.supprimerAssignment.emit(this.assignmentTransmis);
    }
  }

    onDeleteAssignment() {
    // if (this.assignmentTransmis) {
    //   this.deleteAssignment.emit(this.assignmentTransmis);
    // }
    this.assignmentsService.deleteAssignment(this.assignmentTransmis!).subscribe({
      next: (message) => {
        console.log(message);
      },
      error: (err) => {
        console.error('Delete error', err);
      },
      complete: () => {
        // Navigate after backend confirms deletion so list refresh happens after
        this.router.navigate(['/home']);
      },
    });
    //this.assignmentTransmis = undefined;
  }

  onClickEdit() {
    if (!this.assignmentTransmis) return;
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
      {queryParams:{ nom: this.assignmentTransmis.nom}, fragment: 'edition' }
    );
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
