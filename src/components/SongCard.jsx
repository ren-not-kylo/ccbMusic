import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";


const SongCard = ({song, isPlaying, activeSong, data, i}) => {
  /*
  const activeSong = {
    "id": "332666166",
    "type": "songs",
    "href": "/v1/catalog/dz/songs/332666166?l=en-GB",
    "attributes": {
        "albumName": "Self Control",
        "hasTimeSyncedLyrics": true,
        "genreNames": [
            "Pop",
            "Music",
            "Pop/Rock"
        ],
        "trackNumber": 2,
        "releaseDate": "1984-01-01",
        "durationInMillis": 246440,
        "isVocalAttenuationAllowed": true,
        "isMasteredForItunes": false,
        "isrc": "USAT20903047",
        "artwork": {
            "width": 1425,
            "url": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3f/28/ad/3f28ad3c-3dc9-7c5b-32f0-5b33eb647bf7/mzi.bnuysrxb.jpg/440x440bb.jpg",
            "height": 1425,
            "textColor3": "ae978b",
            "textColor2": "d78a6b",
            "textColor4": "af7259",
            "textColor1": "d5b8a9",
            "bgColor": "121315",
            "hasP3": false
        },
        "audioLocale": "en-US",
        "composerName": "Giancarlo Bigazzi & Raffaele Riefoli",
        "url": "https://music.apple.com/dz/album/self-control/332665999?i=332666166",
        "playParams": {
            "id": "332666166",
            "kind": "song"
        },
        "discNumber": 1,
        "isAppleDigitalMaster": false,
        "hasLyrics": true,
        "audioTraits": [
            "lossless",
            "lossy-stereo"
        ],
        "name": "Self Control",
        "previews": [
            {
                "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/21/c5/80/21c580eb-d103-0782-cde1-b79200be80a3/mzaf_7328695093783524474.plus.aac.p.m4a"
            }
        ],
        "artistName": "Laura Branigan"
    },
    "relationships": {
        "music-videos": {
            "href": "/v1/catalog/dz/songs/332666166/music-videos?l=en-GB",
            "data": []
        },
        "artists": {
            "href": "/v1/catalog/dz/songs/332666166/artists?l=en-GB",
            "data": [
                {
                    "id": "555271",
                    "type": "artists",
                    "href": "/v1/catalog/dz/artists/555271?l=en-GB"
                }
            ]
        }
    },
    "meta": {
        "contentVersion": {
            "RTCI": 1735690068033,
            "MZ_INDEXER": 1732267671598
        }
    }
  };
  */
const dispatch = useDispatch();
const activeSongA = useSelector((state) => state.player.activeSong);

const handlePauseClick = () => {
  dispatch(playPause(false));
};

const handlePlayClick = () => {
  dispatch(setActiveSong({song, data, i}));
  dispatch(playPause(true));
};

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 
    bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center
          bg-black bg-opacity-50 
          group-hover:flex ${activeSong?.attributes?.name === song.attributes?.name ?  'flex bg-black bg-opacity-70' : 'hidden'}`}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
        </div>
        <img alt='song_img' src={song.attributes.artwork.url} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`songs/${song.key}`}>
            {song.attributes?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt1">
          <Link to={song.artists ? `/artists/${song.relationships.artists.href}` 
            : '/top-artists'}>
            {song.attributes.artistName}
          </Link>
        </p>
      </div>
    </div>
  )
};

export default SongCard;
