// src/models/expediente.model.ts

export interface Expediente {
    id: number;
    codigo: string;
    descripcion: string;
    estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
    justificacion?: string;
    tecnico_id: number;
    aprobador_id?: number;
    fecha_creacion: Date;
    fecha_estado?: Date;
    activo: boolean;
}