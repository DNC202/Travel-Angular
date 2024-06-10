import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Tour } from '../../../models/tour/tour';
import { ToursService } from '../../../services/tour/tours.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddTourComponent } from '../add-tour/add-tour.component';
import { EditTourComponent } from '../edit-tour/edit-tour.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule],
})
export class ListItemComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'destination', 'rating', 'price', 'duration', 'thumbnail', 'actions'];

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.getAllTours();
  }

  constructor(private _toursService: ToursService, private _dialog: MatDialog) {
    
  }

  getAllTours() {
    this._toursService.getAllTours().subscribe(
      tours => {
        this.table.dataSource = tours;
      }
    )
  }

  openAddForm(): void {
    const dialogRef = this._dialog.open(AddTourComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTours();
      }
    });
  }

  openEditDialog(tour: Tour): void {
    const dialogRef = this._dialog.open(EditTourComponent, {
      width: '400px',
      data: tour
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTours();
      }
    });
  }

  deleteTour(id: number) {
    this._toursService.deleteTour(id).subscribe(
      tour => {
        this.getAllTours();
      },
      
    )
  } 
}
