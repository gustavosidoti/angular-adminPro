import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTES
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


// Configurar rutas
const routes: Routes = [
    
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },

  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild( routes )
    ],
    exports: [ RouterModule ]
  })
  export class AuthRoutingModule { }