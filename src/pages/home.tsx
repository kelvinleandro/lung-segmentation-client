import PageLayout from "@/components/page-layout";
import HeroSection from "@/components/hero-section"; 
import useTheme from "@/hooks/use-theme";

const HomePage = () => {
  const { currentColorScheme} = useTheme();


  return (
    <PageLayout>
      <main
      className="flex flex-col items-center flex-grow"
      style={{
          backgroundImage:
          currentColorScheme === "dark"
            ? "url('/images/background.png')"
            : "url('/images/background-2.png')",
          backgroundColor: "var(--light-background)",
          backgroundSize:currentColorScheme === "dark" ? "cover" : "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

      <HeroSection/>
        
      </main>
    </PageLayout>
  );
};

export default HomePage;
