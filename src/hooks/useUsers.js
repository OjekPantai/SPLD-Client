import { useState, useCallback } from "react";
import { useApi } from "./useApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, error, get, post, put, del } = useApi();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await get("/users");
      if (response.success) {
        setUsers(response.data);
      }
      return response;
    } catch (err) {
      console.error("Error fetching users:", err);
      return { success: false, message: err.message };
    }
  }, [get]);

  const deleteUser = useCallback(
    async (id) => {
      try {
        const response = await del(`/users/${id}`);
        if (response.success) {
          await fetchUsers();
        }
        return response;
      } catch (err) {
        console.error(`Error deleting user ${id}:`, err);
        return { success: false, message: err.message };
      }
    },
    [del, fetchUsers]
  );

  return {
    users,
    setUsers,
    fetchUsers,
    deleteUser,
    loading,
    error,
    get,
    post,
    put,
    del,
  };
};
