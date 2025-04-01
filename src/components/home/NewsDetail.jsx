import React from "react";
import { ArrowLeft, Calendar, User, MapPin, FileText } from "lucide-react";

const NewsDetail = ({ news, onBack }) => {
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

  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke daftar
      </button>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{news.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
          {news.Report && news.Report.User && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{news.Report.User.name}</span>
            </div>
          )}
          {news.Report && news.Report.User && news.Report.User.PoliceSector && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{news.Report.User.PoliceSector.name}</span>
            </div>
          )}
          {news.Report && (
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{news.Report.title}</span>
            </div>
          )}
        </div>
      </div>

      {news.Media && news.Media.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {news.Media.map((media) => (
            <div key={media.id} className="overflow-hidden rounded-lg border">
              <img
                src={`/placeholder.svg?height=300&width=400`}
                alt={`Media ${media.id}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="prose prose-stone dark:prose-invert max-w-none">
        <p>{formatContent(news.content)}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
