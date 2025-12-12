import axios from "@/axios";
import { GetAllVoituresResponse } from "@/types/GetAllVoitures";

export const getALlVoitures = async (searchQuery?: string) => {
  const params = searchQuery ? { search: searchQuery } : {};
  const response = await axios.get<GetAllVoituresResponse>("/voitures", {
    params,
  });
  return response.data;
};
