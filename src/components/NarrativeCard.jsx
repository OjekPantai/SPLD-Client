import { format } from "date-fns";
import { Calendar, User, MapPin, FileText, ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const NarrativeCard = ({ narrative }) => {
  // Function to format file path for display
  const formatImagePath = (filePath) => {
    // Convert backslashes to forward slashes for URLs
    const formattedPath = filePath.replace(/\\/g, "/");
    // Return the full URL to the image
    return `http://localhost:3000/${formattedPath}`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy, HH:mm");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{narrative.title}</CardTitle>
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDate(narrative.createdAt)}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <FileText className="mr-1 h-4 w-4" />
          <span className="mr-4">Report: {narrative.Report.title}</span>
          <User className="mr-1 h-4 w-4" />
          <span className="mr-4">By: {narrative.Report.User.name}</span>
          <MapPin className="mr-1 h-4 w-4" />
          <span>{narrative.Report.User.PoliceSector.name}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{narrative.content}</p>
        {narrative.Media && narrative.Media.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {narrative.Media.map((media) => (
              <Dialog key={media.id}>
                <DialogTrigger asChild>
                  <div className="relative aspect-video cursor-pointer rounded-md overflow-hidden border bg-muted hover:bg-muted/80 transition-colors">
                    <img
                      src={
                        formatImagePath(media.filePath) || "/placeholder.svg"
                      }
                      alt={`Media for ${narrative.title}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-2 right-2 bg-background/80 p-1 rounded-md">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{narrative.title} - Media</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-center">
                    <img
                      src={
                        formatImagePath(media.filePath) || "/placeholder.svg"
                      }
                      alt={`Media for ${narrative.title}`}
                      className="max-h-[70vh] object-contain rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Badge variant="secondary">{narrative.Media.length} Media</Badge>
        <Badge variant="outline" className="ml-auto">
          ID: {narrative.id}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default NarrativeCard;
