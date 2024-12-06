import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//16474
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'https://localhost:7265/api/survey';

  constructor(private http: HttpClient) { }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single survey by ID
  getSurvey(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new survey
  createSurvey(survey: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, survey);
  }

  // Update an existing survey
  updateSurvey(id: number, survey: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, survey);
  }

  // Delete a survey
  deleteSurvey(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
