import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveys: any[] = [];

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    this.surveyService.getSurveys().subscribe((data: any[]) => {
      this.surveys = data;
    });
  }
}
