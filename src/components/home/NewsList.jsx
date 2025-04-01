import { Calendar, User, MapPin, Shield } from "lucide-react";

const NewsList = ({ news, onNewsClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Laporan & Dokumentasi
        </h1>
        <p className="text-muted-foreground">
          Sistem Pendataan Laporan dan Dokumentasi Polresta Magelang
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
            onClick={() => onNewsClick(item)}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              {item.Media && item.Media.length > 0 ? (
                <img
                  src={`/placeholder.svg?height=200&width=400`}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-muted">
                  <Shield className="h-12 w-12 text-muted-foreground/50" />
                </div>
              )}
              {item.Report &&
                item.Report.User &&
                item.Report.User.PoliceSector && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {item.Report.User.PoliceSector.name}
                      </span>
                    </div>
                  </div>
                )}
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2 text-lg">
                {item.title}
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {truncateContent(item.content)}
              </p>
            </div>
            <div className="border-t p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                {item.Report && item.Report.User && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{item.Report.User.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
