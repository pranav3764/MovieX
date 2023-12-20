import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

function Carousel({ data, loading, mediaType, title }) {
    const navigate = useNavigate();
    const carouselConatiner = useRef();
    const {url} = useSelector((state) => state.home);
    const navigation = (dir) => {
        const carousel = carouselConatiner.current;
        if(dir === 'left'){
            carousel.scrollTo({
                left: carousel.scrollLeft - carousel.offsetWidth - 20,
                behavior: "smooth",
            });
        }
        else{
            carousel.scrollTo({
                left: carousel.scrollLeft + carousel.offsetWidth + 20,
                behavior: "smooth",
            });
        }
    }
    const skeletonItem = () => {
        return(<div className="skeleton-item">
            <div className="poster-block skeleton">

            </div>
            <div className="text-block">
                <div className="name skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>)
    }
  return (
    <div className='carousel'>
        {title && <div className="carousel-title">{title}</div>}
        <ContentWrapper>
            <BsFillArrowLeftCircleFill className="carousel-left arrow" onClick={() => navigation('left')} />
            <BsFillArrowRightCircleFill className="carousel-right arrow" onClick={() => navigation('right')} />
            {!loading ? 
                <div className="carousel-items" ref={carouselConatiner}>
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? url?.images?.secure_base_url + 'original' + item.poster_path : PosterFallback;
                        return(
                            <div key={item.id} className="carousel-item" onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}>
                                <div className='poster-block'>
                                    <Img src={posterUrl}/>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                    <Genres data={item.genre_ids.slice(0,2)}/>
                                </div>  
                                <div className="text-block">
                                    <div className="name">
                                        {item.title ? item.title : item.name}    
                                    </div>    
                                    <div className="date">
                                        {dayjs(item.release_date).format("D MMM, YYYY")}
                                    </div>
                                </div>      
                            </div>
                        )
                    })}
                </div>
            : 
                <div className="loading">
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                    {skeletonItem()}
                </div>
            }
        </ContentWrapper>
    </div>
  )
}

export default Carousel