import { Component, OnInit } from '@angular/core';
import { AccesoComunService } from '../acceso-comun.service';
import { ComunService } from '../comun.service';

import * as jspdf from 'jspdf';  
  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  estadistica: any = 1;
  ciencia: any = 0;
  titulo: string;
  ciencias: any = [];
  informacion: any = [];


  constructor(private acceso: AccesoComunService, private data: ComunService) { }

  ngOnInit() {
    this.acceso.validarAcceso(0);
    this.data.getCiencias().subscribe( data => this.ciencias = data );
    this.verEstadistica();
  }

  verEstadistica(){
    this.ciencia = 0;
    switch(this.estadistica){
      case 1: 
        this.titulo = 'Top 3 Catedráticos con más respuestas';
        this.data.getEstadistica(1, 3).subscribe( data => this.informacion = data );
        break;
      case 2: 
        this.titulo = 'Top 10 Estudiantes con más respuestas';
        this.data.getEstadistica(1, 2).subscribe( data => this.informacion = data );
        break;
      case 3: 
        this.titulo = 'Top 3 Ciencias con más respuestas en temas'
        this.data.getEstadistica(2).subscribe( data => this.informacion = data );
        break;
      case 4: 
        this.titulo = 'Top 5 Estudiantes con más temas'
        this.data.getEstadistica(3, 2).subscribe( data => this.informacion = data );
        break;
      case 5: 
        this.titulo = 'Top 5 Catedráticos con más temas'
        this.data.getEstadistica(3, 3).subscribe( data => this.informacion = data );
        break;
    }
  }

  cambiarCiencia(){
    switch(this.estadistica){
      case 1: this.data.getEstadistica(1, 3, this.ciencia).subscribe( data => this.informacion = data );
        break;
      case 2: this.data.getEstadistica(1, 2, this.ciencia).subscribe( data => this.informacion = data );
        break;
      case 4: this.data.getEstadistica(3, 2, this.ciencia).subscribe( data => this.informacion = data );
        break;
      case 5: this.data.getEstadistica(3, 3, this.ciencia).subscribe( data => this.informacion = data );
        break;
    }
  }

  generarPDF(){
    var data = document.getElementById('contenido');  
    html2canvas(data , { allowTaint: true, useCORS: false, scale: 1 } ).then( canvas => {
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`${this.titulo}.pdf`);
    });
  }
}
