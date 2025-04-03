import HeaderPage from "@/components/common/header-page";
import NarrativeForm from "@/components/narrative/NarrativeForm";
import React from "react";

const CreateNarrativePage = () => {
  return (
    <div className="space-y-4">
      <HeaderPage
        titlePage="Buat Narasi"
        descriptionPage="Isi formulir di bawah untuk membuat narasi"
      />
      <NarrativeForm />
    </div>
  );
};

export default CreateNarrativePage;
