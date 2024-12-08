import cloud from "@/assets/cloud.svg";
import aws from "@/assets/aws.svg";
import azure from "@/assets/azure.svg";
import box from "@/assets/box.svg";
import Score from "@/components/Score";

export default function Recommendation({
  datum,
  onClick,
  fromArchive = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datum: { [key: string]: any };
  onClick: (id: string) => void;
  fromArchive: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={1}
      className="bg-white rounded-lg border border-slate-200 my-4 flex flex-wrap cursor-pointer hover:shadow-md"
      onClick={() => onClick(datum.recommendationId)}
    >
      <div
        className={`${
          fromArchive ? "bg-gray-400" : "bg-primary"
        } p-8 rounded-tl-lg rounded-bl-lg flex items-center justify-center`}
      >
        <img src={box} alt="box" className="w-8 h-8" />
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="font-semibold">{datum.title}</p>
          <div className="flex items-center gap-2">
            <img src={cloud} alt="cloud" className="w-5 h-5" />
            <img src={aws} alt="aws" className="w-5 h-5" />
            <img src={azure} alt="azure" className="w-5 h-5" />
          </div>
        </div>
        <p className="text-sm mt-2">{datum.description}</p>
        <div className="flex flex-wrap gap-2 my-2">
          {datum.frameworks?.map((frame: { [key: string]: string }) => (
            <div key={frame.name} className="bg-slate-100 rounded px-2">
              <span className="text-xs text-zinc-700">{frame.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="m-3 rounded bg-slate-100 p-4 w-full sm:w-[200px]">
        <p className="text-sm text-zinc-900 font-medium mb-2">
          Impact Assessment
        </p>
        <p className="text-zinc-700 text-xs -mt-2 mb-3">
          ~{datum.impactAssessment.totalViolations} violations / month
        </p>
        <hr />
        <div className="mt-2 flex items-center gap-2">
          <p className="text-xs font-medium">Value score</p>
          <Score score={datum.score} />
        </div>
      </div>
    </div>
  );
}
