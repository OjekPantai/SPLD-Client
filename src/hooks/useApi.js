import { useState, useCallback } from "react";
import api from "../lib/axios";

/**
 * Custom hook for making API requests
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make a GET request
   * @param {string} url - The endpoint URL
   * @param {Object} params - Query parameters
   * @returns {Promise} - The response data
   */
  const get = useCallback(async (url, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(url, { params });
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      setError(err);
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil data",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Make a POST request
   * @param {string} url - The endpoint URL
   * @param {Object|FormData} data - The data to send
   * @param {Object} config - Additional Axios config
   * @returns {Promise} - The response data
   */
  const post = useCallback(async (url, data = {}, config = {}) => {
    setLoading(true);
    setError(null);

    if (data instanceof FormData) {
      config = {
        ...config,
        headers: {
          ...(config.headers || {}),
        },
      };
    }

    try {
      const response = await api.post(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      setError(err);
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Terjadi kesalahan saat memproses permintaan",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Make a PUT request
   * @param {string} url - The endpoint URL
   * @param {Object} data - The data to send
   * @returns {Promise} - The response data
   */
  const put = useCallback(async (url, data = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      setError(err);
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui data",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Make a DELETE request
   * @param {string} url - The endpoint URL
   * @returns {Promise} - The response data
   */
  const del = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      setError(err);
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Terjadi kesalahan saat menghapus data",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};
