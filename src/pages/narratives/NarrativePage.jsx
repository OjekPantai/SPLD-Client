import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  FileText,
  ChevronDown,
  Grid,
  List,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNarratives } from "@/hooks/useNarratives";
import { useNavigate } from "react-router-dom";
import HeaderPage from "@/components/common/header-page";

import GridViewCard from "@/components/ui/grid-view-card";
import ListViewCard from "@/components/ui/list-view-card";

const NarrativesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  // Navigate to narrative detail page
  const handleViewNarrative = (narrativeId) => {
    navigate(`/admin/narratives/${narrativeId}`);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border-2 border-dashed">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Tidak ada narasi ditemukan</h3>
      <p className="text-muted-foreground mb-4">
        Tidak ada narasi yang sesuai dengan pencarian Anda.
      </p>
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

  if (error) return <ErrorState />;

  return (
    <div className="space-y-6">
      <HeaderPage titlePage="Narasi Redaksi" descriptionPage="Daftar narasi" />

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
      <div>
        {loading ? (
          <LoadingSkeletons />
        ) : filteredNarratives.length > 0 ? (
          viewMode === "grid" ? (
            <GridViewCard
              items={filteredNarratives}
              onDetailClick={handleViewNarrative}
            />
          ) : (
            <ListViewCard
              items={filteredNarratives}
              handleViewitem={handleViewNarrative}
            />
          )
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default NarrativesPage;
