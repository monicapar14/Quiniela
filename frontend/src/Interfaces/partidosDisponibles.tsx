export interface PartidosObtenidos {
  grup_nom: string;
  equipo_local: string;
  equipo_visitante: string;
  precio: number;
  fecha: Date;
  goles_local: number;
  goles_visitante: number;
}

export interface DescuentosDisponibles {
  campoC: number;
  campoP: number;
  descuento: number;
}

export interface ObtenidosSeleccionados {
  id_producto: number,
  nombre: string;
  precio: number;
}

export interface ProductosSeleccionados {
  id_producto: number;
  nombre: string;
  precio: number;
}