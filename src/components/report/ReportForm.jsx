import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { X, Upload, FileText, AlertCircle } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles) => {
    // Limit to 5 files
    const limitedFiles = selectedFiles.slice(0, 5);

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...limitedFiles];
      return newFiles.slice(0, 5); // Ensure max 5 files
    });

    const imagePreviews = limitedFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      }
      return null;
    });

    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews, ...imagePreviews];
      return newPreviews.slice(0, 5); // Ensure max 5 previews
    });
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await api.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/reports");
      toast("Laporan Berhasil Dibuat", {
        description: response.message,
      });
    } catch (error) {
      toast("Gagal mengirim laporan", {
        description: error.response?.data?.message || "Terjadi kesalahan",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Judul laporan wajib diisi" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-base">Judul Laporan</Label>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan judul laporan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              rules={{ required: "Isi laporan wajib diisi" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-base">Isi Laporan</Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Deskripsi lengkap laporan"
                      className="min-h-[150px] resize-y"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label className="text-base">Lampiran Foto/Video</Label>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? "border-primary bg-primary/5" : "border-muted"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-medium">
                      Tarik dan lepas file di sini atau
                    </p>
                    <label className="cursor-pointer text-primary hover:text-primary/80 font-medium">
                      Pilih file
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        accept="image/*, video/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maksimal 5 file (JPEG, PNG, MP4) dengan ukuran maksimal 50MB
                    per file
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-3">
                  <Label className="text-sm">File yang dipilih</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {previews[index] ? (
                            <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={previews[index] || "/placeholder.svg"}
                                alt={`Preview ${index}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 rounded bg-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {files.length > 0 && (
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Pastikan file yang diunggah tidak mengandung informasi
                  sensitif yang tidak perlu.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-2.5"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
