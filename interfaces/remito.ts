
export interface Remito {
    om      : string,
    codigo  : string,
    id      : string,
    cantidad: number,
}

export interface Iremito {
    number       : string,
    obra         : string,
    type         : boolean,
    date         : string,
    observaciones: string,
    elementos    : Array<Remito>,
    
}

