import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.css']
})
export class AddAssignment {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomAssignment = "";
  dateDeRendu!: Date;

  constructor(private assignmentsService: AssignmentsService, private router: Router) {}


  onAjouterAssignment(event:any) {
    console.log("Ajout NOM = " + this.nomAssignment + " date = " + this.dateDeRendu);
    //event.preventDefault();

    const nouvelAssignment: Assignment = new Assignment();
    nouvelAssignment.id = Math.floor(Math.random() * 1000); // Génère un ID aléatoire
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    console.log(nouvelAssignment);

    // On l'ajoute à la liste
    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment).subscribe(msg => {
      console.log(msg),
      this.router.navigate(['/home']);
    });

  } 


}
