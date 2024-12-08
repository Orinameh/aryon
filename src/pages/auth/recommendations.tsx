import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { api } from "@/utils/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { buildQuery } from "@/utils/util";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Modal from "@/components/Modal";
import Details from "./details";
import bin from "@/assets/bin.svg";
import { useNavigate } from "react-router";
import Recommendation from "@/components/Recommendation";

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

  const onClick = (recommendationId: string) => {
    setId(recommendationId);
    setShowModal(true);
  };

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
            <Recommendation
            datum={datum}
            onClick={onClick}
            key={`${datum.recommendationId}-${index}`}
            fromArchive={false}
          />
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

