import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

function Cast({ data, loading }) {
  const {url} = useSelector((state) => state.home);
  const skeleton = () => {
    return (
        <div className="skItem">
            <div className="circle skeleton"></div>
            <div className="row skeleton"></div>
            <div className="row2 skeleton"></div>
        </div>
    );
  };
  return (
    <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((cast, i) => {
                          return(
                            <div key={cast.id} className="listItem">
                              <div className="profileImg">
                                <Img src={cast?.profile_path ? url?.images?.secure_base_url + 'original' + cast?.profile_path : avatar} />
                              </div>
                              <div className="name">{cast.original_name}</div>
                              <div className="character">{cast.character}</div>
                            </div>
                          )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
  )
}

export default Cast