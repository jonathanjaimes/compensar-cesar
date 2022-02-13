import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private firestore:AngularFirestore) { }


  agregarEmpleado(empleado:Empleado):Promise<any>{ //Peermite agregar un empleado a la base de datos
    return this.firestore.collection('empleados').add(empleado) //Si la colección empleados no existe entonces la crea
  }

  obtenerEmpleado():Observable<any>{
    return this.firestore.collection('empleados').snapshotChanges()
    //como segundo argumento de collection se puede colocar una funcion flecha para ordenar como queremos que nos traiga los datos
    //ref => ref.orderBy('propiedad', 'asc o desc')
  }

  modificarCargo(id:string, cargo:any):Promise<any>{
    return this.firestore.collection('cargos').doc(id).update(cargo)
  }

  eliminarCargo(id:string):Promise<any>{
    return this.firestore.collection('cargos').doc(id).delete()
  }

  registrarCargos(cargo:any):Promise<any>{
    return this.firestore.collection('cargos').add(cargo)
  }

  obtenerCargos():Observable<any>{
    return this.firestore.collection('cargos').snapshotChanges()
  }

  obtenerGenero():Observable<any>{
    return this.firestore.collection('genero').snapshotChanges()
  }

  eliminarEmpleado(id:string):Promise<any>{
    //Accedemos a la colección empleados, al elemento con el id correspondiente y lo eliminamos
    return this.firestore.collection('empleados').doc(id).delete()
  }

  modificarEmpleado(id:string, empleadoMod:Empleado):Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(empleadoMod)
  }


}
