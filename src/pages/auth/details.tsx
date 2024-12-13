/* eslint-disable @typescript-eslint/no-explicit-any */
import Score from "@/components/Score";
import Button from "@/components/Button";
import { useHandlers } from "@/hooks/useHandlers";

// Import SVG icons (assuming these are already imported or will be imported similarly)
import box from "@/assets/box-dark.svg";
import analytics from "@/assets/analytics.svg";
import warning from "@/assets/warning.svg";
import info from "@/assets/info.svg";
import book from "@/assets/book.svg";
import link from "@/assets/link.svg";
import bin from "@/assets/bin.svg";

export default function Details({
  onClose,
  recommendation,
  fromArchive = false,
}: {
  onClose: () => void;
  recommendation: { [key: string]: any };
  fromArchive: boolean;
}) {
  const { handleArchive, isPending } = useHandlers(onClose);

  return (
    <div className="
      fixed 
      inset-y-0 
      right-0 
      z-50 
      w-full 
      max-w-[500px] 
      bg-white 
      shadow-xl
      translate-x-[400px] 
      animate-modalSlideIn 
      overflow-auto
    ">
      <div className="px-6 pb-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pt-4">
          <div>
            <p className="font-semibold py-4 text-sm">{recommendation?.title}</p>
            <div className="-mt-2 flex items-center gap-2">
              <p className="text-xs font-medium">Value score</p>
              <Score score={recommendation?.score} />
            </div>
          </div>
          <span 
            className="p-2 cursor-pointer mr-4" 
            onClick={onClose}
          >
            <p className="font-medium">x</p>
          </span>
        </div>

        <hr className="my-3" />

        {/* Description */}
        <p className="text-xs">{recommendation?.description}</p>

        {/* Resources */}
        <div className="my-3 font-medium">
          <div className="flex items-center gap-1">
            <img src={box} alt="" className="w-4 h-4" />
            <p className="text-sm font-semibold">Resources enforced by policy</p>
          </div>
          <span className="bg-zinc-100 px-2 py-0.5 text-xs rounded">xxxx</span>
        </div>

        {/* Reasons */}
        <div className="my-3 font-medium">
          <div className="flex items-center gap-1">
            <img src={box} alt="" className="w-4 h-4" />
            <p className="text-sm font-semibold">Reasons</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-1">
            {recommendation?.reasons?.map((reason: string) => (
              <span
                key={reason}
                className="bg-zinc-100 px-2 py-0.5 text-xs rounded"
              >
                {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="mt-12 font-medium">
          <div className="flex items-center gap-1">
            <img src={analytics} alt="" className="w-4 h-4" />
            <p className="text-sm font-semibold">Impact Assessment</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
            <div className="bg-zinc-100 border border-zinc-200 w-full sm:w-[250px] px-4 py-2 text-xs rounded">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs">Overall</p>
                <img src={info} alt="info" className="w-4 h-4" />
              </div>
              <div className="flex justify-between items-center gap-12">
                <p className="font-bold">Violations</p>
                <p className="font-bold">
                  {recommendation?.impactAssessment?.totalViolations}
                </p>
              </div>
            </div>

            <div className="bg-zinc-100 border border-zinc-200 w-full sm:w-[250px] px-4 py-2 text-xs rounded">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs">Most impacted scope</p>
                <img src={warning} alt="warning" className="w-4 h-4" />
              </div>
              <div className="flex justify-between items-center gap-12">
                <p className="font-bold">
                  {recommendation?.impactAssessment?.mostImpactedScope?.type}
                </p>
                <p className="font-bold">
                  {recommendation?.impactAssessment?.mostImpactedScope?.count}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Further Reading */}
        <div className="flex items-center gap-2 mt-5">
          <img src={book} alt="book" className="w-4 h-4" />
          <p className="font-bold text-sm">Further reading</p>
        </div>
        {recommendation.furtherReading.map(
          (reading: { [key: string]: string }) => (
            <div key={reading.name} className="flex items-center gap-2 mt-4">
              <p className="text-[10px] flex-grow truncate">{reading.name}</p>
              <a href={reading.href} target="_blank" rel="noopener noreferrer">
                <img src={link} alt="link" className="w-4 h-4" />
              </a>
            </div>
          )
        )}

        {/* Footer Actions */}
        <hr className="mt-24" />
        <div className="flex justify-end items-center gap-4">
          {fromArchive ? (
            <span
              className="text-xs inline-flex gap-1 cursor-pointer"
              role="button"
              onClick={() =>
                isPending
                  ? {}
                  : handleArchive(recommendation.recommendationId, "unarchive")
              }
            >
              {!isPending && <img src={bin} alt="bin" className="w-4 h-4" />}
              {isPending ? "UnArchiving..." : "UnArchive"}
            </span>
          ) : (
            <span
              className="text-xs inline-flex gap-1 cursor-pointer"
              role="button"
              onClick={() =>
                isPending
                  ? {}
                  : handleArchive(recommendation.recommendationId, "archive")
              }
            >
              {!isPending && <img src={bin} alt="bin" className="w-4 h-4" />}
              {isPending ? "Archiving..." : "Archive"}
            </span>
          )}
          <Button
            label="Configure policy"
            className="bg-primary
              w-36
              my-4
              text-xs
              text-white
              rounded
              disabled:not-allowed 
              flex gap-1 
              items-center 
              justify-center 
              py-2 
              px-5 
              disabled:bg-primary100"
          />
        </div>
      </div>
    </div>
  );
}
