import { useState, useCallback } from "react";
import { useApi } from "./useApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, error, get, post, put, del } = useApi();
  const navigate = useNavigate();

  const validateUserData = (data) => {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
      errors.push("Nama harus minimal 2 karakter");
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push("Email tidak valid");
    }

    if (!data.password || data.password.length < 6) {
      errors.push("Password harus minimal 6 karakter");
    }

    if (!["humas", "admin", "operator"].includes(data.role)) {
      errors.push("Role tidak valid");
    }

    if (!data.policeSectorId) {
      errors.push("Harus pilih sektor kepolisian");
    }

    return errors;
  };

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

  const fetchUser = useCallback(
    async (id) => {
      try {
        const response = await get(`/users/${id}`);
        return response;
      } catch (err) {
        console.error(`Error fetching user ${id}:`, err);
        return { success: false, message: err.message };
      }
    },
    [get]
  );

  const updateUser = useCallback(
    async (id, data) => {
      try {
        const response = await put(`/users/${id}`, data);
        return response;
      } catch (err) {
        return { success: false, message: err.message };
      }
    },
    [put]
  );
  const createUser = async (userData) => {
    try {
      // Validasi data
      const validationErrors = validateUserData(userData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      // Konversi policeSectorId ke number
      const payload = {
        ...userData,
        policeSectorId: Number(userData.policeSectorId),
      };

      await post("/users", payload);
      toast.success("User created successfully");
      navigate("/admin/users");
    } catch (err) {
      console.error("Error creating user:", {
        error: err,
        requestData: userData,
        response: err.response?.message,
      });
      return false;
    }
  };

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
    updateUser,
    fetchUser,
    deleteUser,
    createUser,
    loading,
    error: error?.message,
    get,
    post,
    put,
    del,
  };
};
