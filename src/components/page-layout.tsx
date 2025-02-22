import Header from "./header";
import Footer from "./footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
