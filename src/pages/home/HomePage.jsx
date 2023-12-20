import React from 'react'
import "./style.scss"
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

function HomePage() {
  return (
    <>
    <HeroBanner />
    <Trending />
    <Popular />
    <TopRated />
    </>
  )
}

export default HomePage