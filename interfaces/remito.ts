
export interface Remito {
    om      : string,
    code    : string,
    id      : string,
    cantidad: number,
}

export interface Iremito {
    number       : string,
    obra         : string,
    date         : string,
    observaciones: string,
    elementos    : Array<Remito>,
    
}

