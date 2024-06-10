import { Component, OnChanges, OnInit } from '@angular/core';
import { TourListComponent } from '../../components/tour-list/tour-list.component';
import { Destination } from '../../models/destination/destination';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tour } from '../../models/tour/tour';
import { ToursService } from '../../services/tour/tours.service';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DestinationsService } from '../../services/destination/destinations.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [
    TourListComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit {
  destinations: Destination[] = [];
  search_name: string = '';
  search_destinationId: number = 0;
  toursSearch:Tour[] = [];
  selectedDestination!:number;
  constructor(private tourService:ToursService, private route:ActivatedRoute, private destinationService: DestinationsService) {}

  ngOnInit(): void {
    this.getDestination();
    // this.searchByName(this.query);
    this.search()
  }

  getDestination(): void{
    this.destinationService.getAllDestinations().subscribe(dest => {
      this.destinations = dest;
    })
  }

  search(destinationId?: number, title?: string): void {
    this.tourService.search(destinationId, title).subscribe(tours => {
      this.toursSearch = tours
    })
    console.log(this.toursSearch)
    console.log(this.search_name)
    console.log(this.search_destinationId)
  }
}
