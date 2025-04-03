import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  User,
  MapPin,
  ImageIcon,
  ExternalLink,
  Share2,
  Download,
  Printer,
  PenToolIcon,
  CheckCircleIcon,
  Shield,
} from "lucide-react";
import { formatDate, formatImagePath, getInitials } from "@/lib/utils";
import { getStatusBadge } from "./status-badge";
import { useNavigate } from "react-router-dom";
const ContentViewer = ({
  data,
  type = "narrative", // 'narrative' or 'report'
  onSubmit,
  onAddNarrative,
}) => {
  const isNarrative = type === "narrative";
  const content = data;
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className={isNarrative ? "pb-3" : "pb-0"}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1.5">
                {!isNarrative && (
                  <div className="flex items-center gap-2">
                    {getStatusBadge && getStatusBadge(content.status)}
                  </div>
                )}
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {content.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-3">
                {isNarrative ? (
                  <>
                    <Button variant="outline" className="px-4 gap-2" size="sm">
                      <Share2 className="h-[18px] w-[18px]" />
                      Share
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="px-4 gap-2"
                          size="sm"
                        >
                          <Download className="h-[18px] w-[18px]" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-[160px]">
                        <DropdownMenuItem className="gap-3">
                          <Printer className="h-4 w-4" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3">
                          <Download className="h-4 w-4" />
                          PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-3">
                          <FileText className="h-4 w-4" />
                          Word
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : content.status === "submitted" ? (
                  <Button variant="outline" size="sm" onClick={onAddNarrative}>
                    <PenToolIcon className="mr-1 h-4 w-4" />
                    Tambah Narasi
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={onSubmit}>
                    <CheckCircleIcon className="mr-1 h-4 w-4" />
                    Submit
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-x-4 gap-y-3 text-sm text-muted-foreground mt-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatDate(content.createdAt)}</span>
              </div>

              {isNarrative && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">
                    {content.Report?.title || "Tidak ada judul"}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 flex-shrink-0" />
                <span>{content.User?.name || "Anonim"}</span>
              </div>

              {isNarrative ? (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Kec. Srumbung, Kab. Magelang</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 flex-shrink-0" />
                  <span>Polsek: {content.User?.policeSectorId || "-"}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className={isNarrative ? "pt-2" : "pt-6"}>
            <div className="prose prose-sm max-w-none mb-6">
              <p className="whitespace-pre-wrap text-primary">
                {content.content}
              </p>
            </div>

            {content.Media && content.Media.length > 0 && (
              <>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Media Terlampir ({content.Media.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {content.Media.map((media, index) => (
                    <Dialog key={media.id}>
                      <DialogTrigger asChild>
                        <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                          <img
                            alt={`Media ${index + 1}`}
                            className="object-cover w-full h-full hover:opacity-80 transition-opacity"
                            src={formatImagePath(media.filePath)}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0">
                        <img
                          alt={`Media ${index + 1} Full`}
                          className="w-full h-full object-contain"
                          src={formatImagePath(media.filePath)}
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Penulis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={content.User?.avatar} />
                <AvatarFallback>
                  {getInitials(content.User?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{content.User?.name || "Anonim"}</p>
                <p className="text-sm text-muted-foreground">
                  {content.User?.role || "Pengguna"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("profile", content.User?.id)}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Lihat Profil
            </Button>
          </CardContent>
        </Card>

        {isNarrative && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Laporan Terkait
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.Report ? (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileText className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {content.Report.title}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/admin/reports/${content.Report.id}`)
                    }
                    variant="ghost"
                    size="icon"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tidak ada dokumen terkait
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
