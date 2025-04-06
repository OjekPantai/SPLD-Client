import { formatDate, formatImagePath, getInitials } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { ChevronRight, ImageIcon } from "lucide-react";
import { getStatusBadge } from "./status-badge";
import { Badge } from "./badge";

const GridViewCard = ({
  items,
  mediaVariant = "dialog", // 'dialog' | 'single' | 'none'
  onDetailClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-2 text-lg">
                {item.title}
              </CardTitle>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-2">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage
                    src={`/avatars/${item.User?.id || "default"}.png`}
                  />
                  <AvatarFallback>
                    {getInitials(item.User?.name)}
                  </AvatarFallback>
                </Avatar>
                <span>{item.User?.name || "Anonim"}</span>
              </div>
              <Badge variant="outline" className="text-muted-foreground">
                {formatDate(item.createdAt)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            {mediaVariant !== "none" &&
              item.Media?.length > 0 &&
              (mediaVariant === "dialog" ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {item.Media.slice(0, 2).map((media) => (
                    <Dialog key={media.id}>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video cursor-pointer rounded-md overflow-hidden border bg-muted hover:bg-muted/80 transition-colors">
                          <img
                            src={
                              formatImagePath(media.filePath) ||
                              "/placeholder.svg"
                            }
                            alt={`Media untuk ${item.title}`}
                            className="object-cover w-full h-full"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-md">
                            <ImageIcon className="h-3 w-3" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xl">
                        <div className="flex items-center justify-center">
                          <img
                            src={
                              formatImagePath(media.filePath) ||
                              "/placeholder.svg"
                            }
                            alt={`Media untuk ${item.title}`}
                            className="max-h-[70vh] object-contain rounded-md"
                            crossOrigin="anonymous"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                  {item.Media.length > 2 && (
                    <div className="relative aspect-video cursor-pointer rounded-md overflow-hidden border bg-muted/90 hover:bg-muted/70 transition-colors flex items-center justify-center">
                      <span className="text-lg font-medium">
                        +{item.Media.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={formatImagePath(item.Media[0].filePath)}
                  alt="Media"
                  className="mt-4 rounded-md object-cover h-40 w-full"
                  crossOrigin="anonymous"
                />
              ))}

            <p className={`text-muted-foreground text-sm line-clamp-3 mt-4`}>
              {item.content}
            </p>
          </CardContent>

          <CardFooter className="flex w-full gap-2 pt-2 pb-4">
            <div className="flex items-center w-full">
              {getStatusBadge(item.status)}
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onDetailClick(item.id)}
            >
              Detail
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridViewCard;
