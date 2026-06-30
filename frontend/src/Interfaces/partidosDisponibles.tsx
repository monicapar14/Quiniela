export interface PartidosObtenidos {
  id: number;
  grup_nom: string;
  equipo_local: string;
  equipo_visitante: string;
  precio: number;
  fecha: Date;
  goles_local: number | null;
  goles_visitante: number | null;
  ganador: string | null;
  fase_id: number;
  fase_nom: string;
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