import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { Loginform } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {
                 this.googleInit();
                }

  googleInit(){

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '863469564808-jv2p7v0m3di8jghvir8f0rpdsj6oqfrn.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
    
  }

  //función de logout
  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => { 
        this.router.navigateByUrl('/login');
      })
    });

  }

  // nos conectamos al backend y renovamos el token
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

   return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) =>{
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData )
                .pipe(
                  tap( (resp: any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  login( formData: Loginform ){
    
    return this.http.post(`${base_url}/login`, formData )
                .pipe(
                  tap( (resp: any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                )

  }

  loginGoogle( token: any ){
    
    return this.http.post(`${base_url}/login/google`, { token } )
                .pipe(
                  tap( (resp: any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                )

  }
}
