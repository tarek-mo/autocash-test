import axios from "@/axios";
import { GetAllMarquesResponse } from "@/types/Marque";

export const getAllMarques = async () => {
  const response = await axios.get<GetAllMarquesResponse>("/marques");
  return response.data;
};
