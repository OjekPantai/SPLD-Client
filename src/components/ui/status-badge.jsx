import React from "react";
import { Badge } from "@/components/ui/badge";

const STATUS_VARIANTS = {
  draft: "yellow",
  submitted: "green",
  published: "purple",
};

/**
 * Mendapatkan badge untuk status tertentu
 * @param {string} status - Status
 * @returns {JSX.Element} Badge component
 */
export const getStatusBadge = (status) => {
  const variant = STATUS_VARIANTS[status.toLowerCase()] || "gray";

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <Badge variant={variant}>{label}</Badge>;
};
