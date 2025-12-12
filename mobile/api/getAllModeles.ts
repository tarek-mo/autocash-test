import axios from "@/axios";
import { GetAllModelesResponse } from "@/types/Modele";

export const getAllModeles = async (marqueId: string) => {
  const response = await axios.get<GetAllModelesResponse>("/modeles", {
    params: { marqueId },
  });
  return response.data;
};
