import { useCallback, useState } from "react";
import { useApi } from "./useApi";

export const usePoliceSector = () => {
  const [policeSectors, setPoliceSectors] = useState([]);
  const [policeSector, setPoliceSector] = useState(null);
  const { loading, error, get, post, put, del } = useApi();

  /**
   * Fetch all police sectors
   */
  const fetchPoliceSectors = useCallback(async () => {
    const response = await get("/police-sector");
    if (response.success) {
      setPoliceSectors(response.data);
    }
    return response;
  }, [get]);

  /**
   * Fetch police sector by ID
   */
  const fetchPoliceSectorById = useCallback(
    async (id) => {
      const response = await get(`/police-sector/${id}`);
      if (response.success) {
        setPoliceSector(response.data);
      }
      return response;
    },
    [get]
  );

  /**
   * Create new police sector
   */
  const createPoliceSector = useCallback(
    async (data) => {
      const response = await post("/police-sector", data);

      // If the response contains data but not explicitly marked as success,
      // treat it as a success and standardize the response format
      if (!response.success && response.data && response.data.id) {
        response.success = true;
      }

      if (response.success) {
        await fetchPoliceSectors();
      }

      return response;
    },
    [post, fetchPoliceSectors]
  );

  /**
   * Update police sector
   */
  const updatePoliceSector = useCallback(
    async (data) => {
      const response = await put(`/police-sector/${data.id}`, data);
      if (response.success) {
        await fetchPoliceSectors();
      }
      return response;
    },
    [put, fetchPoliceSectors]
  );

  /**
   * Delete police sector
   */
  const deletePoliceSector = useCallback(
    async (id) => {
      const response = await del(`/police-sector/${id}`);
      if (response.success) {
        await fetchPoliceSectors();
      }
      return response;
    },
    [del, fetchPoliceSectors]
  );

  return {
    policeSectors,
    policeSector,
    loading,
    error,
    fetchPoliceSectors,
    fetchPoliceSectorById,
    createPoliceSector,
    updatePoliceSector,
    deletePoliceSector,
  };
};
