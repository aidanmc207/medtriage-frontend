import { Routes } from '@angular/router';
import { CitaListComponent } from './citas/cita-list.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';

export const routes: Routes = [
  { path: 'citas', component: CitaListComponent },
  { path: 'nueva-cita', component: NuevaCitaComponent },
  { path: '', redirectTo: 'citas', pathMatch: 'full' },
  { path: '**', redirectTo: 'citas' }
];
