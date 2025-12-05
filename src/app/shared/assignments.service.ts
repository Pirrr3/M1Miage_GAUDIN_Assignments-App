import { Injectable } from '@angular/core';
import { Observable,of, forkJoin } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { map, switchMap } from 'rxjs/operators';
import { LoggingService } from './logging';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  //backendURL = 'http://localhost:8010/api/assignments';
  backendURL = 'https://m1miage-gaudin-apiangular.onrender.com/api/assignments';


  /*
    assignments: Assignment[] = [
    {
      id: 1,
      nom: 'TP Angular',
      dateDeRendu: new Date('2025-10-11'),
      rendu: true
    },
    {
      id: 2,
      nom: 'TP Python',
      dateDeRendu: new Date('2025-10-18'),
      rendu: false
    },
    {
      id: 3,
      nom: 'TP Java',
      dateDeRendu: new Date('2025-11-04'),
      rendu: false
    }
  ];
*/

  constructor(private loggingService: LoggingService, private http: HttpClient) {
    //console.log('Service AssignmentsService créé');
  }

  getAssignments(): Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.backendURL).pipe(map((res: any) => (Array.isArray(res) ? res : res?.docs ?? [])));
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.backendURL}?page=${page}&limit=${limit}`);
  }


  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, 'ajouté');
    return this.http.post<Assignment>(this.backendURL, assignment);
  }


  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendURL+'/'+assignment.id, assignment);
  }
  
  deleteAssignment(assignment: Assignment): Observable<any> {
    //const idToDelete = assignment._id ?? assignment.id;
    return this.http.delete<Assignment>(this.backendURL+'/'+assignment._id);
  }

  // get un assignment par son id
  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.backendURL+'/'+id);
  }

  peuplerBD(): Observable<any> {
    return this.http.get<any[]>('/DATA.json').pipe(
      switchMap((items: any[]) => {
        const ops: Observable<Assignment>[] = items.map((item: any) => {
          const dateKey = Object.keys(item).find((k) => k.toLowerCase().includes('peuplerbd'));
          const dateStr = dateKey ? item[dateKey] : item['dateDeRendu'];

          const assignment: Assignment = {
            _id: item._id?.$oid ?? item._id,
            id: item.id ?? Math.floor(Math.random() * 1000000),
            nom: item.nom ?? 'Assignment',
            dateDeRendu: dateStr ? new Date(dateStr) : new Date(),
            rendu: !!item.rendu,
          };

          return this.addAssignment(assignment);
        });

        return forkJoin(ops);
      })
    );
  }
}
