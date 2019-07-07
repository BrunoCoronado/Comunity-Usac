import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunService } from 'src/app/comun/comun.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-discusion-tema',
  templateUrl: './discusion-tema.component.html',
  styleUrls: ['./discusion-tema.component.css']
})
export class DiscusionTemaComponent implements OnInit {

  tema: any;
  imagenes: any = [];
  respuestas: any = [];
  @ViewChild('comentario', { static: false }) comentario: ElementRef;

  constructor(private route: ActivatedRoute, private data: ComunService, private sessionStorage: SessionStorageService) { 
    route.params.subscribe( data => this.tema = data.codigo );
  }

  ngOnInit() {
    this.data.getTema(this.tema).subscribe( data => {
      this.tema = data[0];
      this.data.getMultimedia(this.tema.CODIGO_TEMA).subscribe( data => this.imagenes = data );
      this.data.getRespuesta(this.tema.CODIGO_TEMA).subscribe( data => this.respuestas = data );
    }); 
  }

  guardarComentario(contenido){
    this.data.postRespuesta({
      contenido: contenido,
      registro: this.sessionStorage.retrieve('usr').registro,
      codigo_tema: this.tema.CODIGO_TEMA
    }).subscribe( () => this.data.getRespuesta(this.tema.CODIGO_TEMA).subscribe( data => this.respuestas = data ) );
    this.comentario.nativeElement.value = '';
  }
}
