import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Search,
  Filter,
  FileText,
  ImageIcon,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Plus,
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useReports } from "@/hooks/useReports";
import HeaderPage from "@/components/common/header-page";

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { reports, loading, error, fetchReports } = useReports();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border-2 border-dashed">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Tidak ada laporan ditemukan</h3>
      <p className="text-muted-foreground mb-4">
        Tidak ada laporan yang sesuai dengan pencarian Anda.
      </p>
      <Button onClick={() => navigate("/admin/reports/create")}>
        <Plus className="mr-2 h-4 w-4" /> Buat Laporan Baru
      </Button>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-medium">Error Loading Reports</h3>
      <p className="text-muted-foreground">
        {error?.message || "Failed to load narratives. Please try again later."}
      </p>
      <Button variant="outline" className="mt-4" onClick={() => fetchReports()}>
        Try Again
      </Button>
    </div>
  );

  const filteredReports = reports.filter(
    (report) =>
      report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.User?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusBadge = (status) => {
    const statusColors = {
      submitted: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      processed: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={`${statusColors[status]} capitalize`}>{status}</Badge>
    );
  };

  const handleViewReport = (reportId) => {
    navigate(`/admin/reports/${reportId}`);
  };

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
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );

  // Grid View Component
  const ReportsGridView = ({ reports }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((report) => (
        <Card key={report.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/avatars/${report.User?.id}.png`} />
                <AvatarFallback>
                  {report.User?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{report.User?.name}</span>
            </div>
          </CardHeader>

          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">
              {report.content}
            </p>
            {report.Media?.length > 0 && (
              <img
                src={formatImagePath(report.Media[0].filePath)}
                alt="Report media"
                className="mt-4 rounded-md object-cover h-40 w-full"
              />
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {getStatusBadge(report.status)}
            <Button
              variant="secondary"
              onClick={() => handleViewReport(report.id)}
            >
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  // List View Component
  const ReportsListView = ({ reports }) => (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            {report.Media?.length > 0 && (
              <div className="md:w-48 border-r">
                <img
                  src={formatImagePath(report.Media[0].filePath)}
                  alt="Report media"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(report.status)}
                    <Badge variant="outline">
                      {formatDate(report.createdAt)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => handleViewReport(report.id)}
                >
                  View
                </Button>
              </div>
              <p className="mt-4 text-muted-foreground line-clamp-2">
                {report.content}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      <HeaderPage
        titlePage="Laporan"
        descriptionPage="Daftar laporan yang telah dibuat oleh polsek."
      />

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/40 rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari laporan..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem>Submitted</DropdownMenuItem>
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

      <div>
        {loading ? (
          <LoadingSkeletons />
        ) : filteredReports.length > 0 ? (
          viewMode === "grid" ? (
            <ReportsGridView reports={filteredReports} />
          ) : (
            <ReportsListView reports={filteredReports} />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
