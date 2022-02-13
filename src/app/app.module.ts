import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RoutingModule } from './routing.module';
import { environment } from '../environments/environment';
import { CargosComponent } from './pages/empleados/cargos/cargos.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    InicioComponent,
    CargosComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
