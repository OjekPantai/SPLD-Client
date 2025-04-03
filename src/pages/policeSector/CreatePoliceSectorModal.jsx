import { useState } from "react";
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

export function CreatePoliceSectorModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPoliceSector } = usePoliceSector();

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
      const response = await createPoliceSector({ name });

      // Check if response is successful
      if (response.success) {
        toast.success("Data polsek berhasil ditambahkan");
        setName("");
        if (typeof onSuccess === "function") {
          onSuccess();
        }
        handleClose();
      } else {
        // Display error message if not successful
        toast.error(response.message || "Gagal menambahkan data polsek");
      }
    } catch (error) {
      console.error("Error adding police sector:", error);
      toast.error("Terjadi kesalahan sistem saat menambahkan data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Polsek</DialogTitle>
            <DialogDescription>
              Masukkan data polsek baru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Polsek
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
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
