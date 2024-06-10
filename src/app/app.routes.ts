import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ToursComponent } from './pages/tours/tours.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { ListItemComponent } from './admin/components/list-item/list-item.component';
import { ListDestinationComponent } from './admin/components/list-destination/list-destination.component';
import { AdminGuard } from './auth/admin.guard';
import { AccessDeniedComponent } from './components/errors/access-denied/access-denied.component';
// import { TourDetailComponent } from './pages/tour-detail/tour-detail.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tours', component: ToursComponent},
    // { path: 'tours/:id', component: TourDetailComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard], children: [
        { path: 'destinations', component: ListDestinationComponent},
        { path: 'tours', component: ListItemComponent},
    ]},

    //Error pages
    { path: 'access-denied', component: AccessDeniedComponent},
];
