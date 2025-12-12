import { Vendeur } from "./Vendeur";

export type Voiture = {
  id: string;
  prix: number;
  marque: Marque;
  modele: Modele;
  vendeur: Vendeur;
  ville: Ville;
  anneeMiseCirculation: number;
  moisMiseCirculation: number;
  kilometrage: number;
  ref: string;
  type: VoitureType;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllVoituresResponse = Voiture[];

export enum VoitureType {
  PUBLISHED = "PUBLISHED",
  EXPERTIZED = "EXPERTIZED",
}

type Marque = {
  id: string;
  nom: string;
  slug: string;
};

type Modele = {
  id: string;
  nom: string;
  slug: string;
};

export interface Ville {
  id: string;
  slug: string;
  name: string;
}
