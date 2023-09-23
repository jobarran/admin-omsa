import bcrypt from 'bcryptjs'

interface SeedObra {
    name: string;
    idObra: string
}

interface SeedUser {
    name    : string;
    lastName: string;
    legajo  : string;
    email   : string;
    password: string;
    role    : 'admin'|'user';
    obra?   : string[];
}

interface SeedPersonal {
    name       : string; 
    lastName   : string;
    legajo     : string;
    estado     : string; 
    obra       : string; 
    telefono?  : string; 
    direccion? : string; 
    nacimiento?: string; 
    categoria  : string; 
    alta       : string;
    tags       : string[];
    descripcion:string
}

interface element {
    quantity   : number;
    code       : string;
    description: string;
    received   : number;
}

interface SeedOm {
    idObra     : string;
    name       : string;
    revision   : number;
    floor      : number;
    sector     : string;
    description: string;
    status     : string;
    element    :  Array<element>
}

interface SeedData {
    users: SeedUser[],
    obras: SeedObra[],
    personal: SeedPersonal[],
    om: SeedOm[],
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Joaquin',
            lastName: 'Barrandeguy',
            legajo: '123',
            email: 'jbarrandeguy@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Martina',
            lastName: 'De Luca',
            legajo: '555',
            email: 'toli@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'user',
            obra: ['1371', '1347'],
        },
    ],
    obras: [
        {
            name: 'Qiub',
            idObra: '1347'
        },
        {
            name: 'Campos Salles',
            idObra: '1371'
        },
        {
            name:'Lipa',
            idObra: '1372'
        },
        {
            name: 'Vilo',
            idObra: '1370'
        },
        {
            name: 'Platinum',
            idObra: '1375'
        },
    ],
    personal: [
        {
            name: 'Gregorio',
            lastName: 'Silva',
            legajo: '1212',
            obra: '1371',
            estado :  'activo',
            telefono : '11666666',
            direccion : 'Alvarez Condarco 123',
            nacimiento : '16/08/1988', 
            categoria : 'Capataz',
            alta : '01/01/2000',
            tags : ['Soldador', 'Herrero', 'Sellador', 'Terminaciones', 'Silleta'],
            descripcion: ''
        },
        {
            name: 'Elio',
            lastName: 'Silisque',
            legajo: '1234',
            obra: '1371',
            estado :  'activo',
            telefono : '11777777',
            direccion : 'Alvarez Condarco 123',
            nacimiento : '16/08/1988', 
            categoria : 'Capataz',
            alta : '01/01/2000',
            tags : ['Soldador', 'Herrero', 'Sellador', 'Terminaciones', 'Silleta'],
            descripcion: ''
        },
        {
            name: 'Omar',
            lastName: 'Michelli',
            legajo: '6541',
            obra: '1370',
            estado :  'activo',
            telefono : '11123456',
            direccion : 'Alvarez Condarco 123',
            nacimiento : '16/08/1988', 
            categoria : 'Capataz',
            alta : '01/01/2000',
            tags : ['Soldador', 'Herrero', 'Sellador', 'Terminaciones', 'Silleta'],
            descripcion: ''
        },
        {
            name: 'Julio',
            lastName: 'Cespedes',
            legajo: '5897',
            obra: '1370',
            estado :  'activo',
            telefono : '11123456',
            direccion : 'Alvarez Condarco 123',
            nacimiento : '16/08/1988', 
            categoria : 'Capataz',
            alta : '01/01/2000',
            tags : ['Soldador', 'Herrero', 'Sellador', 'Terminaciones', 'Silleta'],
            descripcion: ''
        },
        {
            name: 'Juan',
            lastName: 'Bogado',
            legajo: '4655',
            obra: '1371',
            estado :  'activo',
            telefono : '11123456',
            direccion : 'Alvarez Condarco 123',
            nacimiento : '16/08/1988', 
            categoria : 'Capataz',
            alta : '01/01/2000',
            tags : ['Soldador', 'Herrero', 'Sellador', 'Terminaciones', 'Silleta'],
            descripcion: ''
        },
    ],
    om : [
        {
            idObra     : '1371',
            name       : 'OM-1371-001',
            revision   : 0,
            floor      : 1,
            sector     : 'Torre',
            description: 'Colocación de pista de arranque en Piso 1',
            status     : '-',
            element    : [
                {
                    quantity   : 50,
                    code       : 'E01',
                    description: 'Pista de arranque',
                    received   : 0
                },
                {
                    quantity   : 50,
                    code       : 'A02',
                    description: 'Anclaje',
                    received   : 0
                },
                {
                    quantity   : 60,
                    code       : 'Bulon',
                    description: 'Bulon 3/8',
                    received   : 0
                },
                {
                    quantity   : 60,
                    code       : 'Bulon',
                    description: 'Bulon 1/2',
                    received   : 0
                },
            ]
        },
        {
            idObra     : '1371',
            name       : 'OM-1371-002',
            revision   : 1,
            floor      : 2,
            sector     : 'Torre',
            description: 'Colocación de anclajes en Piso 2',
            status     : '-',
            element    : [
                {
                    quantity   : 50,
                    code       : 'A01',
                    description: 'Anclaje tipico',
                    received   : 0
                },
                {
                    quantity   : 10,
                    code       : 'A02',
                    description: 'Anclaje esquinero',
                    received   : 0
                },
                {
                    quantity   : 60,
                    code       : 'Bulon',
                    description: 'Bulon 3/8',
                    received   : 0
                },
                {
                    quantity   : 60,
                    code       : 'Bulon',
                    description: 'Bulon 1/2',
                    received   : 0
                },
            ]
        },
        {
            idObra     : '1371',
            name       : 'OM-1371-003',
            revision   : 0,
            floor      : 1,
            sector     : 'Torre',
            description: 'Colocación de modulos en Piso 1',
            status     : '-',
            element    : [
                {
                    quantity   : 10,
                    code       : 'M001',
                    description: 'Modulo',
                    received   : 0
                },
                {
                    quantity   : 5,
                    code       : 'M002',
                    description: 'Modulo',
                    received   : 0
                },
                {
                    quantity   : 10,
                    code       : 'P01',
                    description: 'Splice',
                    received   : 0
                },
            ]
        }
    ]
}