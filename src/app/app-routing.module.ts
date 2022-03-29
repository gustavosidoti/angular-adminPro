import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

// MODULOS 
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// COMPONENTES
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




// Configurar rutas
const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting

  { path: '* *', component: NopagefoundComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
