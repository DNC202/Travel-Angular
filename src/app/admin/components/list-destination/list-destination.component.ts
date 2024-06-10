import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { DestinationsService } from '../../../services/destination/destinations.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-destination',
  templateUrl: './list-destination.component.html',
  styleUrl: './list-destination.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule]
})
export class ListDestinationComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'image', 'actions'];

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.getAllDestinations();
    console.log(this.table.dataSource);
  }

  constructor(private _destinationsService: DestinationsService) {
    
  }

  getAllDestinations() {
    this._destinationsService.getAllDestinations().subscribe(
      destinations => {
        this.table.dataSource = destinations;
      }
    )
  }

  deleteDestination(id: number) {
    this._destinationsService.deleteDestination(id).subscribe(
      destination => {
        this.getAllDestinations();
      },
      
    )
  } 
}
