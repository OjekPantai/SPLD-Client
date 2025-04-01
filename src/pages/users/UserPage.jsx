import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  MoreHorizontal,
  Search,
  PlusCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import HeaderPage from "@/components/common/header-page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getRoleBadge } from "@/components/ui/role-badge";
import { formatDate } from "@/lib/utils";
import { useUsers } from "@/hooks/useUsers";

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingUserId, setDeletingUserId] = useState(null);
  const { users, loading, error, fetchUsers, deleteUser } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.PoliceSector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (userId) => {
    console.log(`Edit user dengan ID: ${userId}`);
  };

  const LoadingSkeletons = () => {
    return (
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </TableCell>
            <TableCell className="hidden xl:table-cell">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                <div className="hidden md:flex space-x-2">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex md:hidden">
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <div className="space-y-6">
      <HeaderPage titlePage="Users" descriptionPage="Kelola data pengguna" />

      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-muted/40 rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama pengguna..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full md:w-auto" size="sm">
          <PlusCircle className=" h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>

      <Card className="w-full">
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Sektor</TableHead>
                  <TableHead className="hidden xl:table-cell">Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <LoadingSkeletons />
              ) : (
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.PoliceSector.name}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {formatDate(user.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            {/* Button untuk layar kecil */}
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="flex md:hidden"
                              >
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditUser(user.id)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setDeletingUserId(user.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Hapus</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Button untuk layar lebih besar */}
                            <div className="hidden md:flex space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleEditUser(user.id)}
                                className="h-8 w-8"
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setDeletingUserId(user.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Hapus</span>
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Tidak ada data pengguna yang ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deletingUserId}
        onOpenChange={(open) => !open && setDeletingUserId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (deletingUserId) {
                  await deleteUser(deletingUserId);
                  setDeletingUserId(null);
                }
              }}
              disabled={loading}
            >
              {loading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserPage;
