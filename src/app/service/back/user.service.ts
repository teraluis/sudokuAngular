import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../module/inscription/inscription.component';
import {Observable, of} from 'rxjs';
import {UUID} from '../../helper/UUID';
import {UtilitiesService} from './utilities.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.localBackend;
  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  addUser(user: User): Observable<UUID> {
    const utilities = this.utilitiesService.getUtilities();
    return this.http.post<UUID>(this.baseUrl + '/user/', user, {
      headers: utilities.headers
    }).pipe(map((resp: UUID) => resp), catchError( (error: HttpErrorResponse) => {
      this.utilitiesService.handleError(error);
      return of(null);
    }));
  }
}
