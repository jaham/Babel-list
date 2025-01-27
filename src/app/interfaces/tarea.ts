
export interface ITarea { 
    uid: string;
    titulo: string;
    descripcion: string;
    fechaVencimiento: Date;
    estado: EstadoTarea;
}

export enum EstadoTarea {
  Pendiente = "pendiente",
  Completada = "completada",
  EnProgreso = "en progreso" 
}