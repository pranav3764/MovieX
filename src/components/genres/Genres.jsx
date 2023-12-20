import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

function Genres({ data }) {
    const {genres} = useSelector((state) => state.home);
  return (
    <div className='genres'>
        {data?.map((id) => {
            if(!genres[id]){return; }
            return(
                <div key={id} className="genre">
                    {genres[id]}
                </div>
            )
        })}
    </div>
  )
}

export default Genres