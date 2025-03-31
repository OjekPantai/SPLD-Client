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
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Make a POST request
   * @param {string} url - The endpoint URL
   * @param {Object} data - The data to send
   * @returns {Promise} - The response data
   */
  const post = useCallback(async (url, data = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(url, data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
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
      return response;
    } catch (err) {
      setError(err);
      throw err;
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
      return response;
    } catch (err) {
      setError(err);
      throw err;
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
