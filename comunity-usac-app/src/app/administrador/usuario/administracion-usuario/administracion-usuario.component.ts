import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';

@Component({
  selector: 'app-administracion-usuario',
  templateUrl: './administracion-usuario.component.html',
  styleUrls: ['./administracion-usuario.component.css']
})
export class AdministracionUsuarioComponent implements OnInit {

  usuarios$: any;
  usr: any = {};
  titulo$: string;
  accion$: number = 0;
  cat$: boolean = true;
  classActionSecond: string = `col-md-4 col-sm-12`;
  selectRoles$: any = [];
  selectRolesFiltro$: any = [];
  selectFacultades$: any = [];
  selectCarreras$: any = [];
  selectCarrerasFiltroFC$: any = [];
  selectCarrerasFiltroC$: any = [];
  selectCiencias$: any = [];
  selectCienciasFiltro$: any = [];
  


  constructor(private data: AdministracionService) { }

  ngOnInit() {
    this.obtenerUsuarios();
    this.obtenerDataSelect();
  }

  obtenerUsuarios(){
    this.data.getUsuarios().subscribe( data => {
      let lista: any = data;
      this.usuarios$ = lista.map( element => Object.assign({ estado: 1 }, element) );
      if(this.usr.registro)
        this.obtenerUsuario(this.usr.registro);
    });
  }

  obtenerUsuario(registro){
    for (let i = 0; i < this.usuarios$.length; i++) {
      if(this.usuarios$[i].registro == registro){
          this.usr = Object.assign({}, this.usuarios$[i])
          this.verificarCatedratico();
          this.filtrarRoles();
          this.updateCarreras(this.selectFacultades$[0].codigo);
          if(this.selectCarrerasFiltroC$[0])
            this.updateCiencias(this.selectCarrerasFiltroC$[0].codigo);
          break;
      }
    }
  }

  guardarCambios(continuar, registro, nombre, contrasenia, correo, telefono, fotografia = './profile.png'){
    const usuario = { registro: registro, nombre: nombre, contrasenia: contrasenia, correo: correo, telefono: telefono, fotografia: fotografia }
    if(this.titulo$ == 'Crear Usuario'){
      if(continuar){
        this.data.postUsuario(usuario).subscribe( () => {
          this.accion$ = 3;
          this.usr = Object.assign({ roles: [], carreras: [], ciencias: [] }, usuario);
          this.filtrarRoles();
          this.updateCarreras(this.selectFacultades$[0].codigo);
          if(this.selectCarrerasFiltroC$[0])
            this.updateCiencias(this.selectCarrerasFiltroC$[0].codigo);
          this.cambioContenido(3);
        });
      }else{
        this.data.postUsuario(usuario).subscribe( () => {
          this.usuarios$ = [];
          this.obtenerUsuarios();
          this.usr = {};
          this.accion$ = 0;
        });
      }
    }else{
      if(continuar){
        this.data.putUsuario(usuario).subscribe( () => {
          this.accion$ = 3;
          this.usr = Object.assign(this.usr, usuario);
          this.cambioContenido(3);
        });
      }else{
        this.data.putUsuario(usuario).subscribe( () => {
          this.usuarios$ = [];
          this.obtenerUsuarios();
          this.usr = {};
          this.accion$ = 0;
        });
      }
    }
  }

  agregarRol(codigo){
    this.data.postUsuarioRol({ registro: this.usr.registro, codigo: codigo }).subscribe( () => this.obtenerUsuarios() );
  }

  eliminarRol(codigo){
    this.data.deleteUsuarioRol(this.usr.registro, codigo).subscribe( () => this.obtenerUsuarios() );
  }

  agregarCarrera(codigo){
    this.data.postUsuarioCarrera({ registro: this.usr.registro, codigo: codigo }).subscribe( () => this.obtenerUsuarios() );
  }

  eliminarCarrera(codigo){
    this.data.deleteUsuarioCarrera(this.usr.registro, codigo).subscribe( () => this.obtenerUsuarios() );
  }

  agregarCiencia(codigo){
    this.data.postUsuarioCiencia({ registro: this.usr.registro, codigo: codigo }).subscribe( () => this.obtenerUsuarios() );
  }

