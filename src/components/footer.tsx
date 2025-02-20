// const Footer = () => {
//   return <footer className="bg-black text-white text-lg">Footer</footer>;
// };

// export default Footer;

import { Separator } from "@/components/ui/separator"; // Importando o componente Separator (caso seja necessário)

const Footer = () => {
  return (
    <footer className="bg-black text-white py-2 px-8 flex items-center justify-between">

      <div className="flex items-center gap-2 h-full"> 
        <img 
          src="/images/ufc-crest.png" 
          alt="Logo"
          className="h-7"
        />

        <Separator orientation="vertical" className="mx-5 border-1" />
        
        <p className="font-bold font-dm-sans text-lg">
          TI0147 - Fundamentos de Processamento Digital de Imagens - 2024.2 - Paulo Cesar Cortez
        </p>
      </div>
    </footer>
  );
};

export default Footer;
