import HeaderPage from "@/components/common/header-page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePoliceSector } from "@/hooks/usePoliceSector";
import { Edit, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditPoliceSectorModal } from "./EditPoliceSectorModal";
import { DeletePoliceSectorAlert } from "./DeletePoliceSectorAlert";
import { CreatePoliceSectorModal } from "./CreatePoliceSectorModal";

const PoliceSectorPage = () => {
  const { fetchPoliceSectors, loading, error, policeSectors } =
    usePoliceSector();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPoliceSector, setSelectedPoliceSector] = useState(null);

  useEffect(() => {
    fetchPoliceSectors();
  }, [fetchPoliceSectors]);

  const handleEdit = (policeSector) => {
    setSelectedPoliceSector(policeSector);
    setIsEditModalOpen(true);
  };

  const handleDelete = (policeSector) => {
    setSelectedPoliceSector(policeSector);
    setIsDeleteModalOpen(true);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchPoliceSectors();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedPoliceSector(null);
    fetchPoliceSectors();
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    setSelectedPoliceSector(null);
    fetchPoliceSectors();
  };

  const ErrorMessage = () => {
    return (
      <div className="flex items-center justify-center h-40 w-full">
        <div className="text-center space-y-2">
          <Badge variant="destructive" className="mb-2">
            Error
          </Badge>
          <p className="text-red-500 font-medium">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPoliceSectors()}
            className="mt-2"
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  };

  const LoadingSkeleton = () => {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b"
              >
                <Skeleton className="h-5 w-[60px]" />
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="space-y-6 mx-auto flex flex-col">
      <HeaderPage
        titlePage="Polsek data management"
        descriptionPage="Kelola data polsek"
        buttonProps={{
          label: "Tambah polsek",
          icon: PlusCircle,
          variant: "outline",
          onClick: () => setIsAddModalOpen(true),
        }}
      />

      <Card className="p-6">
        <CardContent className="p-0">
          {policeSectors && policeSectors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="w-[100px] font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Nama Polsek</TableHead>
                  <TableHead className="text-right w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policeSectors.map((policeSector) => (
                  <TableRow
                    key={policeSector.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="bg-primary/10">
                        {policeSector.id}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {policeSector.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleEdit(policeSector)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => handleDelete(policeSector)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <PlusCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Tidak ada data</h3>
              <p className="text-muted-foreground mb-4">
                Belum ada data polsek yang tersedia.
              </p>
              <Button variant="outline" onClick={() => setIsAddModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Polsek
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CreatePoliceSectorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {selectedPoliceSector && (
        <>
          <EditPoliceSectorModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPoliceSector(null);
            }}
            onSuccess={handleEditSuccess}
            policeSector={selectedPoliceSector}
          />

          <DeletePoliceSectorAlert
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedPoliceSector(null);
            }}
            onSuccess={handleDeleteSuccess}
            policeSector={selectedPoliceSector}
          />
        </>
      )}
    </div>
  );
};

export default PoliceSectorPage;
