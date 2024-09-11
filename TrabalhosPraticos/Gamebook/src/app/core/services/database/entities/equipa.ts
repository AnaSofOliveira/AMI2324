export interface Equipa {
  nome: string;
  imagem: string;
  treinador: string;
  presidente: string;
  estadio: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  jogadores: Array<{
    nome: string;
    posicao: string;
    imagem: string;
  }>;
}
