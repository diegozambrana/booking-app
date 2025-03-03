import { useEffect, useState } from "react";
import { Technician } from "../types/technician";
import { api } from "../utils/api";

export const useTechnicians = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const fetchTechinicians = async () => {
    api.get("/technicians").then((response) => {
      setTechnicians(response.data);
    });
  };

  const createTechnician = async (data: {
    name: string;
    profession: string;
  }) => {
    return api.post("/technicians", data);
  };

  useEffect(() => {
    fetchTechinicians();
  }, []);

  return { technicians, createTechnician };
};
