import { Component } from '@angular/core';
import { DestinationComponent } from '../../components/destination/destination.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    DestinationComponent 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
