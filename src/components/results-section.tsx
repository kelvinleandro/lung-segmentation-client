import { Download } from "lucide-react";

const ResultsSection = () => {
  return (
    <section className=" w-full h-full flex gap-40 pl-40">
      <div className="flex flex-col gap-9 pt-5">
        <h1 className="font-bold text-[32px] font-dm-sans">Original Image</h1>
        <div className="w-[512px] h-[512px] bg-amber-500 rounded-3xl"></div>
      </div>
      <div className="flex flex-col gap-9 pt-5">
        <div className="flex items-center gap-7">
          <h1 className="font-bold text-[32px] font-dm-sans ">Result Image</h1>

          <button className="cursor-pointer flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-4xl font-poppins text-[14px] font-medium hover:border-amber-400 hover:text-amber-400 transition-all" >
            <Download />
            Download
          </button>
        </div>

        <div className="w-[512px] h-[512px] bg-amber-500 rounded-3xl"></div>
      </div>
    </section>
  );
};

export default ResultsSection;
