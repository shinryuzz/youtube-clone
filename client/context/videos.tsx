import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query";
import { getVideos } from "../api";
import { QueryKeys, Video } from "../types";
import React from "react";
import { Loader } from "@mantine/core";

const VideoContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function VideoContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);

  return (
    <VideoContext.Provider
      value={{
        videos: data,
        refetch,
      }}
    >
      {isLoading ? <Loader /> : children}
    </VideoContext.Provider>
  );
}

const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };
