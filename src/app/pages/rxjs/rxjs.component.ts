import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy  {

public intervalSubs: Subscription;

  constructor() { 

    // nos suscribimos lo ponemos a trabajar al observable

    // this.retornaObservable().pipe(
    //      retry(1)  // llama 1 vez nuevamente al observable
    //    ).subscribe(
    //       valor => console.log('Subs:', valor), // valor ejecutandose
    //       error => console.warn('Error:', error), // si hay un error
    //       () => console.info('Obs terminado') // si finaliza completado
    //    );  

    this.intervalSubs = this.retornaIntervalo()
        .subscribe ( console.log)

        // es lo mismo que .suscribe ( (valor) => console.log (valor))
        // se da cuenta que tiene que mostrar lo que llega en ese orden

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe(); // matamos el suscribe() cuando abandonamos
  }

  ngOnInit(): void {
  }

  retornaIntervalo(): Observable<number> {

    return interval(500)
            .pipe(
              map( valor => valor +1),
              filter( valor => (valor % 2 === 0) ? true : false)
            );
  }

  retornaObservable(): Observable<number>{
    
    let i = -1;

    return new Observable<number>( observer => {  // se acostumbra a identificarlos con el $
      

      const intervalo = setInterval( () => {

        i++;
        observer.next(i) // que hace después de que se ejecuta

        if ( i === 4){
            clearInterval( intervalo); // lo cancelamos
            observer.complete();
        }

        // forzamos el error
        if ( i === 2 ) {
          
          observer.error('i llego al valor de 2');
        }

      }, 1000 )

    });

  }

}
