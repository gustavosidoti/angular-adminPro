import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router) { 

      this.tituloSubs$ = this.getArgumentosRuta()
                            .subscribe( ({ titulo }) => { // desestructuramos el objeto y nos quedamos con el titulo
                              this.titulo = titulo;
                            });

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){

    return this.router.events
        .pipe(
          filter( (event:any) => event instanceof ActivationEnd ), // metodo de java para averiguar la instancia de la ruta
          filter( (event: ActivationEnd ) => event.snapshot.firstChild === null ), // filtro para quedarnos con los datos de la ruta hija
          map( ( event: ActivationEnd) => event.snapshot.data ), // extraemos la propiedad data
        )
        
  }
  

}
