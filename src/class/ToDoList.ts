import { Tarea } from "./Tarea";
import { ESTADO } from "../lib/constantes";
// import { fechaToString, comprobarFormatoAnio, comprobarFormatoMes, comprobarFormatoDia } from "../lib/funciones";

export class ToDoList {
    private tareas: Tarea[];

    constructor() {
        this.tareas = [];
    }

    getTareas(): Tarea[] { return this.tareas; }
    setTareas(tareas: Tarea[]): void { this.tareas = tareas; }
    getUnaTarea(id: string): Tarea { return this.tareas.find(t => t.getId() === id)!; }

    agregarTarea(tarea: Tarea): void {
        this.tareas[this.tareas.length] = tarea;
    }


    arrayFiltrarPorEstado(idEstado: number): Tarea[] {
        let arregloAuxiliar: Tarea[] = [];
        for (let tarea of this.tareas) {
            if (tarea.getEstado() === ESTADO[idEstado]) {
                arregloAuxiliar[arregloAuxiliar.length] = tarea;
            }
        }
        return arregloAuxiliar;
    }

    mostrarDetallesDeTarea(idTarea: string): void {
        const tarea = this.getUnaTarea(idTarea);
        console.log('--------------------------------------------------------------------');
        console.log('                         Detalles de la Tarea');
        console.log('--------------------------------------------------------------------');
        console.log(`\nTítulo: ${tarea.getTitulo()}`);
        console.log(`Descripción: ${tarea.getDescripcion()}`);
        console.log(`Prioridad: ${tarea.getPrioridad()}`);
        console.log(`Estado: ${tarea.getEstado()}`);
        console.log(`Fecha de Creación: ${tarea.getFechaCreacion().toLocaleDateString()}`);
        console.log(`Fecha de Vencimiento: ${tarea.getFechaVencimiento().toLocaleDateString()}`);
        console.log('\n--------------------------------------------------------------------\n');
    }

    eliminarTarea(id: string): boolean {
        const index = this.tareas.findIndex(t => t.getId() === id);
        if (index === -1) return false;
        this.tareas.splice(index, 1);
        return true;
    }

    ordenarPor(criterio: 'titulo' | 'fechaVencimiento' | 'fechaCreacion' | 'dificultad', asc: boolean = true): void {
        const factor = asc ? 1 : -1;
        this.tareas.sort((a, b) => {
            switch (criterio) {
                case 'titulo':
                    return factor * a.getTitulo().localeCompare(b.getTitulo(), undefined, { sensitivity: 'base' });
                case 'fechaVencimiento':
                    return factor * (a.getFechaVencimiento().getTime() - b.getFechaVencimiento().getTime());
                case 'fechaCreacion':
                    return factor * (a.getFechaCreacion().getTime() - b.getFechaCreacion().getTime());
                case 'dificultad':
                    return factor * (a.getDificultad() - b.getDificultad());
                default:
                    return 0;
            }
        });
    }
}
