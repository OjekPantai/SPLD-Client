import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNarratives } from "@/hooks/useNarratives";
import ContentViewer from "@/components/ui/content-viewer";
import DetailPageHeader from "@/components/ui/detail-page-header";

const DetailNarrativePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { narrative, loading, error, fetchNarrativeById, publishNarrative } =
    useNarratives();

  useEffect(() => {
    if (id) {
      fetchNarrativeById(id);
    }
  }, [id, fetchNarrativeById]);

  const handlePublish = async (data) => {
    try {
      const response = await publishNarrative(id, data);
      if (response.success) {
        navigate(`/admin/narratives/${id}`);
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };

  if (loading) {
    return (
      <div className="py-6 space-y-6">
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
          <FileText className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-medium">Error Loading Narrative</h3>
          <p className="text-muted-foreground mb-4">
            {error.message ||
              "Failed to load narrative details. Please try again later."}
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/narratives")}
            >
              Back to List
            </Button>
            <Button onClick={() => fetchNarrativeById(id)}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!narrative) {
    return (
      <div className="container mx-auto py-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">Narrative Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The narrative you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/narratives")}
          >
            Back to Narratives
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
      label: "Narratives",
      href: "/admin/narratives",
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
        data={narrative}
        type="narrative"
        onSubmit={handlePublish}
      />
    </div>
  );
};

export default DetailNarrativePage;
