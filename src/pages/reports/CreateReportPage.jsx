import HeaderPage from "@/components/common/header-page";
import ReportForm from "@/components/report/ReportForm";
import React from "react";

const CreateReportPage = () => {
  return (
    <div className="space-y-6">
      <HeaderPage
        titlePage="Buat Laporan Baru"
        descriptionPage="Isi formulir di bawah untuk membuat laporan baru"
      />
      <ReportForm />
    </div>
  );
};

export default CreateReportPage;
