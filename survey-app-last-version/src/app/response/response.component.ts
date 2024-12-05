import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../response.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  answer: string = '';
  surveyId!: number;

  constructor(
    private responseService: ResponseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.surveyId = Number(params.get('id'));
    });
  }

  submitResponse() {
    const response = {
      answer: this.answer,
      surveyId: this.surveyId
    };

    this.responseService.createResponse(response).subscribe(() => {
      alert('Response submitted!');
    });
  }
}
