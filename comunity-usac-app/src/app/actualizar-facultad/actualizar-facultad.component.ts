import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-facultad',
  templateUrl: './actualizar-facultad.component.html',
  styleUrls: ['./actualizar-facultad.component.css']
})
export class ActualizarFacultadComponent implements OnInit {

  facultad$: any;
  accion: string;
  crear: boolean = true;
  constructor(private data: DataService, private route: ActivatedRoute, public router: Router) { 
    this.route.params.subscribe(data => this.facultad$ = data.codigo)
  }

  ngOnInit() {
    if(this.facultad$ == -1){
      this.accion = 'Crear';
    }else{
      this.crear = false;
      this.accion = 'Actualizar';
      this.data.getFacultad(this.facultad$).subscribe( data => {
        this.facultad$ = data;
    });
    }
  }

  guardarCambios(codigo, nombre, descripcion){
    const facultad = {
      codigo_facultad: codigo,
      nombre: nombre,
      descripcion: descripcion
    }
    if(this.crear){
      this.data.postFacultad(facultad).subscribe( data =>{
        this.router.navigate(['/administracion-facultad']);
      });
    }else{
      this.data.putFacultad(facultad).subscribe( data =>{
        this.router.navigate(['/administracion-facultad']);
      });
    }
  }
}