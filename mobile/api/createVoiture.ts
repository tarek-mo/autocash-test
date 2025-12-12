import axios from "@/axios";

export interface CreateVoitureData {
  prix: number;
  marqueId: string;
  modeleId: string;
  anneeMiseCirculation: number;
  moisMiseCirculation: number;
  kilometrage: number;
  villeId: string;
  vendeur: {
    type: string;
    nom: string;
    tel: string;
    email: string;
    adresse: string;
    villeId: string;
  };
}

export const createVoiture = async (data: CreateVoitureData, photo: any) => {
  const formData = new FormData();

  formData.append("voitureData", {
    string: JSON.stringify(data),
    type: "application/json",
  } as any);

  if (photo) {
    formData.append("photo", {
      uri: photo.uri,
      type: photo.mimeType || photo.type || "image/jpeg",
      name: photo.fileName || "photo.jpg",
    } as any);
  }

  const response = await axios.post("/voitures", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
