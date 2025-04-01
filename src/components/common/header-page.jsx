const HeaderPage = (props) => {
  const { titlePage, descriptionPage } = props;
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{titlePage}</h2>
        <p className="text-muted-foreground">{descriptionPage}</p>
      </div>
    </div>
  );
};

export default HeaderPage;
