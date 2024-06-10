import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour/tour';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  apiUrl = 'https://localhost:7211/api/tours';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    .set('access-control-allow-origin', "https://localhost:7211/") };
  
  public searchSubject = new BehaviorSubject<string>('');
  

  constructor(private _httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send error to remote login infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  getAllTours(): Observable<Tour[]> {
    return this._httpClient.get<Tour[]>(this.apiUrl);
  }

  getTourDetails(id: number): Observable<Tour> {
    return this._httpClient.get<Tour>(`${this.apiUrl}/${id}`);
  }

  addTour(formData: FormData): Observable<Tour>{
    return this._httpClient.post<Tour>(this.apiUrl+'/add', formData).pipe(
      tap((tour: Tour) => console.log(`Tour added successfully:`, tour)),
      catchError(this.handleError<Tour>('addTour'))
    );
  }

  deleteTour(id: number): Observable<Tour> {
    return this._httpClient.delete<Tour>(this.apiUrl + '/delete/' + id, this.httpOptions).pipe(
      tap( _ => {console.log('Tour deleted successfully')}),
      catchError(this.handleError<Tour>('deleteTour'))
    );
  }

  updateTour(id: number, formData: FormData): Observable<Tour> {
    return this._httpClient.put<Tour>(`${this.apiUrl}/edit/${id}`, formData).pipe(
      tap((tour: Tour) => console.log(`Tour updated successfully with id=${id}`)),
      catchError(this.handleError<Tour>('updateTour'))
    );
  }

  search(destinationId?: number, title?: string): Observable<Tour[]> {
    let params = new HttpParams();
    if (destinationId !== undefined) {
      params = params.set('DestinationId', destinationId.toString());
    }
    if (title !== undefined) {
      params = params.set('Title', title);
    }
    return this._httpClient.get<Tour[]>(this.apiUrl, { params, ...this.httpOptions });
  }
}
