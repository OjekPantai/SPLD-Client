import { useState } from "react";
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
  const fetchReports = async () => {
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
  };

  /**
   * Fetch a single report by ID
   * @param {number|string} id - The report ID
   */
  const fetchReportById = async (id) => {
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
  };

  /**
   * Create a new report
   * @param {Object} reportData - The report data
   */
  const createReport = async (reportData) => {
    try {
      const response = await post("/reports", reportData);
      if (response.success) {
        // Refresh reports list after creating
        await fetchReports();
      }
      return response;
    } catch (err) {
      console.error("Error creating report:", err);
      return { success: false, message: err.message };
    }
  };

  /**
   * Update an existing report
   * @param {number|string} id - The report ID
   * @param {Object} reportData - The updated report data
   */
  const updateReport = async (id, reportData) => {
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
  };

  /**
   * Delete a report
   * @param {number|string} id - The report ID
   */
  const deleteReport = async (id) => {
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
  };

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
