import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class PcalculationService {
  private apiURL = "https://premiumcalculatorapi.azurewebsites.net";
  private response = 0;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  /**
  * Creates an instance of pcalculation service.
  */
  constructor(private httpClient: HttpClient) { }

  Calculate(body: any): Observable<Response[]> {
    return this.httpClient.post<Response[]>(this.apiURL, body,
      this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
