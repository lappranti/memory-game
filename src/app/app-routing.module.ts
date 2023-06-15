import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterComponent } from './pages/starter/starter.component';
import { GamingComponent } from './pages/gaming/gaming.component';

const routes: Routes = [
  {
    path: 'start',
    component: StarterComponent
  },
  {
    path: 'game',
    component: GamingComponent
  },
  {
    path: '',
    component: StarterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
