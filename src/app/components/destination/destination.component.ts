import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destination } from '../../models/destination/destination';
import { DestinationsService } from '../../services/destination/destinations.service';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.scss'
})
export class DestinationComponent {
  destinations: Destination[] = [];

  constructor(private _destinationService: DestinationsService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDestinations();
  }

  getAllDestinations() {
    this._destinationService.getAllDestinations().subscribe(dest => {
      this.destinations = dest
    })
  }
}
