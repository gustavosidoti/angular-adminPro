import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
   
    email:['', [ Validators.required, Validators.email ]],
    password:['',  Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
               private ngZone: NgZone,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) { }

  ngOnInit():void {
   this.renderButton();
    
  }
  login(){
    
    this.ngZone.run( () => {

      this.usuarioService.login( this.loginForm.value)
      .subscribe( resp => {

        if( this.loginForm.get('remember')!.value ){
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        }else{
          localStorage.removeItem('email');
        }

        // Si todo está bien con el backend tenemos que redireccionar al dashboard
        this.router.navigateByUrl('/');
        
      }, (err)=> {
        Swal.fire('Error', err.error.msg, 'error');      
      })
      //console.log(this.loginForm.value);
      //this.router.navigateByUrl('/dashboard');
    })
  }
  
  renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });

      this.startApp();
  }

  async startApp () {

        await this.usuarioService.googleInit();
        this.auth2 = this.usuarioService.auth2;
      
        this.attachSignin(document.getElementById('my-signin2'));
      
  };

  attachSignin(element: any) {
      
      this.auth2.attachClickHandler(element, {},
          (googleUser: any) => {

            // obtenemos el id token del pop up de google
            const id_token = googleUser.getAuthResponse().id_token;

            // llamamos al servicio de login con Google y le pasamos ese token
            this.usuarioService.loginGoogle( id_token )
                .subscribe( resp =>{
                    // Si todo está bien con el backend tenemos que redireccionar al dashboard
                    this.ngZone.run(() => { 
                      this.router.navigateByUrl('/');
                    })
                    
                });

          }, (error:any) => {
            alert(JSON.stringify(error, undefined, 2));
          });
  }

}


