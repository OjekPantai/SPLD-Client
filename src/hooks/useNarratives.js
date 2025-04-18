import { useCallback, useState } from "react";
import { useApi } from "./useApi";

/**
 * Custom hook for fetching and managing narratives
 */
export const useNarratives = () => {
  const [narratives, setNarratives] = useState([]);
  const [narrative, setNarrative] = useState(null);
  const { loading, error, get, post, put, del } = useApi();

  /**
   * Fetch all narratives
   */
  const fetchNarratives = async () => {
    try {
      const response = await get("/narratives");
      if (response.success) {
        setNarratives(response.data);
      }
      return response;
    } catch (err) {
      console.error("Error fetching narratives:", err);
      return { success: false, message: err.message };
    }
  };

  /**
   * Fetch a single narrative by ID
   * @param {number|string} id - The narrative ID
   */
  const fetchNarrativeById = useCallback(
    async (id) => {
      try {
        const response = await get(`/narratives/${id}`);
        if (response.success) {
          setNarrative(response.data);
        } else {
          setNarrative(null);
        }
        return response;
      } catch (err) {
        console.error(`Error fetching narrative ${id}:`, err);
        setNarrative(null);
        return { success: false, message: err.message };
      }
    },
    [get]
  );

  /**
   * Create a new narrative
   * @param {FormData} narrativeData - The narrative data as FormData
   */
  const createNarrative = async (narrativeData) => {
    try {
      // Log the FormData content for debugging
      console.log("FormData content:");
      for (let pair of narrativeData.entries()) {
        console.log(
          pair[0] +
            ": " +
            (pair[1] instanceof File ? `File: ${pair[1].name}` : pair[1])
        );
      }

      const response = await post("/narratives", narrativeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        await fetchNarratives();
      }
      return response;
    } catch (err) {
      console.error("Error creating narrative:", err);
      return { success: false, message: err.message };
    }
  };

  /**
   * Update an existing narrative
   * @param {number|string} id - The narrative ID
   * @param {Object} narrativeData - The updated narrative data
   */
  const updateNarrative = async (id, narrativeData) => {
    try {
      const response = await put(`/narratives/${id}`, narrativeData);
      if (response.success) {
        // Refresh narratives list after updating
        await fetchNarratives();
      }
      return response;
    } catch (err) {
      console.error(`Error updating narrative ${id}:`, err);
      return { success: false, message: err.message };
    }
  };

  /**
   * Delete a narrative
   * @param {number|string} id - The narrative ID
   */
  const deleteNarrative = async (id) => {
    try {
      const response = await del(`/narratives/${id}`);
      if (response.success) {
        // Refresh narratives list after deleting
        await fetchNarratives();
      }
      return response;
    } catch (err) {
      console.error(`Error deleting narrative ${id}:`, err);
      return { success: false, message: err.message };
    }
  };

  const publishNarrative = async (id) => {
    try {
      const response = await put(`/narratives/${id}/publish`);
      if (response.success) {
        await fetchNarratives();
      }
      return response;
    } catch (err) {
      console.error(`Error updating narrative ${id}:`, err);
      return { success: false, message: err.message };
    }
  };

  return {
    narratives,
    narrative,
    loading,
    error,
    fetchNarratives,
    fetchNarrativeById,
    publishNarrative,
    createNarrative,
    updateNarrative,
    deleteNarrative,
  };
};
