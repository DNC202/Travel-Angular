import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Destination } from '../../models/destination/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  apiUrl = 'https://localhost:7211/api/destinations';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    .set('access-control-allow-origin', "https://localhost:7211/") };
  constructor(private _httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send error to remote login infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  getAllDestinations(): Observable<Destination[]> {
    return this._httpClient.get<Destination[]>(this.apiUrl);
  }
  
  addDestination(newDestination: Destination): Observable<Destination>{
    return this._httpClient.post<Destination>(this.apiUrl+'/add', newDestination, this.httpOptions).pipe(
      tap( _ => {console.log('Im working')}),
      catchError(this.handleError<Destination>('addDestination'))
    );
  }
  
  deleteDestination(id: number): Observable<Destination> {
    return this._httpClient.delete<Destination>(this.apiUrl + '/delete/' + id, this.httpOptions).pipe(
      tap( _ => {console.log('Im working')}),
      catchError(this.handleError<Destination>('deleteDestination'))
    );
  }
  
  editDestination(id: number, newDestination: Destination): Observable<Destination> {
    return this._httpClient.put<Destination>(this.apiUrl + '/edit/' + id, newDestination, this.httpOptions).pipe(
      tap( _ => {console.log('Im working')}),
      catchError(this.handleError<Destination>('editDestination'))
    );
  }
}
