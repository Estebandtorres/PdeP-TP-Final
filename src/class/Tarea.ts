import { PRIORIDAD, ESTADO } from "../lib/constantes";
import { fechaToString } from "../lib/funciones";
import { v4 as uuidv4 } from 'uuid';

export class Tarea {
    private _id: string = '';
    private _titulo: string;
    private _descripcion: string;
    private _prioridad: string;
    private _estado: string;
    private _fechaCreacion: Date;
    private _fechaVencimiento: Date;
    private _fechaUltimaEdicion: Date;
    private _dificultad: number;

    // ----------------------------------------- Constructor -----------------------------------------

    constructor(_titulo: string, _descripcion: string, _prioridad: typeof PRIORIDAD[number], _estado: typeof ESTADO[number], _fechaCreacion: Date | null, _fechaVencimiento: Date, _fechaUltimaEdicion: Date | null, id?: string, dificultad?: number) {
        let day: Date = new Date();
        this._titulo = _titulo;
        this._descripcion = _descripcion;
        this._prioridad = _prioridad;
        this._estado = _estado;

        // Assign a unique id: use provided id (when loading from file) or generate a new UUID
        if (id && id.trim() !== '') {
            this._id = id;
        } else {
            this._id = uuidv4();
        }

        if (_fechaCreacion === null) {
            this._fechaCreacion = new Date(fechaToString(day.getFullYear().toString(), (day.getMonth() + 1).toString(), day.getDate().toString()) + "T03:00:00Z");
        } else {
            this._fechaCreacion = new Date(_fechaCreacion);
        }
        
        this._fechaVencimiento = _fechaVencimiento;

        if (_fechaUltimaEdicion === null) {
            this._fechaUltimaEdicion = new Date(fechaToString(day.getFullYear().toString(), (day.getMonth() + 1).toString(), day.getDate().toString()) + "T03:00:00Z");
        } else {
            this._fechaUltimaEdicion = new Date(_fechaUltimaEdicion);
        }
        // Dificultad: valor numérico (por ejemplo 1-5). Si no se provee, usar 3 por defecto.
        if (typeof dificultad === 'number' && !isNaN(dificultad)) {
            this._dificultad = dificultad;
        } else {
            this._dificultad = 3;
        }
        
    }


    // ----------------------------------------- Setters -----------------------------------------

    setId(id: string): void { this._id = id; }
    setTitulo(titulo: string): void { this._titulo = titulo; }
    setDescripcion(descripcion: string): void { this._descripcion = descripcion; }
    setPrioridad(prioridad: typeof PRIORIDAD[number]): void { this._prioridad = prioridad; }
    setEstado(estado: typeof ESTADO[number]): void { this._estado = estado; }
    setFechaVencimiento(fechaVencimiento: Date): void { this._fechaVencimiento = fechaVencimiento; }
    setFechaUltimaEdicion(fechaUltimaEdicion: Date): void { this._fechaUltimaEdicion = fechaUltimaEdicion }
    setDificultad(dificultad: number): void { this._dificultad = dificultad; }

    // ----------------------------------------- Getters -----------------------------------------

    getId(): string { return this._id; }
    getTitulo(): string { return this._titulo; }
    getDescripcion(): string { return this._descripcion; }
    getPrioridad(): typeof PRIORIDAD[number] { return this._prioridad; }
    getEstado(): typeof ESTADO[number] { return this._estado; }
    getFechaCreacion(): Date { return this._fechaCreacion; }
    getFechaVencimiento(): Date { return this._fechaVencimiento; }
    getFechaUltimaEdicion(): Date { return this._fechaUltimaEdicion; }
    getDificultad(): number { return this._dificultad; }

}

