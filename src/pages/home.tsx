import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/page-layout";
import { selectFile } from "@/utils/file";

const HomePage = () => {
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = selectFile(event);
      navigate("/segmentation", { state: { file } });
    } catch (error) {
      console.log("Deu ruim.");
    }
  };

  return (
    <PageLayout>
      <main className="flex flex-1">Home Page</main>
    </PageLayout>
  );
};

export default HomePage;
