"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { usePoliceSector } from "@/hooks/usePoliceSector";
import { toast } from "sonner";

export function EditPoliceSectorModal({
  isOpen,
  onClose,
  onSuccess,
  policeSector,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updatePoliceSector } = usePoliceSector();

  useEffect(() => {
    if (policeSector) {
      setName(policeSector.name || "");
    }
  }, [policeSector]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!name.trim()) {
      setError("Nama polsek tidak boleh kosong");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await updatePoliceSector({
        id: policeSector.id,
        name,
      });

      if (!response.success) {
        throw new Error(response.message || "Gagal mengubah data");
      }
      toast.success("Data polsek berhasil diperbarui");

      onSuccess();
    } catch (error) {
      console.error("Error updating police sector:", error);
      toast.error(error.message || "Terjadi kesalahan saat mengubah data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Polsek</DialogTitle>
            <DialogDescription>
              Ubah data polsek di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-id" className="text-right">
                ID Polsek
              </Label>
              <div className="col-span-3">
                <Input
                  id="edit-id"
                  value={policeSector?.id || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Nama Polsek
              </Label>
              <div className="col-span-3">
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama polsek"
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
