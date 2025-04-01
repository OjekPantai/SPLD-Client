import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  ImageIcon,
  Plus,
  ChevronDown,
  MapPin,
  Clock,
  Tag,
  Grid,
  List,
  ChevronRight,
  ExternalLink,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNarratives } from "@/hooks/useNarratives";
import { useNavigate } from "react-router-dom";

const NarrativesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const { narratives, loading, error, fetchNarratives } = useNarratives();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNarratives();
  }, []);

  const filteredNarratives = narratives.filter(
    (narrative) =>
      narrative.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      narrative.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (narrative.Report?.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (narrative.User?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const formatImagePath = (filePath) => {
    const formattedPath = filePath?.replace(/\\/g, "/");
    return `http://localhost:3000/${formattedPath}`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  const getInitials = (name) => {
    if (!name) return "AN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Navigate to narrative detail page
  const handleViewNarrative = (narrativeId) => {
    navigate(`/admin/narratives/${narrativeId}`);
  };

  // Truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border-2 border-dashed">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Tidak ada narasi ditemukan</h3>
      <p className="text-muted-foreground mb-4">
        Tidak ada narasi yang sesuai dengan pencarian Anda.
      </p>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Buat Narasi Baru
      </Button>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-medium">Error Loading Narratives</h3>
      <p className="text-muted-foreground">
        {error?.message || "Failed to load narratives. Please try again later."}
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

  // Loading skeletons based on view mode
  const LoadingSkeletons = () => (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-4"
      }
    >
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-0">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent className="pb-0 pt-4">
              <Skeleton className="h-24 w-full" />
              {viewMode === "grid" && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Skeleton className="h-20 w-full rounded-md" />
                  <Skeleton className="h-20 w-full rounded-md" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 pt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-full mt-2" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );

  // Grid view for narratives
  const GridView = ({ narratives }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {narratives.map((narrative) => (
        <Card
          key={narrative.id}
          className="overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1 text-lg">
                {narrative.title}
              </CardTitle>
              <Badge variant="outline" className="whitespace-nowrap">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(narrative.createdAt).split(",")[0]}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage
                  src={`/avatars/${narrative.User?.id || "default"}.png`}
                />
                <AvatarFallback>
                  {getInitials(narrative.User?.name)}
                </AvatarFallback>
              </Avatar>
              <span>{narrative.User?.name || "Anonim"}</span>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
              {narrative.content}
            </p>

            {narrative.Media?.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {narrative.Media.slice(0, 2).map((media) => (
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
                          <ImageIcon className="h-3 w-3" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle>{narrative.title} - Media</DialogTitle>
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
                {narrative.Media.length > 2 && (
                  <div className="relative aspect-video cursor-pointer rounded-md overflow-hidden border bg-muted/90 hover:bg-muted/70 transition-colors flex items-center justify-center">
                    <span className="text-lg font-medium">
                      +{narrative.Media.length - 2}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col w-full gap-2 pt-2 pb-4">
            <div className="flex items-center w-full">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                <FileText className="mr-1 h-3 w-3" />
                {truncateText(narrative.Report?.title || "No Report", 15)}
              </Badge>
              <Badge variant="outline" className="ml-auto">
                ID: {narrative.id}
              </Badge>
            </div>
            <Button
              className="w-full mt-2"
              variant="secondary"
              onClick={() => handleViewNarrative(narrative.id)}
            >
              Baca Selengkapnya
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  // List view for narratives
  const ListView = ({ narratives }) => (
    <div className="space-y-4">
      {narratives.map((narrative) => (
        <Card
          key={narrative.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {narrative.Media?.length > 0 && (
              <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden border-b md:border-b-0 md:border-r">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={
                        formatImagePath(narrative.Media[0].filePath) ||
                        "/placeholder.svg"
                      }
                      alt={`Media untuk ${narrative.title}`}
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => setSelectedImage(narrative.Media[0])}
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                      <DialogTitle>{narrative.title} - Media</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center">
                      <img
                        src={
                          formatImagePath(narrative.Media[0].filePath) ||
                          "/placeholder.svg"
                        }
                        alt={`Media untuk ${narrative.title}`}
                        className="max-h-[70vh] object-contain rounded-md"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                {narrative.Media.length > 1 && (
                  <Badge className="absolute bottom-2 right-2 bg-background/80">
                    +{narrative.Media.length - 1} foto
                  </Badge>
                )}
              </div>
            )}

            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">{narrative.title}</h3>
                <Badge variant="outline">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(narrative.createdAt)}
                </Badge>
              </div>

              <div className="flex items-center mb-3">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage
                    src={`/avatars/${narrative.User?.id || "default"}.png`}
                  />
                  <AvatarFallback>
                    {getInitials(narrative.User?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {narrative.User?.name || "Anonim"}
                </span>

                <div className="mx-2 h-4 border-r border-gray-200"></div>

                <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {truncateText(narrative.Report?.title || "No Report", 20)}
                </span>
              </div>

              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                {narrative.content}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {narrative.Media?.length || 0} Media
                </Badge>
                <Badge variant="outline">ID: {narrative.id}</Badge>
                <Button
                  className="ml-auto"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleViewNarrative(narrative.id)}
                >
                  Baca Selengkapnya
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Narratives</h2>
          <p className="text-muted-foreground">
            Daftar narasi yang telah dibuat berdasarkan laporan polsek.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-muted/40 rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari narasi, laporan, atau pengguna..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Semua Narasi</DropdownMenuItem>
              <DropdownMenuItem>Dibuat Hari Ini</DropdownMenuItem>
              <DropdownMenuItem>Dibuat Minggu Ini</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-initial">
            Semua Narasi
          </TabsTrigger>
          <TabsTrigger value="my" className="flex-1 sm:flex-initial">
            Narasi Saya
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <LoadingSkeletons />
          ) : filteredNarratives.length > 0 ? (
            viewMode === "grid" ? (
              <GridView narratives={filteredNarratives} />
            ) : (
              <ListView narratives={filteredNarratives} />
            )
          ) : (
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="my">
          <EmptyState />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NarrativesPage;
