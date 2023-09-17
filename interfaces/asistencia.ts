
export interface Asistencia {
    legajo  : string,
    obra    : string,
    name    : string,
    lastName: string,
    ingreso : string,
    salida  : string,
    tarea   : string,
    estado  : string,
}

export interface IAsistencia {
    _id          : string,
    fecha        : string,
    clima        : string,
    montaje      : string,
    observaciones: string,
    asistencia   : Array<Asistencia>,
    
}

