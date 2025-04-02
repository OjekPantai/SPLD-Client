import { useState } from "react";
import { useApi } from "./useApi";

export const usePoliceSector = () => {
  const [policeSectors, setPoliceSectors] = useState([]);
  const [policeSector, setPoliceSector] = useState(null);
  const { loading, error, get } = useApi();

  /**
   * Fetch all narratives
   */
  const fetchPoliceSectors = async () => {
    try {
      const response = await get("/police-sector");
      if (response.success) {
        setPoliceSectors(response.data);
      }
      return response;
    } catch (err) {
      console.error("Error fetching police sector data:", err);
      return { success: false, message: err.message };
    }
  };

  const fetchPoliceSectorById = async (id) => {
    try {
      const response = await get(`/police-sector/${id}`);
      if (response.success) {
        return response.data;
      }
      setPoliceSector(response.data);
      return response;
    } catch (err) {
      console.error(`Error fetching police sector data by id ${id}:`, err);
      return { success: false, message: err.message };
    }
  };

  return {
    fetchPoliceSectorById,
    policeSectors,
    policeSector,
    loading,
    error,
    fetchPoliceSectors,
  };
};
