import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  ArrowLeft,
  Share2,
  Bookmark,
  Printer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatImagePath } from "@/lib/utils";
import { useNarratives } from "@/hooks/useNarratives";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { narrative, loading, error, fetchNarrativeById } = useNarratives();

  useEffect(() => {
    if (id) {
      fetchNarrativeById(parseInt(id, 10));
    }
  }, [id, fetchNarrativeById]);

  const formatContent = (content) => {
    if (!content) return [];
    return content
      .split("\r\n\r\n")
      .filter((paragraph) => paragraph.trim() !== "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 md:p-6">
          <Button
            variant="ghost"
            className="mb-4 flex items-center gap-1 text-muted-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-full">
              <Skeleton className="w-full h-64 md:h-96 rounded-lg mb-6" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex gap-2 mb-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !narrative) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 md:p-6 flex justify-center items-center min-h-[60vh]">
          <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20 text-center max-w-md">
            <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-destructive/80">
              {error || "Berita tidak ditemukan"}
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Kembali ke Beranda
              </Button>
              <Button onClick={() => fetchNarrativeById(parseInt(id, 10))}>
                Coba Lagi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = formatContent(narrative.content);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Beranda
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground line-clamp-1">
              {narrative.title}
            </span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-1 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Daftar Berita
        </Button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div>
            <Card className="overflow-hidden shadow-sm border-none mb-6">
              {/* Featured Image */}
              {narrative.Media && narrative.Media.length > 0 && (
                <div className="w-full aspect-video md:aspect-[21/9] relative overflow-hidden">
                  <img
                    src={formatImagePath(narrative.Media[0].filePath)}
                    alt={narrative.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                </div>
              )}

              <CardContent className="p-4 md:p-6 lg:p-8">
                {/* Article Title */}
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                    {narrative.title}
                  </h1>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(narrative.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      <span>{narrative.Report?.User?.name || "Admin"}</span>
                    </div>

                    {narrative.Report?.User?.PoliceSector && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{narrative.Report.User.PoliceSector.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8"
                    >
                      <Share2 className="h-3.5 w-3.5 mr-1.5" />
                      <span>Bagikan</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8"
                    >
                      <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                      <span>Simpan</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8"
                    >
                      <Printer className="h-3.5 w-3.5 mr-1.5" />
                      <span>Cetak</span>
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Article Content */}
                <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`mb-4 leading-relaxed ${
                        index === 0 ? "text-lg font-medium" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Article Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                disabled
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-1"
                disabled
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetailPage;
