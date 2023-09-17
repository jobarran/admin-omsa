

export interface IPersonal {
    _id        : string;   
    name       : string; 
    lastName   : string;
    legajo     : string;
    activo     : string; 
    obra       : string; 
    telefono?  : string; 
    direccion? : string; 
    nacimiento?: string; 
    categoria  : string; 
    alta       : string;
    tags       : string[];
    descripcion: string
}