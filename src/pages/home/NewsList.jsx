import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useNarratives } from "@/hooks/useNarratives";
import { formatDate, formatImagePath, truncateText } from "@/lib/utils";

const NewsList = () => {
  const { narratives, loading, error, fetchNarratives } = useNarratives();
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch data berita saat komponen dimount
  useEffect(() => {
    const loadNarratives = async () => {
      await fetchNarratives();
      setIsInitialized(true);
    };

    loadNarratives();
  }, []);

  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-6 md:py-8">
          {/* Header Skeleton */}
          <div className="mb-6 pb-2 border-b">
            <Skeleton className="h-8 w-48 mb-4" />
          </div>

          {/* Featured News Skeleton */}
          <div className="mb-8">
            <div className="overflow-hidden border-none shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <Skeleton className="aspect-video md:aspect-auto md:h-full" />
                <div className="p-5 md:p-6 lg:p-8 space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex justify-between items-center mt-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="overflow-hidden flex flex-col">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error && !narratives?.length) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto p-4 md:p-6">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20 text-center max-w-md">
              <h2 className="text-xl font-bold text-destructive mb-2">Error</h2>
              <p className="text-destructive/80">{error}</p>
              <Button
                variant="outline"
                className="mt-4 border-destructive/50 hover:bg-destructive/10"
                onClick={() => fetchNarratives()}
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-2 border-b">
          <h2 className="text-xl md:text-2xl font-bold">Berita Terbaru</h2>
        </div>

        {loading && isInitialized && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full aspect-video">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && (!narratives || narratives.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tidak ada berita</h3>
            <p className="text-muted-foreground max-w-md">
              Tidak ada berita yang tersedia saat ini. Silakan coba kembali
              nanti.
            </p>
          </div>
        ) : (
          <>
            {/* Featured News - First item with larger layout */}
            {narratives && narratives.length > 0 && (
              <div className="mb-8">
                <Card className="overflow-hidden border-none shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="relative aspect-video md:aspect-auto md:h-full">
                      {narratives[0].Media && narratives[0].Media.length > 0 ? (
                        <img
                          src={formatImagePath(narratives[0].Media[0].filePath)}
                          alt={narratives[0].title}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(narratives[0].createdAt)}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-3">
                          {narratives[0].title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
                          {truncateText(narratives[0].content, 250)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center text-sm">
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          <span>
                            {narratives[0].Report?.User?.name || "Admin"}
                          </span>
                        </div>
                        <Link to={`/news/${narratives[0].id}`}>
                          <Button>Baca Selengkapnya</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Regular News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {narratives &&
                narratives.slice(1).map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {item.Media && item.Media.length > 0 ? (
                        <img
                          src={formatImagePath(item.Media[0].filePath)}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Calendar className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center text-white text-xs">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-2 text-lg">
                        {item.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {truncateText(item.content, 150)}
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center pt-2 border-t border-border/60">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1.5" />
                        <span>{item.Report?.User?.name || "Admin"}</span>
                      </div>
                      <Link to={`/news/${item.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 text-primary hover:text-primary/90"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Baca
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            {/* Load More Button */}
            {narratives && narratives.length > 9 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline">Muat Lebih Banyak</Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default NewsList;
