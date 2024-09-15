import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export const fetchData = async (url: string, options = {}) => {
  try {
    const response = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw new Error("Não foi possível obter os dados");
  }
};
