import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'https://localhost:5001/api/response'; 

  constructor(private http: HttpClient) { }

  createResponse(response: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, response);
  }
}
