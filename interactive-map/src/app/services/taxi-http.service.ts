import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TaxiHttpService {
    constructor(private http: HttpClient) { }

    public getNearby(lat: number, long: number, count?: number): Observable<any> {
        return this.http.get(`http://localhost:5000/drivers?latitude=${lat}&longitude=${long}&count=${count}`).pipe(
            catchError((err) => { 
                return throwError(err)
            })
        );
    }
}
