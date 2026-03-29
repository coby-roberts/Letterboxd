import { useQuery } from '@tanstack/react-query'
import {fetchTrending } from "../service/fetchTrending"

export const useTrendingQuery = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 30,
  });
};
