export enum VendeurType {
  INDIVIDUAL = "INDIVIDUAL",
  PROFESSIONAL = "PROFESSIONAL",
  DEALER = "DEALER",
}

export type Vendeur = {
  id: string;
  type: VendeurType;
  nom: string;
  tel: string;
  email: string;
  adresse: string;
};
