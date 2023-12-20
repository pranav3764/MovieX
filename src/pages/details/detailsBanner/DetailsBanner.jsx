import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import {PlayButton} from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

function DetailsBanner({ videos, crew }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { mediaType, id } = useParams();
    const {url} = useSelector((state) => state.home);
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const date = data?.first_air_date ? data?.first_air_date : data?.release_date;
    const genres = data?.genres?.map((genre) => genre.id);
    const toHoursAndMinutes = (time) => {
        var hours = time / 60;
        var minutes = time % 60;
        return `${Math.floor(hours)}hr ${minutes}min`;
    }
    const playTrailer = () => {
        setShow(true);
        setVideoId(videos.key);
    }
    const director = crew?.filter((f) => f?.job === 'Director');
    const writer = crew?.filter((f) => f?.job === 'Screenplay' || f?.job === 'Writer' || f?.job === 'Story');

  return (
    <div className="details-banner">
        {!loading ? (
            <>
                {!!data && (
                    <React.Fragment>
                        <div>
                            <div className="backdrop-img">
                                <Img src={url?.images?.secure_base_url + 'original' + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {!data.poster_path ? (
                                            <Img className='poster-img'src={PosterFallback} />
                                        ) 
                                        : (
                                            <Img className="poster-img" src={url?.images?.secure_base_url + 'original' + data.poster_path} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {!data.title ? data.name + ' (' + (dayjs(date).format('YYYY')) + ')' : data.title + ' (' + (dayjs(date).format('YYYY')) + ')'}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={genres}/>
                                        <div className="row">
                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => playTrailer()}>
                                                <PlayButton />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="info-item">
                                                    <span className="text bold">Status:</span>
                                                    <span className="text">{data?.status}</span>
                                                </div>
                                                
                                            )}
                                            {date && (
                                                <div className="info-item">
                                                    <span className="text bold">Release Date:</span>
                                                    <span className="text">{dayjs(date).format('MMM D, YYYY')}</span>
                                                </div>
                                                
                                            )}
                                            {data.runtime && (
                                                <div className="info-item">
                                                    <span className="text bold">Duration:</span>
                                                    <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                </div>
                                                
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Director:</span>
                                                <span className="text">{director.map((d, i) => {
                                                    return(
                                                        <span key={i}>{d.name}{director.length - 1 !== i ? ', ' : ""}</span>
                                                    )
                                                })}</span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Writer:</span>
                                                <span className="text">{writer.map((w, i) => {
                                                    return(
                                                        <span key={i}>{w.name}{writer.length - 1 !== i ? ', ' : ""}</span>
                                                    )
                                                })}</span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Created By:</span>
                                                <span className="text">{data.created_by.map((cb, i) => {
                                                    return(
                                                        <span key={i}>{cb.name}{data.created_by.length - 1 !== i ? ', ' : ""}</span>
                                                    )
                                                })}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup show={show} videoId={videoId} setShow={setShow} setVideoId={setVideoId} />
                            </ContentWrapper>
                        </div>
                    </React.Fragment>
                )}
            </>
        ) : (
            <div className="detailsBannerSkeleton">
                <ContentWrapper>
                    <div className="left skeleton"></div>
                    <div className="right">
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                    </div>
                </ContentWrapper>
                </div>
        )}
    </div>
  )
}

export default DetailsBanner