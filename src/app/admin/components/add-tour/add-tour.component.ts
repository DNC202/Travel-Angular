import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tour } from '../../../models/tour/tour';
import { ToursService } from '../../../services/tour/tours.service';
import { Destination } from '../../../models/destination/destination';
import { DestinationsService } from '../../../services/destination/destinations.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-tour',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './add-tour.component.html',
  styleUrl: './add-tour.component.scss'
})
export class AddTourComponent implements OnInit {
  tourForm: FormGroup;
  destinations: Destination[] = [];
  selectedFile: File | null = null;
  uploadResponse: string = "";


  constructor(private fb: FormBuilder, private tourService: ToursService,private destinationService: DestinationsService, private dialogRef: MatDialogRef<AddTourComponent>) {
    this.tourForm = this.fb.group({
      title: new FormControl('',[Validators.required]),
      destination: new FormControl('', [Validators.required]),
      rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      price: new FormControl(0, [Validators.required, Validators.min(10), Validators.max(999)]),
      duration: new FormControl('', [Validators.required]),
      thumbnail: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.getDestination();
  }

  getDestination(): void{
    this.destinationService.getAllDestinations().subscribe(dest => {
      this.destinations = dest;
    })
    console.log(this.destinations)
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    console.log(this.selectedFile)
  }

  uploadFile(formData: FormData){
    if(this.selectedFile){
      formData.append('file', this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.tourForm.valid) {
      this.uploadFile(formData);
      const formValues = this.tourForm.value;
      console.log(formValues)
      formData.append('Title', formValues.title);
      formData.append('DestinationId', formValues.destination);
      formData.append('Rating', formValues.rating);
      formData.append('Price', formValues.price);
      formData.append('Duration', formValues.duration);
      console.log(formData)
      this.tourService.addTour(formData).subscribe(
        (response: any) => {
          console.log('Tour added successfully:', response);
          this.dialogRef.close();
        },
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