  eliminarCiencia(codigo){
    this.data.deleteUsuarioCiencia(this.usr.registro, codigo).subscribe( () => this.obtenerUsuarios() );
  }

  eliminarUsuario(registro){
    this.data.deleteUsuario(registro).subscribe( data => this.obtenerUsuarios() );
  }

  cambioTab(estado, registro){
    this.usuarios$ = this.usuarios$.map( element => {
      if(element.registro == registro){
        element.estado = estado;
      }
      return element;
  });
  }

  cambioContenido(accion, registro = 0){
    this.accion$ = accion;
    switch(accion){
      case 1: 
        this.titulo$ = `Crear Usuario`
        this.accion$ = 1;
        break;
      case 2: 
        this.titulo$ = `Actualizar Usuario`
        this.accion$ = 1;
        this.obtenerUsuario(registro);
        break;
      case 3:
          this.verificarCatedratico();
          this.accion$ = 2;
          this.titulo$ = `Administrad Roles, Facultades/Carreras y Catedras`;
        break;
      case 4:
        this.usr = {};
        this.usuarios$ = [];
        this.obtenerUsuarios();
        this.accion$ = 0;
        break;
    }
  }

  obtenerDataSelect(){
    this.data.getRoles().subscribe( data => this.selectRoles$ = data );
    this.data.getFacultades().subscribe( data => this.selectFacultades$ = data );
    this.data.getCarreras().subscribe( data => this.selectCarreras$ = data );
    this.data.getCiencias().subscribe( data => this.selectCiencias$ = data );
  }

  filtrarRoles(){
    this.selectRolesFiltro$ = [];
    if(this.usr.roles.length != 0){
      this.selectRoles$.forEach( r => {
        if(!this.usr.roles.some( ({ codigor }) => codigor == r.codigo ))
          this.selectRolesFiltro$.push(r);
      });
    }else{
      this.selectRolesFiltro$ = this.selectRoles$;
    }
  }

  filtrarCarreras(){
    this.selectCarrerasFiltroC$ = [];
    this.selectCarrerasFiltroFC$ = [];
    if(this.usr.carreras.length != 0){
      this.selectCarreras$.forEach( c => {
        if(!this.usr.carreras.some( ({ codigoca }) => codigoca == c.codigo ))
          this.selectCarrerasFiltroFC$.push(c);
        else  
          this.selectCarrerasFiltroC$.push(c);
      });
    }else{
      this.selectCarrerasFiltroFC$ = this.selectCarreras$;
    }
  }

  filtrarCiencias(){
    this.selectCienciasFiltro$ = [];
    if(this.usr.ciencias.length != 0){
      this.selectCiencias$.forEach( c => {
        if(!this.usr.ciencias.some( ({ codigoci }) => codigoci == c.codigo ))
          this.selectCienciasFiltro$.push(c);
      });
    }else{
      this.selectCienciasFiltro$ = this.selectCiencias$;
    }
  }

  updateCarreras(codigo){
    this.filtrarCarreras();
    const tmp = this.selectCarrerasFiltroFC$;
    this.selectCarrerasFiltroFC$ = [];
    tmp.forEach( carrera => {
      if(carrera.codigof == codigo)
        this.selectCarrerasFiltroFC$.push(carrera);
    });
  }


  updateCiencias(codigo){
    this.filtrarCiencias();
    const tmp = this.selectCienciasFiltro$;
    this.selectCienciasFiltro$ = [];
    tmp.forEach( ciencia => {
      ciencia.carreras.forEach( carrera => {
        if(carrera.codigoc == codigo){
          if(!this.selectCienciasFiltro$.some( ({ codigoc }) => codigoc == carrera.codigoc ))
            this.selectCienciasFiltro$.push(ciencia);
        }
      });
    });
  }

  verificarCatedratico(){
    this.cat$ = false;
    this.classActionSecond = `col-md-6 col-sm-12`;
    this.usr.roles.forEach( rol => {
      if(rol.rol == 'Catedratico'){
        this.cat$ = true;
        this.classActionSecond = `col-md-4 col-sm-12`;
      }
    });    
  }
}
