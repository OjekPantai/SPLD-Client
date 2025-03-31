import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNarratives } from "@/hooks/useNarratives";

const NarrativesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { narratives, loading, error, fetchNarratives } = useNarratives();

  useEffect(() => {
    fetchNarratives();
  }, []);

  const filteredNarratives = narratives.filter(
    (narrative) =>
      narrative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrative.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (narrative.Report?.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (narrative.User?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const formatImagePath = (filePath) => {
    const formattedPath = filePath.replace(/\\/g, "/");
    return `http://localhost:3000/${formattedPath}`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-medium">Error Loading Narratives</h3>
        <p className="text-muted-foreground">
          {error.message ||
            "Failed to load narratives. Please try again later."}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => fetchNarratives()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Narratives</h2>
          <p className="text-muted-foreground">
            Daftar narasi yang telah dibuat berdasarkan laporan polsek.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari narasi..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Semua Narasi</TabsTrigger>
          <TabsTrigger value="recent">Terbaru</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-0">
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardHeader>
                  <CardContent className="pb-0 pt-4">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </CardFooter>
                </Card>
              ))
          ) : filteredNarratives.length > 0 ? (
            filteredNarratives.map((narrative) => (
              <Card key={narrative.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{narrative.title}</CardTitle>
                    <Badge variant="outline">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(narrative.createdAt)}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="mr-1 h-4 w-4" />
                    <span className="mr-4">
                      Laporan: {narrative.Report?.title || "Tidak ada judul"}
                    </span>
                    <User className="mr-1 h-4 w-4" />
                    <span>Oleh: {narrative.User?.name || "Anonim"}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {narrative.content}
                  </p>
                  {narrative.Media?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                      {narrative.Media.map((media) => (
                        <Dialog key={media.id}>
                          <DialogTrigger asChild>
                            <div
                              className="relative aspect-video cursor-pointer rounded-md overflow-hidden border bg-muted hover:bg-muted/80 transition-colors"
                              onClick={() => setSelectedImage(media)}
                            >
                              <img
                                src={
                                  formatImagePath(media.filePath) ||
                                  "/placeholder.svg"
                                }
                                alt={`Media untuk ${narrative.title}`}
                                className="object-cover w-full h-full"
                              />
                              <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-md">
                                <ImageIcon className="h-4 w-4" />
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                              <DialogTitle>
                                {narrative.title} - Media
                              </DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center justify-center">
                              <img
                                src={
                                  formatImagePath(media.filePath) ||
                                  "/placeholder.svg"
                                }
                                alt={`Media untuk ${narrative.title}`}
                                className="max-h-[70vh] object-contain rounded-md"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {narrative.Media?.length || 0} Media
                  </Badge>
                  <Badge variant="outline" className="ml-auto">
                    ID: {narrative.id}
                  </Badge>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">
                Tidak ada narasi ditemukan
              </h3>
              <p className="text-muted-foreground">
                Tidak ada narasi yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {!loading &&
            filteredNarratives
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((narrative) => (
                <Card key={narrative.id} className="overflow-hidden">
                  {/* Konten card sama seperti di tab all */}
                </Card>
              ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NarrativesPage;
