import axios from "@/axios";
import { Ville } from "@/types/GetAllVoitures";

export type GetAllVillesResponse = Ville[];

export const getAllVilles = async () => {
  const response = await axios.get<GetAllVillesResponse>("/villes");
  return response.data;
};
