export interface CitaMedica {
    id: number;
    codigoCita: string;
    pacienteId: number;
    doctorId: number;
    nivelPrioridad: string;
    motivoConsulta: string;
    estado: string;
    montoConsulta: number;
    fechaCita: string;
    paciente?: Paciente;
    doctor?: Doctor;
}

export interface Doctor {
    id: number;
    nombre: string;
    especialidad: string;
    disponible: boolean;
}

export interface Paciente {
    id: number;
    identificacion: string;
    nombre: string;
    correo: string;
    telefono: string;
}

export interface CrearCitaPayload {
    pacienteId: number;
    doctorId: number;
    nivelPrioridad: string;
    motivoConsulta: string;
    montoConsulta: number;
    fechaCita: string;
}