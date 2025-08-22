// src/models/indicio.model.ts

export interface Indicio {
    id: number;
    expediente_id: number;
    peso?: number;
    color?: string;
    tamano?: string;
    descripcion: string;
    activo: boolean;
}