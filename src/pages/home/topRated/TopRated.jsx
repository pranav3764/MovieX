import React, {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "./style.scss";
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

function TopRated() {
    const [endPoint, setEndPoint] = useState("movie")
    const { data, loading } = useFetch(`/${endPoint}/top_rated`);
    const onTabChange = (tab, index) => {
        setEndPoint(tab.toLowerCase());
    }
    console.log(data ? data : "")
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <span className="carousel-title">Top Rated</span>
            <SwitchTabs data={["Movie", "TV"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} mediaType={endPoint} />
    </div>
  )
}

export default TopRated