import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { NoFoundComponent } from './pages/no-found/no-found.component';
import { AddBandComponent } from './pages/add-band/add-band.component';
import { EditComponent } from './pages/edit/edit.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddBandComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '**', component: NoFoundComponent }, // 404
  { path: '', redirectTo: 'home', pathMatch: 'full' } // Default
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
