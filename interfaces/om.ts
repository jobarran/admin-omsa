

export interface element {
    quantity   : number;
    code       : string;
    description: string;
    received   : number;
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
    element    :  Array<element>
}