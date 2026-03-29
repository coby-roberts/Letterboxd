import Carousel from '../../Carousel/Carousel';
import { useTrendingQuery } from "../../../hooks/useTrendingQuery";

function Trending() {
  const { data, isLoading, isError, error } = useTrendingQuery();

  if (isError) return <p>Failed to load trneding... {error?.message}</p>
  
  return <Carousel title="Trending" data={data?.results} isLoading={isLoading} />
}

export default Trending;