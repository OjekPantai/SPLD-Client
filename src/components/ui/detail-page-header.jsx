import React from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Reusable page header component with back button and breadcrumbs
 *
 * @param {Object} props - Component props
 * @param {Function} props.onBack - Function to handle back button click
 * @param {Array} props.breadcrumbs - Array of breadcrumb items
 * @param {Object} props.backButtonProps - Additional props for back button
 * @param {string} props.backButtonLabel - Label for back button (default: "Kembali")
 * @param {ReactNode} props.children - Optional additional content
 */
const DetailPageHeader = ({ breadcrumbs = [], children }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="gap-1 rounded-full"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali
      </Button>

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink
                    as={item.as}
                    to={item.href}
                    href={item.href}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </div>
  );
};

export default DetailPageHeader;
