import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CrearCitaPayload } from '../models/cita.model';
import { CitaService } from '../services/cita.service';

@Component({
  selector: 'app-nueva-cita',
  imports: [FormsModule, RouterLink],
  templateUrl: './nueva-cita.component.html',
  styleUrl: './nueva-cita.component.css'
})
export class NuevaCitaComponent {
  private readonly citaService = inject(CitaService);
  private readonly router = inject(Router);

  pacienteId: number | null = null;
  doctorId: number | null = null;
  nivelPrioridad = 'MEDIA';
  motivoConsulta = '';
  montoConsulta: number | null = null;
  fechaCita = '';
  guardando = false;
  error = '';

  crearCita(): void {
    if (
      this.pacienteId === null ||
      this.doctorId === null ||
      this.montoConsulta === null ||
      !this.fechaCita
    ) {
      return;
    }

    const payload: CrearCitaPayload = {
      pacienteId: this.pacienteId,
      doctorId: this.doctorId,
      nivelPrioridad: this.nivelPrioridad,
      motivoConsulta: this.motivoConsulta.trim(),
      montoConsulta: this.montoConsulta,
      fechaCita: this.fechaCita
    };

    this.guardando = true;
    this.error = '';
    this.citaService.crearCita(payload).subscribe({
      next: () => {
        void this.router.navigateByUrl('/citas');
      },
      error: (error: unknown) => {
        console.error('No se pudo crear la cita médica.', error);
        this.error = 'No fue posible crear la cita. Revisa los datos e intenta de nuevo.';
        this.guardando = false;
      }
    });
  }
}
