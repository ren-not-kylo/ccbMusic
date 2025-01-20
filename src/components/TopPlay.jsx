import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from 'swiper';
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode';
import { TopCharts } from "../pages";


const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery(); //could also get isFetching n error, but we dont need em
  const divRef = useRef(null);

  const topPlays = data?.slice(0,5); //the first 5 songs in the list will be the top 5

  const TopChartCard = ({song, i}) => (
    <div className="w-full flex flex-row items-center hover:bg-[#4c4263]
    py-2 p-4 rounded-lg cursor-pointer mb-2">
      {song.attributes.name}
    </div>
  );

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex:1 xl:max-w-[500px]
    max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-rol justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="empty-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            
            <TopChartCard 
              key={song.key}
              song={song}
              i={i}/>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-rol justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper slidePerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={[FreeMode]}
                className="mt-4">
          
        </Swiper>
      </div>
    </div>
  );
  
}

export default TopPlay;
