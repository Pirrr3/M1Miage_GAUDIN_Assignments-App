import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Rendu } from "../shared/rendu";
import { NonRendu } from "../shared/nonRendu";
import { Assignment } from './assignment.model';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import { NativeDateModule } from '@angular/material/core';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { MatList } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatListItem } from '@angular/material/list';
import { AddAssignment } from './add-assignment/add-assignment';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-assignments',
  imports: [MatDividerModule,
    DatePipe,
    Rendu,
    NonRendu,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatToolbarModule, 
    MatIconModule,
    MatSidenavModule,
    NativeDateModule,
    AssignmentDetail,
    MatList,
    MatListItem,
    MatDivider,
    AddAssignment,
    RouterLink
  ],

  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.css']
})
export class Assignments implements OnInit {
  boutonActive = false;

  nomAssignment = "";
  dateDeRendu!: Date;

  opened = false;

  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  //assignmentSelectionne!: Assignment;
  assignmentSelectionne?: Assignment;

  formVisible = false;



  constructor (private assignmentsService: AssignmentsService, private authService:AuthService) {}

  isAdmin() {
    return this.authService.isAdmin();
  }

  assignments: Assignment[] = [];



  ngOnInit() {
    console.log("ngOnInit appelé");
    this.getAssignmentsPaginated();

    // Activer le bouton après 3 secondes
    setTimeout(() => {
      this.boutonActive = true;
    }, 2000);
  }

  getAssignmentsPaginated() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(
      data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log("Données paginées reçues");
      }
    );
  }

    getColor(assignment: any) {
    if (assignment.rendu) {
      return 'green';
    } else {
      return 'red';
    }
  }

    onAjouterAssignment(event:any) {
    console.log("Ajout NOM = " + this.nomAssignment + " date = " + this.dateDeRendu);
    
    // On crée un nouvel assignment
    const nouvelAssignment: Assignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false; // Par défaut, il n'est pas rendu

    console.log(nouvelAssignment);

    // On l'ajoute à la liste
    this.assignments.push(nouvelAssignment);

  }

  assignmentClique(assignment: Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  onSupprimerAssignment(event: Assignment) {
    this.assignments = this.assignments.filter(a => a !== event);

    if (this.assignmentSelectionne === event) {
      this.assignmentSelectionne = undefined as unknown as Assignment;
    }
  }

  peuplerBD() {
    this.assignmentsService.peuplerBD().subscribe(() => {
      console.log('LA BASE A ETE PEUPLEE');
      this.getAssignmentsPaginated();
    });
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsPaginated();
  }

  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page = this.prevPage;
      this.getAssignmentsPaginated();
    }
  }

  pageSuivante() {
    if (this.hasNextPage) {
      this.page = this.nextPage;
      this.getAssignmentsPaginated();
    }
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsPaginated();
  }
}
