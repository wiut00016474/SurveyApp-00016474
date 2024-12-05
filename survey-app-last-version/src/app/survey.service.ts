import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'https://localhost:5001/api/survey';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSurvey(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
