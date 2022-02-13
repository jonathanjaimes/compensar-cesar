import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CargosComponent } from './pages/empleados/cargos/cargos.component';

const routes:Routes = [
  {
    path: '',
    component: InicioComponent,
    pathMatch: 'full'
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
  },
  {
    path: 'cargos',
    component: CargosComponent,
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
