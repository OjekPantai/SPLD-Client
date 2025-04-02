import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const HeaderPage = (props) => {
  const { titlePage, descriptionPage, buttonProps } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{titlePage}</h2>
        <p className="text-muted-foreground">{descriptionPage}</p>
      </div>
      {buttonProps && (
        <Button
          size={buttonProps.size || "sm"}
          variant={buttonProps.variant || "default"}
          onClick={buttonProps.onClick}
        >
          {buttonProps.icon && <buttonProps.icon className="mr-2" />}
          {buttonProps.label}
        </Button>
      )}
    </div>
  );
};

export default HeaderPage;
