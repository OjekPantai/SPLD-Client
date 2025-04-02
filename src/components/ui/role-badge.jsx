import React from "react";
import { Badge } from "@/components/ui/badge";

const ROLE_VARIANTS = {
  admin: "purple",
  polsek: "blue",
  humas: "green",
};

/**
 * Mendapatkan badge untuk role tertentu
 * @param {string} role - Role pengguna
 * @returns {JSX.Element} Badge component
 */
export const getRoleBadge = (role) => {
  const variant = ROLE_VARIANTS[role.toLowerCase()] || "gray";

  const label = role.charAt(0).toUpperCase() + role.slice(1);

  return <Badge variant={variant}>{label}</Badge>;
};
