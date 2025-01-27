import { Injectable } from "@angular/core";
import { ITarea } from "../interfaces/tarea";

Injectable({
  providedIn: 'root'
})

export class TareaStore {

  constructor() { }

  getTareas(): ITarea[] {
  const tareas = localStorage.getItem('tarea');
  
    if (!tareas) {
      return [];
    }

    try {
      return JSON.parse(tareas) as ITarea[];
    } catch (error) {
      console.error('Error al parsear las tareas del localStorage', error);
      return [];
    }
  }

  update(tareaActualizada: ITarea) {
    const tareas = this.getTareas();
    const tareasActualizadas = tareas.map(tarea => tarea.uid === tareaActualizada.uid ? tareaActualizada : tarea);
    this.guardarTareas(tareasActualizadas);
  }

  create(tarea: ITarea) {
    const uid = crypto.randomUUID();
    const tareas = this.getTareas();

    tarea.uid = uid;
    tareas.push(tarea);

    this.guardarTareas(tareas);
  }

  delete(uid: string) {
    const tareas = this.getTareas();
    const tareasActualizadas = tareas.filter(tarea => tarea.uid !== uid);
    this.guardarTareas(tareasActualizadas);
  }

  private guardarTareas(tareas: ITarea[]) {
    localStorage.setItem('tarea', JSON.stringify(tareas));
  }

}