import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Destination } from '../../../models/destination/destination';
import { DestinationsService } from '../../../services/destination/destinations.service';
import { ToursService } from '../../../services/tour/tours.service';
import { AddTourComponent } from '../add-tour/add-tour.component';
import { Tour } from '../../../models/tour/tour';

@Component({
  selector: 'app-edit-tour',
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
  templateUrl: './edit-tour.component.html',
  styleUrl: './edit-tour.component.scss'
})
export class EditTourComponent implements OnInit{
  editForm: FormGroup;
  destinations: Destination[] = [];
  selectedFile: File | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tour,private fb: FormBuilder, private tourService: ToursService,private destinationService: DestinationsService, private dialogRef: MatDialogRef<AddTourComponent>) {
    this.editForm = this.fb.group({
      id: new FormControl(data.id),
      title: new FormControl(data.title, [Validators.required]),
      destinationId: new FormControl(data.destination, [Validators.required]),
      price: new FormControl(data.price, [Validators.required, Validators.min(10), Validators.max(999)]),
      rating: new FormControl(data.rating, [Validators.required, Validators.min(0), Validators.max(5)]),
      duration: new FormControl(data.duration, [Validators.required]),
      thumbnail: new FormControl(data.thumbnail, [])
    });
   }

  ngOnInit(): void {
    this.getDestination();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.editForm.patchValue({ thumbnail: this.selectedFile.name });
      console.log(this.selectedFile.name);
    }
  }

  getDestination(): void{
    this.destinationService.getAllDestinations().subscribe(dest => {
      this.destinations = dest;
    })
    console.log(this.destinations)
  }

  onSubmit(): void {
    const newTour: Tour = this.editForm.value;
      console.log(newTour)
      this.tourService.updateTour(newTour.id, newTour).subscribe(
        (response: Tour) => {
          console.log('Tour updated successfully:', response);
          this.dialogRef.close();
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
