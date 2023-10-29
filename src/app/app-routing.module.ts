import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanerComponent } from 'src/app/component/planer/planer.component';
import { HomeComponent } from 'src/app/component/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'planer', component: PlanerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
