import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  FileText,
  ChevronDown,
  Grid,
  List,
  Plus,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useReports } from "@/hooks/useReports";
import HeaderPage from "@/components/common/header-page";
import GridViewCard from "@/components/ui/grid-view-card";
import ListViewCard from "@/components/ui/list-view-card";

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

  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      <HeaderPage
        titlePage="Laporan"
        descriptionPage="Daftar laporan yang tersedia"
        buttonProps={{
          label: "Tambah Laporan",
          icon: PlusCircle,
          variant: "outline",
          onClick: () => navigate("/admin/reports/create"),
        }}
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
            <GridViewCard
              items={filteredReports}
              onDetailClick={handleViewReport}
            />
          ) : (
            <ListViewCard
              items={filteredReports}
              handleViewitem={handleViewReport}
            />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
