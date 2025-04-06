const VisuallyHidden = ({ children }) => {
  return <span className="sr-only">{children}</span>;
};

export default VisuallyHidden;
