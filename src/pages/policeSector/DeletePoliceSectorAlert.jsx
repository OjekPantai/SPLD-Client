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
import { AlertTriangle, Loader2 } from "lucide-react";
import { usePoliceSector } from "@/hooks/usePoliceSector";
import { toast } from "sonner";

export function DeletePoliceSectorAlert({
  isOpen,
  onClose,
  onSuccess,
  policeSector,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deletePoliceSector } = usePoliceSector();

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      const response = await deletePoliceSector(policeSector.id);

      if (!response.success) {
        throw new Error(response.message || "Gagal menghapus data");
      }

      toast.success("Data polsek berhasil dihapus");

      onSuccess();
    } catch (error) {
      console.error("Error deleting police sector:", error);
      toast.error(error.message || "Terjadi kesalahan saat menghapus data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Konfirmasi Hapus
          </DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus polsek{" "}
            <span className="font-medium">{policeSector?.name}</span>? Tindakan
            ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
            <p className="text-sm">
              Data yang sudah dihapus tidak dapat dikembalikan. Pastikan Anda
              yakin sebelum melanjutkan.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
