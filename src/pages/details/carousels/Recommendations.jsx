import React, {useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "../../home/trending/style.scss";
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

function Recommendations({ mediaType, id }) {
    const [endPoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
    const title = mediaType === 'tv' ? 'Recommended TV Shows' : 'Recommended Movies';
  return (
    <Carousel data={data?.results} loading={loading} mediaType={endPoint} title={title} />
  )
}

export default Recommendations