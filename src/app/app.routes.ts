import { Routes } from '@angular/router';
import { Assignments } from './assignments/assignments';
import { AddAssignment } from './assignments/add-assignment/add-assignment';
import { AssignmentDetail } from './assignments/assignment-detail/assignment-detail';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment';
import { authGuard } from './shared/auth-guard';
import { AssignmentsConnexion } from './assignments-connexion/assignments-connexion';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: Assignments},
    {path: 'add', component: AddAssignment, canActivate: [authGuard]},
    {path: 'assignment/:id', component: AssignmentDetail},
    {path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard]},
    {path: 'login', component: AssignmentsConnexion}
];
