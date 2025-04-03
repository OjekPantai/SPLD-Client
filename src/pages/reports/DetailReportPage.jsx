import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FileText, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useReports } from "@/hooks/useReports";
import ContentViewer from "@/components/ui/content-viewer";
import DetailPageHeader from "@/components/ui/detail-page-header";

const DetailReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { report, loading, error, fetchReportById } = useReports();

  useEffect(() => {
    if (id) {
      fetchReportById(id);
    }
  }, [id, fetchReportById]);

  if (loading) {
    return (
      <div className="container mx-auto py-6 max-w-5xl space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-6 w-40" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-48" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full rounded-md" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-medium">Error Loading Report</h3>
          <p className="text-muted-foreground mb-4">
            {error.message ||
              "Failed to load report details. Please try again later."}
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/reports")}
            >
              Back to List
            </Button>
            <Button onClick={() => fetchReportById(id)}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto py-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">Report Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The report you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline" onClick={() => navigate("/admin/reports")}>
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/admin",
      as: Link,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      as: Link,
    },
    {
      label: "Detail",
    },
  ];

  return (
    <div className="py-6 max-w-full space-y-6">
      <DetailPageHeader breadcrumbs={breadcrumbs} />

      <ContentViewer
        data={report}
        type="report"
        onAddNarrative={() => navigate(`/admin/narratives/create/${id}`)}
        onSubmit={() => navigate(`/admin/reports/${id}/submit`)}
      />
    </div>
  );
};

export default DetailReportPage;
