import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-[#c9c9c9] flex w-full h-screen flex-row gap-8 items-center justify-center">
      <img className="w-[25%] h-auto" src="/images/sad.png" alt="Sad face" />

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-9xl font-dm-sans font-bold">404</h1>
        <h2 className="text-2xl font-dm-sans font-bold">
          Ops, parece que você está perdido!
        </h2>

        <Button
          onClick={() => navigate("/")}
          className="text-white cursor-pointer font-dm-sans"
        >
          Ir para a página inicial
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
