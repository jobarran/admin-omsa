

export interface element {
    quantity   : number;
    code       : string;
    description: string;
    received   : number;
    type       : string;
    modId      : number
}

export interface IOm {
    _id        : string;   
    idObra     : string;
    name       : string;
    revision   : string;
    floor      : string;
    sector     : string;
    description: string;
    status     : string;
    necesidad  : string;
    pedido     : string;
    element    :  Array<element>
}