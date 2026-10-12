import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CitaMedica } from '../models/cita.model';
import { CitaService } from '../services/cita.service';

type PrioridadFiltro = 'TODAS' | 'ALTA' | 'MEDIA' | 'BAJA';

@Component({
  selector: 'app-cita-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './cita-list.component.html',
  styleUrl: './cita-list.component.css'
})
export class CitaListComponent implements OnInit {
  private readonly citaService = inject(CitaService);

  readonly citas = signal<CitaMedica[]>([]);
  readonly filtroPrioridad = signal<PrioridadFiltro>('TODAS');
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);
  readonly prioridades: PrioridadFiltro[] = ['TODAS', 'ALTA', 'MEDIA', 'BAJA'];

  readonly citasFiltradas = computed(() => {
    const filtro = this.filtroPrioridad();
    const citas = this.citas();

    return filtro === 'TODAS'
      ? citas
      : citas.filter((cita) => cita.nivelPrioridad.toUpperCase() === filtro);
  });

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.citaService.getCitas().subscribe({
      next: (citas) => {
        this.citas.set(citas);
        this.cargando.set(false);
      },
      error: (error: unknown) => {
        console.error('No se pudieron cargar las citas médicas.', error);
        this.error.set('No fue posible cargar las citas. Intenta de nuevo.');
        this.cargando.set(false);
      }
    });
  }
}
