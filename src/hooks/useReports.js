import { useState, useCallback } from "react";
import { useApi } from "./useApi";

/**
 * Custom hook for fetching and managing reports
 */
export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState(null);
  const { loading, error, get, post, put, del } = useApi();

  /**
   * Fetch all reports
   */
  const fetchReports = useCallback(async () => {
    try {
      const response = await get("/reports");
      if (response.success) {
        setReports(response.data);
      }
      return response;
    } catch (err) {
      console.error("Error fetching reports:", err);
      return { success: false, message: err.message };
    }
  }, [get]);

  /**
   * Fetch a single report by ID
   * @param {number|string} id - The report ID
   */
  const fetchReportById = useCallback(
    async (id) => {
      try {
        const response = await get(`/reports/${id}`);
        if (response.success) {
          setReport(response.data);
        }
        return response;
      } catch (err) {
        console.error(`Error fetching report ${id}:`, err);
        return { success: false, message: err.message };
      }
    },
    [get]
  );

  /**
   * Create a new report
   * @param {Object} reportData - The report data
   */
  const createReport = useCallback(
    async (reportData) => {
      try {
        const response = await post("/reports", reportData);
        if (response.success) {
          await fetchReports();
        }
        return response;
      } catch (err) {
        console.error("Error creating report:", err);
        return { success: false, message: err.message };
      }
    },
    [post, fetchReports]
  );

  /**
   * Update an existing report
   * @param {number|string} id - The report ID
   * @param {Object} reportData - The updated report data
   */
  const updateReport = useCallback(
    async (id, reportData) => {
      try {
        const response = await put(`/reports/${id}`, reportData);
        if (response.success) {
          // Refresh reports list after updating
          await fetchReports();
        }
        return response;
      } catch (err) {
        console.error(`Error updating report ${id}:`, err);
        return { success: false, message: err.message };
      }
    },
    [put, fetchReports]
  );

  /**
   * Delete a report
   * @param {number|string} id - The report ID
   */
  const deleteReport = useCallback(
    async (id) => {
      try {
        const response = await del(`/reports/${id}`);
        if (response.success) {
          // Refresh reports list after deleting
          await fetchReports();
        }
        return response;
      } catch (err) {
        console.error(`Error deleting report ${id}:`, err);
        return { success: false, message: err.message };
      }
    },
    [del, fetchReports]
  );

  return {
    reports,
    report,
    loading,
    error,
    fetchReports,
    fetchReportById,
    createReport,
    updateReport,
    deleteReport,
  };
};
