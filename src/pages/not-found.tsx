import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useLanguage from "@/hooks/use-language";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { text } = useLanguage();

  return (
    <main className="bg-[#c9c9c9] flex w-full h-screen flex-row gap-8 items-center justify-center">
      <img className="w-[25%] h-auto" src="/images/sad.png" alt="Sad face" />

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-9xl font-dm-sans font-bold">404</h1>
        <h2 className="text-2xl font-dm-sans font-bold">{text.error404}</h2>

        <Button
          onClick={() => navigate("/")}
          className="text-white cursor-pointer font-dm-sans"
        >
          {text.homeButton}
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
