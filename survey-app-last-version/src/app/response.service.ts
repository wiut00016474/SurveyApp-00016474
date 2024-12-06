import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'https://localhost:7265/api/response'; 

  constructor(private http: HttpClient) { }

  getResponses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getResponse(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  createResponse(response: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, response);
  }

  updateResponse(id: number, response: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, response);
  }

  deleteResponse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
