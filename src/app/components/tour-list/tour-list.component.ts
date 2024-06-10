import { Component, Input, OnInit } from '@angular/core';
import { Tour } from '../../models/tour/tour';
import { CommonModule } from '@angular/common';
import { ToursService } from '../../services/tour/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { query } from 'express';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss'
})
export class TourListComponent implements OnInit{
  @Input() tours!: Tour[];
  search!: string;
  constructor(private _toursService: ToursService, private _dialog: MatDialog) { }

  ngOnInit() {
  }
}
