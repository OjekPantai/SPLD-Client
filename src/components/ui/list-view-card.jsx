import {
  formatDate,
  formatImagePath,
  getInitials,
  truncateText,
} from "@/lib/utils";
import { getStatusBadge } from "./status-badge";
import { Card } from "./card";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Badge } from "./badge";
import { Calendar, ChevronRight, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";

const ListViewCard = ({ items, handleViewitem, setSelectedImage }) => (
  <div className="space-y-4">
    {items.map((item) => (
      <Card
        key={item.id}
        className="overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col md:flex-row">
          {item.Media?.length > 0 && (
            <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden border-b md:border-b-0 md:border-r">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={
                      formatImagePath(item.Media[0].filePath) ||
                      "/placeholder.svg"
                    }
                    alt={`Media untuk ${item.title}`}
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => setSelectedImage(item.Media[0])}
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        formatImagePath(item.Media[0].filePath) ||
                        "/placeholder.svg"
                      }
                      alt={`Media untuk ${item.title}`}
                      className="max-h-[70vh] object-contain rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              {item.Media.length > 1 && (
                <Badge className="absolute bottom-2 right-2 bg-background/80">
                  +{item.Media.length - 1} foto
                </Badge>
              )}
            </div>
          )}

          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <Badge variant="outline">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(item.createdAt)}
              </Badge>
            </div>

            <div className="flex items-center mb-3">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage
                  src={`/avatars/${item.User?.id || "default"}.png`}
                />
                <AvatarFallback>{getInitials(item.User?.name)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {item.User?.name || "Anonim"}
              </span>

              <div className="mx-2 h-4 border-r border-gray-200"></div>

              <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {truncateText(item.Report?.title || "No Report", 20)}
              </span>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {item.content}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              {getStatusBadge(item.status)}
              <Button
                className="ml-auto"
                variant="secondary"
                size="sm"
                onClick={() => handleViewitem(item.id)}
              >
                Baca Selengkapnya
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default ListViewCard;
