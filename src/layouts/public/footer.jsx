import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">SPLD</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistem Pendataan Laporan dan Dokumentasi Polresta Magelang
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Laporan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Jl. Pahlawan No. 10, Magelang
              </li>
              <li className="text-muted-foreground">Telp: (0293) 123456</li>
              <li className="text-muted-foreground">
                Email: info@polrestamagelang.go.id
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Media Sosial</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Polresta Magelang. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
