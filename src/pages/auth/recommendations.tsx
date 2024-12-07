import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import box from "@/assets/box.svg";
import Score from "@/components/Score";
import { buildQuery } from "@/utils/util";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Modal from "@/components/Modal";
import Details from "./details";
import cloud from "@/assets/cloud.svg";
import aws from "@/assets/aws.svg";
import azure from "@/assets/azure.svg";
import bin from "@/assets/bin.svg";
import { useNavigate } from "react-router";

const useFetchRecommendations = (limit: string, search?: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["recommendations", limit, search],
    queryFn: async ({ pageParam = "" }) => {
      const query = buildQuery({
        cursor: pageParam,
        limit,
        search: search,
      });
      const response = await api.get(`/recommendations?${query}`);
      return response.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.cursor.next ?? undefined,
    initialPageParam: "",
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export default function Recommendations() {
  const limit = "10";
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const searchTerm = useDebounce(search);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useFetchRecommendations(limit, searchTerm);

  const recommendations = data?.pages.flatMap((page) => page.data) || [];
  const total = data?.pages?.[0].pagination.totalItems;

  useEffect(() => {
    function handleScrollEvent() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          hasNextPage ||
          !isFetchingNextPage ||
          recommendations.length !== total
        ) {
          fetchNextPage();
        }
      }
    }

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    recommendations.length,
    total,
  ]);

  if (isLoading) return <Spinner />;

  const toDisplay = recommendations.find(
    (item) => item.recommendationId === id
  );

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <p className="font-semibold text-xl sm:text-2xl">Recommendations</p>
        <span
          className="text-xs flex items-center gap-1 cursor-pointer"
          role="button"
          onClick={() => navigate("/archived")}
        >
          <img src={bin} alt="bin" className="w-4 h-4" />
          Archive
        </span>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Input
            type="search"
            id="search"
            name="search"
            value={search}
            placeholder="Search"
            customClass="w-full sm:w-[300px] h-8 mt-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <span className="border border-slate-300 rounded px-4 py-1 text-sm cursor-pointer">
            Filter
          </span>
        </div>
        {recommendations.length > 0 && (
          <span className="text-sm text-slate-400">
            Showing {hasNextPage ? recommendations.length : total} of {total}
          </span>
        )}
      </div>

      {recommendations.length > 0 ? (
        recommendations.map(
          (datum: (typeof recommendations)[number], index: number) => (
            <div
              key={`${datum.recommendationId}-${index}`}
              role="button"
              tabIndex={1}
              className="bg-white rounded-lg border border-slate-200 my-4 flex flex-wrap cursor-pointer hover:shadow-md"
              onClick={() => {
                setId(datum.recommendationId);
                setShowModal(true);
              }}
            >
              <div className="bg-primary p-8 rounded-tl-lg rounded-bl-lg flex items-center justify-center">
                <img src={box} alt="box" className="w-10 h-10" />
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
                      <span className="text-xs text-zinc-700">
                        {frame.name}
                      </span>
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
          )
        )
      ) : (
        <p>No recommendations available.</p>
      )}

      <Modal isShown={showModal}>
        <Details
          onClose={() => setShowModal(false)}
          recommendation={toDisplay}
          fromArchive={false}
        />
      </Modal>
    </>
  );
}

