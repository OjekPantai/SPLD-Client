import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Calendar,
  User,
  FileText,
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
  AlertCircle,
  PlusCircle,
  PenToolIcon,
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
import { useReports } from "@/hooks/useReports";
import { getStatusBadge } from "@/components/ui/status-badge";

const DetailReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const { report, loading, error, fetchReportById } = useReports();

  useEffect(() => {
    if (id) {
      fetchReportById(id);
    }
  }, [id, fetchReportById]);

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

  return (
    <div className="py-6 max-w-full space-y-6">
      <div className="space-y-2">
        <Button
          variant="outline"
          className="gap-1 rounded-full"
          onClick={() => navigate("/admin/reports")}
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali
        </Button>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/admin">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/admin/reports">
                Reports
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
                    {getStatusBadge(report.status)}
                  </div>
                  <CardTitle className="text-2xl">{report.title}</CardTitle>
                </div>
                {report.status === "submitted" && (
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/narratives/create/${report.id}`}>
                      <Button variant="outline" size="sm">
                        <PenToolIcon className="mr-1 h-4 w-4" />
                        Tambah Narasi
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{formatDate(report.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  <span>Dibuat oleh: {report.User?.name || "Anonim"}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-1 h-4 w-4" />
                  <span>Polsek: {report.User?.policeSectorId || "-"}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none mb-6">
                <p className="whitespace-pre-wrap text-primary">
                  {report.content}
                </p>
              </div>

              {report.Media && report.Media.length > 0 && (
                <>
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Media Terlampir ({report.Media.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {report.Media.map((media, index) => (
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
          </Card>
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
                  <AvatarImage src={report.User?.avatar} />
                  <AvatarFallback>
                    {getInitials(report.User?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{report.User?.name || "Anonim"}</p>
                  <p className="text-sm text-muted-foreground">
                    {report.User?.role || "Pengguna"}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Lihat Profil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailReportPage;
