import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchApiData } from "../../utils/Api.js";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(null);
  const { query } = useParams();
  const initialData = () => {
    setLoading(true);
    fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  }

  const fetchDataFromNextPage = () => {
    fetchApiData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if(data?.results){
        setData({...data, results:[...data?.results, ...res.results]});
      }
      else{
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  }
  
  useEffect(() => {
    setPageNum(1);
    initialData();
    console.log(data);
  }, [query]);
  return (
    <div className="searchResultsPage">
      {loading ? <Spinner initial={true} /> 
      : <ContentWrapper>
        {data?.results?.length > 0 ? 
          <>
            <div className="pageTitle">
              {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
            </div>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchDataFromNextPage}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}>
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                    />
                  );
              })}

              </InfiniteScroll>
          </> 
        : <span className="resultNotFound">
          Sorry, Results not found!
        </span>}
      </ContentWrapper>
      }
    </div>
  )
}

export default SearchResult