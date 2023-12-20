import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendations from './carousels/Recommendations';

function Detials() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  console.log(data);
  return (
    <div>
      <DetailsBanner videos={data?.results[2]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations id={id} mediaType={mediaType} />
    </div>
  )
}

export default Detials