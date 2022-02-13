import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PruebaService } from 'src/app/services/prueba.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  constructor(private formulario:FormBuilder,
              private servicio:PruebaService) { }

  empleado:Empleado ={
    identificacion: 0,
    nombres: '',
    apellidos: '',
    cargo: '',
    genero: ''
  }


  idEmpleado:string = ''

  registroEmpleado = this.formulario.group({
    identificacion: [""],
    nombres: [""],
    apellidos: [""],
    cargo: [""],
    genero: [""]
  })

  postDataEmployee(){
    
    this.empleado = this.registroEmpleado.value
    console.log(this.empleado)

    this.servicio.agregarEmpleado(this.empleado).then((resp) => {
      console.log("Empleado agregado")
    }).catch(err => {
      console.log(err)
    })

    this.registroEmpleado.patchValue({
      identificacion: '',
      nombres: '',
      apellidos: '',
      cargo: '',
      genero: ''
    })
  }

  // cambiarCargo(e:any){
  //   console.log(e.target.value)
  //   this.registroEmpleado.controls['cargo'].setValue(e.target.value)
  // }



  empleadoModificar:Empleado = {
    identificacion: 0,
    nombres: '',
    apellidos: '',
    cargo: '',
    genero: ''
  }

  editarEmpleado(empleado:any){
    this.registroEmpleado.patchValue({
      identificacion: empleado.dataEmpleado.identificacion,
      nombres: empleado.dataEmpleado.nombres,
      apellidos: empleado.dataEmpleado.apellidos,
    })

    this.idEmpleado = empleado.id;
    this.empleadoModificar = empleado.dataEmpleado;
    console.log(this.empleadoModificar)
  }



modificarEmpleado(){

  this.empleadoModificar = this.registroEmpleado.value

  console.log(this.empleadoModificar)
  this.servicio.modificarEmpleado(this.idEmpleado, this.empleadoModificar)
}


eliminarEmpleado(id:string){ //simplemente le pasamos el id al servicio y este elimina el registro de la base de datos
  this.servicio.eliminarEmpleado(id).then(() => {
    console.log("Registro eliminado")
  }).catch(err => {
    console.log(err)
  })
}

  listaEmpleados:any[] = []


  listarEmpleado(){
    this.servicio.obtenerEmpleado().subscribe(data => {
      this.listaEmpleados = [];
      //debido a que nos manda la data por un lado y el id por otro, haremos los siguiente utilizando la elipsis
      data.forEach((element:any) => {
        //haremos push de un objeto
        // this.listaEmpleados.push({ 
        //   id: element.payload.doc.id, //es como decir has una copia del objeto anterior y agrega lo siguiente a esa copia
        //   element.payload.doc.data()
        // });
        let empleado = {
          id: element.payload.doc.id,
          dataEmpleado: element.payload.doc.data()
        }
        this.listaEmpleados.push(empleado)
      });
      // console.log(this.listaEmpleados)
    })
  }

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

  listarGenero(){
    this.servicio.obtenerGenero().subscribe(genero => {
      this.listaGenero = []
      genero.forEach((element:any) => {
        let generoData = {
          id: element.payload.doc.id,
          dataGenero: element.payload.doc.data()
        }

        this.listaGenero.push(generoData)
      });
      console.log(this.listaCargos)
    })
  }

  // listarGenero(){
  //   this.servicio.obtenerGenero().subscribe(genero => {
  //     genero.forEach((gen:any) => {
  //       this.listaGenero = gen.payload.doc.data().genero
  //     });
  //     // console.log(this.listaGenero)
  //   })
  // }

  ngOnInit(): void {
    this.listarEmpleado()
    this.listarCargos()
    this.listarGenero()
  }

}
