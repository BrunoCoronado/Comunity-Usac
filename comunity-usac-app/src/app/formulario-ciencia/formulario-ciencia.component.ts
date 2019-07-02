import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-ciencia',
  templateUrl: './formulario-ciencia.component.html',
  styleUrls: ['./formulario-ciencia.component.css']
})
export class FormularioCienciaComponent implements OnInit {

  ciencia$: any;
  accion: string;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe( data => this.ciencia$ = data.codigo );
  }

  ngOnInit() {
    if(this.ciencia$ == -1){
      this.accion = 'Crear';
    }else{
      this.accion = 'Actualizar';
      this.data.getCiencia(this.ciencia$).subscribe( data => this.ciencia$ = data[0] );
    }
  }

  guardarCambios(continuar, codigo, nombre, descripcion){
    const ciencia = {
      codigo_ciencia: codigo,
      nombre: nombre,
      descripcion: descripcion
    }
    if(this.accion === 'Crear'){
      if(continuar)
        this.data.postCiencia(ciencia).subscribe( data => this.router.navigate([`/formulario-ciencia/carrera/${ codigo }`]));
      else
        this.data.postCiencia(ciencia).subscribe( data => this.router.navigate(['/administracion-ciencia']));
    }else
      if(continuar)
        this.data.putCiencia(ciencia).subscribe( data => this.router.navigate([`/formulario-ciencia/carrera/${ codigo }`]));
      else
        this.data.putCiencia(ciencia).subscribe( data => this.router.navigate(['/administracion-ciencia']));
  }
}
