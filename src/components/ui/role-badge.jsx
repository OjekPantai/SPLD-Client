import React from "react";
import { Badge } from "@/components/ui/badge";

// Map sederhana untuk role -> variant
const ROLE_VARIANTS = {
  admin: "purple",
  polsek: "blue",
  humas: "green",
  operator: "yellow",
  superadmin: "red",
  // Tambahkan role lain sesuai kebutuhan
};

/**
 * Mendapatkan badge untuk role tertentu
 * @param {string} role - Role pengguna
 * @returns {JSX.Element} Badge component
 */
export const getRoleBadge = (role) => {
  // Gunakan variant yang sesuai atau fallback ke gray
  const variant = ROLE_VARIANTS[role.toLowerCase()] || "gray";

  // Format label (capitalize first letter)
  const label = role.charAt(0).toUpperCase() + role.slice(1);

  return <Badge variant={variant}>{label}</Badge>;
};
