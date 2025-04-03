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
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNarratives } from "@/hooks/useNarratives";
import { useNavigate, useParams } from "react-router-dom";

const NarrativeForm = () => {
  const { createNarrative, loading, error } = useNarratives();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const { reportId } = useParams();
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
      return newFiles.slice(0, 5);
    });

    const mediaPreviews = limitedFiles.map((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        return URL.createObjectURL(file);
      }
      return null;
    });

    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews, ...mediaPreviews];
      return newPreviews.slice(0, 5);
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
    try {
      setUploadStatus("Preparing files...");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      if (!reportId) {
        toast.error("No report selected", {
          description: "A report is required to create a narrative",
        });
        return;
      }
      formData.append("reportId", reportId);

      if (files.length > 0) {
        setUploadStatus(`Adding ${files.length} files...`);
        files.forEach((file) => {
          formData.append("media", file, file.name);
        });
      }

      setUploadStatus("Uploading to server...");
      await createNarrative(formData);

      toast.success("Narrative created successfully");
      navigate("/admin/narratives");
      setUploadStatus("");
    } catch (err) {
      setUploadStatus("");
      console.error("Form submission error:", err);
      toast.error("Failed to create narrative", {
        description: err.message || "An unexpected error occurred",
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <Card className="w-full py-2">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Judul wajib di isi" }}
              render={({ field }) => (
                <FormItem>
                  <Label>Judul Narasi</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Judul narasi..."
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              rules={{ required: "Isi narasi wajib di isi" }}
              render={({ field }) => (
                <FormItem>
                  <Label>Isi Narasi</Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tulis isi narasi disini"
                      className="min-h-[200px] text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label>Upload foto / video</Label>

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
                    <p className="font-medium">Drag and drop files here or</p>
                    <label className="cursor-pointer text-primary hover:text-primary/80 font-medium">
                      Browse files
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
                    Max 5 files (JPEG, PNG, MP4) up to 50MB each
                  </p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-3">
                  <Label>Selected Media</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {previews[index] ? (
                            <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                              {file.type.startsWith("video/") ? (
                                <div className="h-full w-full bg-muted-foreground/20 flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-muted-foreground" />
                                </div>
                              ) : (
                                <img
                                  src={previews[index]}
                                  alt={`Preview ${index}`}
                                  className="h-full w-full object-cover"
                                />
                              )}
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
                  Please ensure your media files don't contain sensitive
                  information
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus && (
              <Alert variant="info">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{uploadStatus}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan narasi"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NarrativeForm;
