import NewsDetail from "@/components/home/NewsDetail";
import NewsList from "@/components/home/NewsList";
import Navbar from "@/layouts/public/navbar";
import React, { useState } from "react";

const dummyData = {
  success: true,
  message: "Public narratives retrieved",
  data: [
    {
      id: 6,
      title: "Kebakaran Lahan Di Kawasan TNGM Kec. Srumbung",
      content:
        "Selamat Malam Komandan, Mohon Ijin Melaporkan \n\nHari Selasa tanggal 17  Oktober 2023 pukul 16.30 Wib bertempat di Lokasi Gunung Pasir Eks Dsn.Genting masuk pangkuan Ds. Ngablak Kec.Srumbung Kab.Magelang (-7'34'113.3\", 110'23\"26.2.') terjadi kebakaran lahan yang ditumbuhi rumput liar / ilalang. \n\nSaksi dalam kejadian tersebut : \n\n1. Nama Ali Machfudhi, umur 45th, Agama Islam, Alamat Purwomartani Kalasan Sleman. \n\n2. Nama Ahmad Yasin, Umur 40 th, Agama Islam,Alamat Salakan Selomartani Kalasan Sleman DIY. \n\nUraian singkat kejadian : \n\n- Pada pukul 16.30 Wib sewaktu petugas dari Dinas TNGM sedang melakukan patroli dilokasi TNGM Eks Dsn. Genting pangkuan Ds. Ngablak Kec.Srumbung menjumpai ada titik api menyala, akibat tiupan angin yang cukup kencang maka nyala api semakin membesar. \n\n- Kemudian kejadian tersebut dilaporkan ke Polsek Srumbung, setelah menerima laporan petugas Polsek Srumbung dan Koramil 16 Srumbung menuju ke lokasi guna membantu memadamkan api bersama-sama. \n\n- Adapun lahan yang terbakar merupakan lokasi penanaman rehabilitasi paska kebakaran tahun 2019 dengan luas kurang lebih 8,96 Ha, tinggi tempat 912 mdpl, koordinat -7'34'113.3\", 110'23\"26.2.' \n\n- Pukul 21.15 Wib api dapat dipadamkan oleh petugas gabungan dengan menggunakan 1 Mobil Slip On Unit, Truk Damkar. Sampai dengan saat ini untuk penyebab kebakaran belum dapat diketahui. \n\nPetugas yang melakukan pemadaman : \n\n- Anggota Polsek Srumbung\n- Anggota Koramil 16 Srumbung\n- BPBD Kab. Magelang\n- Dinas TNGM\n- DAMKAR Kab. Magelang\n- Relawan\n- Warga masyarakat sekitar \n\nTindakan Polri : \n\n- Terima laporan\n- Datangi TKP\n- Bantu padamkan api\n- Koordinasi dengan TNGM\n- Buat laporan\n- Lap Pimpinan\n\n\n\nDUMP \n\nSrumbung 1\nAKP SUYANTO\n\n\nTembusan \n\n1. Wakapolresta  Magelang\n2. Kabagops Polresta Magelang\n3. PJU Polresta Magelang",
      createdAt: "2025-03-31T18:28:07.000Z",
      Media: [
        {
          id: 7,
          filePath: "media\\1743445687059-logo.png",
          type: "foto",
        },
      ],
      Report: {
        id: 1,
        title: "test report",
        User: {
          id: 3,
          name: "test",
          PoliceSector: {
            id: 2,
            name: "Test",
          },
        },
      },
    },
    {
      id: 5,
      title: "Kecelakaan Lalu Lintas di Jalan Raya Magelang-Yogyakarta",
      content:
        "Selamat Pagi Komandan, Mohon Ijin Melaporkan\n\nHari Senin tanggal 15 Oktober 2023 pukul 08.15 WIB telah terjadi kecelakaan lalu lintas di Jalan Raya Magelang-Yogyakarta KM 12. Kecelakaan melibatkan satu unit sepeda motor dan satu unit mobil.\n\nKorban dalam kejadian tersebut:\n1. Pengemudi sepeda motor: Nama Budi Santoso, umur 35 tahun, mengalami luka ringan\n2. Pengemudi mobil: Nama Andi Wijaya, umur 42 tahun, tidak mengalami luka\n\nUraian singkat kejadian:\n- Kecelakaan terjadi saat sepeda motor yang dikendarai Sdr. Budi hendak menyalip dari sisi kanan namun tiba-tiba mobil di depannya berbelok ke kanan tanpa memberikan sein terlebih dahulu\n- Sepeda motor menabrak bagian samping kanan mobil dan pengendara terjatuh ke aspal\n- Korban segera dilarikan ke Puskesmas terdekat untuk mendapatkan perawatan\n\nTindakan Polri:\n- Mengamankan TKP\n- Melakukan olah TKP\n- Mencatat keterangan saksi\n- Mengamankan kendaraan yang terlibat\n- Membuat laporan kejadian\n\nDemikian laporan ini disampaikan.\n\nHormat kami,\nBRIPKA HENDRA SAPUTRA",
      createdAt: "2025-03-30T10:15:00.000Z",
      Media: [
        {
          id: 8,
          filePath: "media\\accident-scene.jpg",
          type: "foto",
        },
        {
          id: 9,
          filePath: "media\\accident-vehicle.jpg",
          type: "foto",
        },
      ],
      Report: {
        id: 2,
        title: "Laporan Kecelakaan Lalu Lintas",
        User: {
          id: 4,
          name: "Hendra Saputra",
          PoliceSector: {
            id: 1,
            name: "Polsek Mertoyudan",
          },
        },
      },
    },
    {
      id: 4,
      title: "Penangkapan Pelaku Pencurian di Kawasan Perumahan Tidar",
      content:
        "Selamat Sore Komandan, Mohon Ijin Melaporkan\n\nHari Minggu tanggal 14 Oktober 2023 pukul 02.30 WIB telah dilakukan penangkapan terhadap pelaku pencurian di Perumahan Tidar Blok C No. 15, Kelurahan Tidar, Kecamatan Magelang Selatan.\n\nTersangka:\nNama: Anton Setiawan (alias Tono)\nUmur: 27 tahun\nAlamat: Kampung Potrobangsan RT 05/RW 03, Magelang Utara\n\nBarang bukti yang diamankan:\n- 1 unit laptop merk Asus\n- 2 unit handphone\n- 1 dompet berisi uang tunai Rp 750.000\n- 1 unit kunci T sebagai alat untuk membuka paksa jendela\n\nKronologi penangkapan:\n- Petugas patroli menerima laporan dari warga tentang adanya orang mencurigakan yang masuk ke rumah kosong\n- Tim segera menuju lokasi dan melakukan pengepungan\n- Pelaku tertangkap saat hendak kabur membawa barang curian\n- Pelaku dan barang bukti diamankan ke Polresta Magelang untuk proses lebih lanjut\n\nTindakan Polri:\n- Mengamankan tersangka\n- Mengamankan barang bukti\n- Melakukan pemeriksaan tersangka\n- Membuat laporan penangkapan\n\nDemikian laporan ini disampaikan.\n\nHormat kami,\nIPTU BAMBANG HERMANTO",
      createdAt: "2025-03-29T14:45:00.000Z",
      Media: [
        {
          id: 10,
          filePath: "media\\evidence-items.jpg",
          type: "foto",
        },
      ],
      Report: {
        id: 3,
        title: "Laporan Penangkapan Pelaku Pencurian",
        User: {
          id: 5,
          name: "Bambang Hermanto",
          PoliceSector: {
            id: 3,
            name: "Polsek Magelang Selatan",
          },
        },
      },
    },
  ],
};

const HomePage = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedNews(null);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {selectedNews ? (
        <NewsDetail news={selectedNews} onBack={handleBackToList} />
      ) : (
        <NewsList news={dummyData.data} onNewsClick={handleNewsClick} />
      )}
    </>
  );
};

export default HomePage;
