export interface ParticipantesObtenidos {
  id_p: number;
  nombre: string;
  puntos_totales: number;
}

export interface Ranking {
  id: number;
  nombre: string;
  puntos_totales: number;
  exactos_totales: number;
}

export interface ObtenidosSeleccionados {
  id_servicio: number,
  nombre: string;
  precio: number;
}

export interface ServiciosSeleccionados {
  id_servicio: number;
  nombre: string;
  precio: number;
}