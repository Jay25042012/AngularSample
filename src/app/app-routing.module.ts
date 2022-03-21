import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcalculatorComponent } from './pcalculator/pcalculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', component: PcalculatorComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
