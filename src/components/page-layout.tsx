import Header from "./header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default PageLayout;
