import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Calendar,
  User,
  FileText,
  MapPin,
  Clock,
  ChevronLeft,
  Share2,
  Download,
  Printer,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  Eye,
  ArrowLeft,
  ExternalLink,
  Image as ImageIcon,
  Info,
  PenTool,
  Shield,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNarratives } from "@/hooks/useNarratives";

const DetailNarrativePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const { narrative, loading, error, fetchNarrativeById } = useNarratives();

  useEffect(() => {
    if (id) {
      fetchNarrativeById(id);
    }
  }, [id, fetchNarrativeById]);

  const formatImagePath = (filePath) => {
    if (!filePath) return "/placeholder.svg";
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

  const getInitials = (name) => {
    if (!name) return "AN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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

  return (
    <div className="container mx-auto py-6 max-w-full space-y-6">
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => navigate("/admin/narratives")}
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Daftar Narasi
        </Button>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/admin/narratives">
                Narratives
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Detail</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      ID: {narrative.id}
                    </Badge>
                    <Badge variant="secondary">
                      <Eye className="mr-1 h-3 w-3" />
                      25 views
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{narrative.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Word Document
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(narrative.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="mr-1 h-4 w-4" />
                  <span>
                    Laporan: {narrative.Report?.title || "Tidak ada judul"}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  <span>Dibuat oleh: {narrative.User?.name || "Anonim"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>Lokasi: Kec. Srumbung, Kab. Magelang</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none mb-6">
                <p className="whitespace-pre-wrap text-primary">
                  {narrative.content}
                </p>
              </div>

              {narrative.Media && narrative.Media.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Media Terlampir ({narrative.Media.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {narrative.Media.map((media, index) => (
                      <Dialog key={media.id}>
                        <DialogTrigger asChild>
                          <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                            <img
                              alt={`Media ${index + 1}`}
                              className="object-cover w-full h-full hover:opacity-80 transition-opacity"
                              src={formatImagePath(media.filePath)}
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0">
                          <img
                            alt={`Media ${index + 1} Full`}
                            className="w-full h-full object-contain"
                            src={formatImagePath(media.filePath)}
                          />
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex items-center gap-4 pt-6 border-t">
              <Button variant="ghost" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Simpan
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Sukai (0)
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Komentar (0)
              </Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="diskusi" className="lg:col-span-3">
            <TabsList>
              <TabsTrigger value="diskusi">Diskusi (0)</TabsTrigger>
              <TabsTrigger value="info">Informasi Lain</TabsTrigger>
            </TabsList>
            <TabsContent value="diskusi">
              <div className="text-muted-foreground text-sm py-4">
                Belum ada komentar. Jadilah yang pertama berkomentar!
              </div>
            </TabsContent>
            <TabsContent value="info">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Status Perlindungan</p>
                    <p className="text-sm text-muted-foreground">
                      Publik (Dapat diakses oleh semua orang)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <PenTool className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Lisensi</p>
                    <p className="text-sm text-muted-foreground">
                      Creative Commons BY-SA 4.0
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Versi</p>
                    <p className="text-sm text-muted-foreground">
                      1.0.0 - Dibuat pada 12 Mei 2024
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Penulis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={narrative.User?.avatar} />
                  <AvatarFallback>
                    {getInitials(narrative.User?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {narrative.User?.name || "Anonim"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {narrative.User?.role || "Pengguna"}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Lihat Profil
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dokumen Terkait
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {narrative.Report ? (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {narrative.Report.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Laporan terkait
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tidak ada dokumen terkait
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailNarrativePage;
