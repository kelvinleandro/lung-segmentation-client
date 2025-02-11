import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/page-layout";

const HomePage = () => {
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      navigate(`/segmentation`, { state: { file: file } });
    }
  };

  return (
    <PageLayout>
      <main>Home Page</main>
    </PageLayout>
  );
};

export default HomePage;
