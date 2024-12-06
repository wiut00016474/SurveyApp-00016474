import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../response.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  responses: any[] = []; // responses property
  newResponse = { answer: '', surveyId: null }; //creation of a new response
  editingResponse: any = null; // responsse being edited
  updatedResponse = { responseId: null, answer: '', surveyId: null }; // updated response data

  constructor(
    private responseService: ResponseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getResponses(); // Load responses when the component is initialized.
    
  }

  


  getResponses() {
    this.responseService.getResponses().subscribe((data: any[]) => {
      console.log("responses", data);
      this.responses = data; // Assign the fetched data to the responses property.
    });
  }

  createResponse() {
    this.responseService.createResponse(this.newResponse).subscribe(data => {
      this.responses.push(data); // Add the new response to the list.
      this.newResponse = { answer: '', surveyId: null }; // Reset the form.
    });
  }

  editResponse(response: any) {
    this.editingResponse = { ...response }; // Clone the response for editing
    this.updatedResponse.responseId = response.responseId;
    this.updatedResponse.answer = response.answer; // Set existing answer
    this.updatedResponse.surveyId = response.surveyId; // Set existing surveyId
  }

  cancelEdit() {
    this.editingResponse = null; // Cancel editing
  }

  updateResponse() {
    if (this.editingResponse) {
      
      this.responseService.updateResponse(this.editingResponse.responseId, this.updatedResponse).subscribe(
        (updated) => {
          // Update the response in the list
          const index = this.responses.findIndex((r) => r.responseId === this.editingResponse.responseId);
          if (index !== -1) {
            this.responses[index] = updated;
          }

          // Reset editing state
          this.editingResponse = null;
          this.updatedResponse = { responseId: null, answer: '', surveyId: null };
        },
        (error) => {
          console.error("Error updating the response: ", error);
        }
      );
    }
  }

  deleteResponse(id: number) {
    this.responseService.deleteResponse(id).subscribe(() => {
      this.responses = this.responses.filter(r => r.responseId !== id); // Update the list after deletion.
    });
  }


}
