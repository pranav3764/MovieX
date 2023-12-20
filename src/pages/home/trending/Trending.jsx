import React, {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "./style.scss";
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

function Trending() {
    const [endPoint, setEndPoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endPoint}`);
    const onTabChange = (tab, index) => {
        setEndPoint(tab.toLowerCase());
    }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <span className="carousel-title">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} mediaType={endPoint}/>
    </div>
  )
}

export default Trending