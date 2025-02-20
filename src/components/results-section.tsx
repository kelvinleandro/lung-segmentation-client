import { useState } from "react";
import { Download } from "lucide-react";
import { MdOutlineDownloading } from "react-icons/md";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

const ResultsSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full h-full flex gap-40 pl-40">
      <div className="flex flex-col gap-9 pt-5">
        <h1 className="font-bold text-[32px] font-dm-sans">Original Image</h1>
        <div className="w-[512px] h-[512px] bg-amber-500 rounded-3xl"></div>
      </div>

      <div className="flex flex-col gap-9 pt-5">
        <div className="flex items-center gap-7">
          <h1 className="font-bold text-[32px] font-dm-sans">Result Image</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
              <button className="ml-28 cursor-pointer flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-4xl font-poppins text-[14px] font-medium hover:border-amber-400 hover:text-amber-400 transition-all">
                <Download />
                Download
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm [&_svg:not([class*='size-'])]:size-7 " >
              <DialogHeader className="flex flex-col items-center text-center">
                <MdOutlineDownloading className="size-20 mt-2" />
                <DialogTitle className="text-[32px] font-bold font-dm-sans ">
                  Download de Resultado
                </DialogTitle>

                <DialogDescription className="mt-2 text-gray-900 font-poppins text-[16px]">
                  Selecione o formato que deseja fazer o download:
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col justify-center items-center gap-4 mt-4 ">
                <button
                  className="bg-[#141416] flex justify-center items-center text-[#FCFCFD] font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer" 
                >
                  .PNG
                </button>
                <button
                  className="bg-[#FCFCFD] flex justify-center items-center text-black font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer border border-gray-800" 
                >
                  .CSV
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-[512px] h-[512px] bg-amber-500 rounded-3xl"></div>
      </div>
    </section>
  );
};

export default ResultsSection;
