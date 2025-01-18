import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Handle, Position } from "@xyflow/react";
import { BeatLoader } from "react-spinners";
import { BiCaptions, BiSolidImage } from "react-icons/bi";
import { RiDeleteBin6Line, RiVideoUploadLine } from "react-icons/ri";
import { IoPlayCircle } from "react-icons/io5";
import { MdOutlineStickyNote2, MdFace, MdSummarize } from "react-icons/md";
import { FaVideo, FaLightbulb, FaSearch, FaClock } from "react-icons/fa";
import { useCurrentTaskQuery } from "@/hooks/queries/useCurrentTaskQuery";
import { useTaskStatusQuery } from "@/hooks/queries/useTaskStatusQuery";
import { useState } from "react";
import GenerateThumbnail from "../resultDialogs/generateThumbnails";
import GenerateTimeStamps from "../resultDialogs/generateTimeStamps";
import GenerateSummary from "../resultDialogs/generateVideoSummary";
import GenerateSEOTitles from "../resultDialogs/generateSEOTitles";
import GenerateIdeas from "../resultDialogs/generateContentIdeas";

export default function CustomNode({
  data,
  id,
}: {
  data: {
    label: string;
    type: string;
    selected: boolean;
    prompt?: string;
  };
  id: string;
}) {
  const workflowId = useSelector(
    (state: RootState) => state.workflowName.workflowId
  );
  const { data: currentTaskStatus } = useTaskStatusQuery(workflowId, id); // returns from task_status collections
  const { latestStatus } = useCurrentTaskQuery(currentTaskStatus); // returns from celery polling
  const result: any = latestStatus?.result;
  const resultType: { [key: string]: boolean } = {
    "Generate thumbnail": false,
    "Generate SEO optimized title": false,
    "Generate SEO optimized keywords": false,
    "Generate summary": false,
    "Generate timestamps": false,
    "Swap face": false,
    "Analyse my channel videos and generate ideas": false,
  };
  if (latestStatus?.actionType) resultType[latestStatus.actionType] = true;

  const isPlaceholderLabel = (label: string) => {
    return (
      label === "Select the event that you want to trigger" ||
      label === "Select the action that you want to perform"
    );
  };

  const videoSummary = `
    The golden rays of the morning sun streamed through the dense canopy of the forest, casting dappled patterns on the forest floor. A gentle breeze rustled the leaves, carrying with it the earthy aroma of moss and damp soil. Birds chirped melodiously, their songs weaving a natural symphony that blended seamlessly with the distant murmur of a babbling brook. A lone squirrel scurried across the path, pausing briefly to inspect a stray acorn before darting into the underbrush. Nearby, wildflowers in shades of purple, yellow, and white swayed gently, their vibrant colors a stark contrast to the deep green foliage. It was a scene of pure tranquility, unmarred by the chaos of the outside world, where time seemed to slow down, allowing one to soak in the beauty and serenity of nature's embrace. Amidst this idyllic setting, a sense of wonder and calm took hold, as if the forest itself were whispering secrets of a simpler, more harmonious existence.
  `;
  const rawContentIdeas = result?.content_ideas.split("\n");
  const contentIdeas = rawContentIdeas?.filter(
    (idea: string) => idea.trim() !== ""
  );

  const videoTitles = [
    "The sky was painted with hues of orange and pink as the sun set beyond the horizon.",
    "A gentle rain began to fall, creating a soothing rhythm against the windows.",
    "The library was silent except for the faint rustle of pages being turned by avid readers.",
    "Laughter echoed through the park as children chased each other around the playground.",
    "The aroma of freshly brewed coffee filled the air, inviting everyone to take a moment to relax.",
  ];

  const thumbnailUrls: string[] = [];
  thumbnailUrls.push(result?.url);
  thumbnailUrls.push(result?.url);
  thumbnailUrls.push(result?.url);
  thumbnailUrls.push(result?.url);
  thumbnailUrls.push(result?.url);
  console.log(thumbnailUrls);

  const timeStamps = [
    { "00:00": "Introduction and opening scene." },
    { "01:15": "Explanation of the main topic." },
    { "03:45": "Demonstration of the first example." },
    { "07:30": "Detailed discussion and analysis." },
    { "12:00": "Conclusion and final thoughts." },
  ];

  const getIconForLabel = (label: string) => {
    const iconProps = { className: "w-4 h-4 text-gray-600" };

    // Trigger types
    switch (label) {
      // Triggers
      case "Plan a video":
        return <FaVideo {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate Content Ideas":
        return (
          <FaLightbulb {...iconProps} className="w-4 h-4 text-yellow-500" />
        );
      case "When a video is uploaded":
        return (
          <RiVideoUploadLine
            {...iconProps}
            className="w-4 h-4 text-green-500"
          />
        );

      // Actions
      case "Generate thumbnail":
        return (
          <BiSolidImage {...iconProps} className="w-4 h-4 text-purple-500" />
        );
      case "Generate captions":
        return <BiCaptions {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate SEO optimized title":
      case "Generate SEO optimized keywords":
        return <FaSearch {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "Generate summary":
        return (
          <MdSummarize {...iconProps} className="w-4 h-4 text-green-500" />
        );
      case "Generate timestamps":
        return <FaClock {...iconProps} className="w-4 h-4 text-red-500" />;
      case "Swap face":
        return <MdFace {...iconProps} className="w-4 h-4 text-orange-500" />;
      case "Analyse my channel videos and generate ideas":
        return (
          <FaLightbulb {...iconProps} className="w-4 h-4 text-yellow-500" />
        );
      default:
        return <MdOutlineStickyNote2 {...iconProps} />;
    }
  };

  const [isResultOpen, setIsResultOpen] = useState(false);

  return (
    <>
      <div
        className={`
          ${
            data.selected
              ? "ring-2 ring-teal-500/20 shadow-[0_0_0_1px_rgba(20,184,166,0.4)]"
              : "ring-1 ring-gray-950/5"
          }
          bg-gradient-to-b from-white via-white to-gray-50/80
          backdrop-blur-xl
          rounded-2xl w-[420px] relative
          shadow-[0_4px_20px_rgba(0,0,0,0.03)]
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          group
          transition-all duration-300 ease-out
        `}
      >
        {/* Premium glass effect header */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />

        {/* Handle for Action nodes */}
        {data.type === "Action" && (
          <Handle
            type="target"
            position={Position.Top}
            className="!w-3 !h-3 !border !border-teal-500/30 !bg-white !rounded-full
              before:content-[''] before:absolute before:w-1.5 before:h-1.5 
              before:bg-teal-500/40 before:rounded-full before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2
              hover:!border-teal-500/50 hover:before:bg-teal-500/60
              transition-all duration-200"
          />
        )}

        <div className="p-5">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`
                  flex items-center gap-2 px-3 py-1.5
                  ${
                    data.type === "Trigger"
                      ? "bg-gradient-to-br from-teal-50 to-emerald-50/50"
                      : "bg-gradient-to-br from-gray-50 to-slate-50/50"
                  }
                  rounded-lg
                  ring-1 ring-gray-950/5
                  group-hover:ring-teal-500/20
                  transition-all duration-200
                `}
              >
                {data.type !== "Trigger" ? (
                  <MdOutlineStickyNote2 className="text-teal-600/80 text-sm" />
                ) : (
                  <IoPlayCircle className="text-teal-600/80 text-sm" />
                )}
                <span
                  id={`action-placeholder-${id}`}
                  className="text-xs font-medium text-gray-600"
                >
                  {data.type}
                </span>
              </div>
            </div>

            {/* Status Indicators - Without execution time */}
            <div className="flex items-center gap-2">
              {id === "1" &&
                currentTaskStatus?.status === "Yet to be processed" && (
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                  bg-gradient-to-r from-gray-50 to-slate-50/50 text-gray-600
                  ring-1 ring-gray-950/5 group-hover:ring-teal-500/20
                  transition-all duration-200"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Yet to be triggered</span>
                  </div>
                )}
              {id !== "1" &&
                (currentTaskStatus?.status === "PENDING" ||
                latestStatus?.status === "PENDING" ? (
                  <BeatLoader loading={true} size={6} color="#069494" />
                ) : (
                  <>
                    <div
                      className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                      ${
                        result
                          ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/30"
                          : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 ring-1 ring-amber-500/20 group-hover:ring-amber-500/30"
                      }
                      transition-all duration-200`}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {result ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        )}
                      </svg>
                      <span>{result ? "Complete" : "Yet to be processed"}</span>
                    </div>
                    {result && (
                      <div
                        onClick={() => setIsResultOpen(true)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                          bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600
                          ring-1 ring-amber-500/20 group-hover:ring-amber-500/30
                          transition-all duration-200 cursor-pointer hover:shadow-sm"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>Result</span>
                      </div>
                    )}
                  </>
                ))}

              {/* Delete Button */}
              <button
                className={`
                  p-2.5 rounded-xl transition-all duration-200
                  ${
                    id === "1" || id === "2"
                      ? "opacity-50 cursor-not-allowed hover:bg-transparent"
                      : "hover:bg-red-50/80 group/delete"
                  }
                `}
                title={
                  id === "1" || id === "2"
                    ? "Cannot delete default tasks"
                    : "Delete task"
                }
              >
                <RiDeleteBin6Line
                  size={16}
                  className={`
                    text-gray-400 transition-all duration-200
                    ${
                      id !== "1" &&
                      id !== "2" &&
                      "group-hover/delete:text-red-500 group-hover/delete:rotate-12"
                    }
                  `}
                />
              </button>
            </div>
          </div>

          {/* Separator with gradient */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/60 to-transparent my-4" />

          {/* Content Section */}
          <div className="px-1">
            {isPlaceholderLabel(data.label) ? (
              <span className="text-sm text-gray-400 italic flex items-center gap-2.5 px-2">
                <MdOutlineStickyNote2 className="text-gray-300" />
                Select an action
              </span>
            ) : (
              <div
                className={`
                flex items-center gap-3
                bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80
                ring-1 ring-gray-950/5 group-hover:ring-teal-500/20
                w-fit py-2.5 px-4 rounded-xl
                group-hover:shadow-lg group-hover:shadow-teal-500/5
                transition-all duration-200
              `}
              >
                <div
                  className={`
                  p-2 rounded-lg
                  ${data.type === "Trigger" ? "bg-teal-50/80" : "bg-gray-50/80"}
                  transition-colors duration-200
                `}
                >
                  {getIconForLabel(data.label)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {data.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Handle */}
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !border !border-teal-500/30 !bg-white !rounded-full
            hover:!border-teal-500/50
            transition-colors duration-200"
        />

        {/* Result Dialog */}
        {resultType["Generate thumbnail"] && (
          <GenerateThumbnail
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            thumbnailUrls={thumbnailUrls}
          />
        )}
        {resultType["Generate SEO optimized title"] && (
          <GenerateSEOTitles
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            videoTitles={videoTitles}
          />
        )}
        {/* {resultType["Generate SEO optimized keywords"] && (
          <GenerateKeywords   
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            result={result}
          />
        )} */}
        {resultType["Generate summary"] && (
          <GenerateSummary
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            videoSummary={videoSummary}
          />
        )}
        {resultType["Generate timestamps"] && (
          <GenerateTimeStamps
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            timeStamps={timeStamps}
          />
        )}
        {resultType["Analyse my channel videos and generate ideas"] && (
          <GenerateIdeas
            isResultOpen={isResultOpen}
            setIsResultOpen={setIsResultOpen}
            contentIdeas={contentIdeas}
          />
        )}
      </div>
    </>
  );
}
