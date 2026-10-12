import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environtment/environment';
import { CitaMedica, CrearCitaPayload } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.API_URL}citas`;

  getCitas(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(this.apiUrl);
  }

  getCitasPorPrioridad(prioridad: string): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(
      `${this.apiUrl}/prioridad/${encodeURIComponent(prioridad)}`
    );
  }

  crearCita(payload: CrearCitaPayload): Observable<CitaMedica> {
    return this.http.post<CitaMedica>(this.apiUrl, payload);
  }

  actualizarEstado(id: number, estado: string): Observable<CitaMedica> {
    return this.http.patch<CitaMedica>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}