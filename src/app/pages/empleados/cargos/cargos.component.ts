import { Component, OnInit } from '@angular/core';
import { PruebaService } from '../../../services/prueba.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  constructor(private servicio:PruebaService, private formu:FormBuilder) { }



  listaCargos:any[] = []
  listaGenero:any[] = []

  listarCargos(){
    this.servicio.obtenerCargos().subscribe(cargos => {
      this.listaCargos = []
      cargos.forEach((element:any) => {
        let cargoData = {
          id: element.payload.doc.id,
          dataCargo: element.payload.doc.data()
        }

        this.listaCargos.push(cargoData)
      });
      console.log(this.listaCargos)
    })
  }

  cargoAgregado:any = {
    cargo: ''
  }

  registroCargo = this.formu.group({
    cargo: [""],
  })

  registrarCargo(){
    this.cargoAgregado = this.registroCargo.value;
    this.servicio.registrarCargos(this.cargoAgregado).then(() => {
      console.log("El cargo se ha registrado")
    }).catch(err => {
      console.log(err)
    })
    this.registroCargo.patchValue({
      cargo: ''
    })
  }

  eliminarCargo(id:string){
    this.servicio.eliminarCargo(id).then(() => {
      console.log("Registro eliminado")
    }).catch(err => {
      console.log(err)
    })
  }

  idCargo:string = '';
  cargoAgregadoMod:any = {
    cargo: ''
  }

  editarCargo(cargo:any){
    this.registroCargo.patchValue({
      cargo: cargo.dataCargo.cargo
    })
    this.idCargo = cargo.id
    console.log(this.idCargo)
  }

  modificarCargo(){
    this.cargoAgregadoMod = this.registroCargo.value;
    this.servicio.modificarCargo(this.idCargo, this.cargoAgregadoMod).then(() => {
      console.log("Cargo modificado")
    }).catch(err => {
      console.log(err)
    })
    this.registroCargo.patchValue({
      cargo: ''
    })
  }


  ngOnInit(): void {
    this.listarCargos();
  }



}
