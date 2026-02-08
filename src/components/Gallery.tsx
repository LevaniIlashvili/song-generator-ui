import InfiniteScroll from "react-infinite-scroll-component";

export const Gallery = ({
  songs,
  next,
  apiUrl,
}: {
  songs: any[];
  next: () => void;
  apiUrl: string;
}) => (
  <InfiniteScroll
    dataLength={songs.length}
    next={next}
    hasMore={true}
    loader={
      <p className="text-center py-10 font-medium text-gray-400">
        Loading more tracks...
      </p>
    }
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {songs.map((song) => (
        <div
          key={song.index}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
        >
          <img
            src={`${apiUrl}${song.coverUrl}`}
            className="w-full aspect-square object-cover"
            alt={`${song.title} cover`}
          />

          <div className="p-4">
            <div className="flex justify-between items-start mb-1">
              <h3
                className="font-bold text-lg leading-tight truncate mr-2"
                title={song.title}
              >
                {song.title}
              </h3>
              <span className="text-xs font-mono text-gray-400">
                #{song.index}
              </span>
            </div>

            <p className="text-indigo-600 font-medium text-sm truncate">
              {song.artist}
            </p>

            <p className="text-gray-500 text-xs italic mb-3 truncate">
              {song.album === "Single" ? "Single" : `Album: ${song.album}`}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pt-2 border-t border-gray-50">
              <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                {song.genre}
              </span>
              <span className="flex items-center gap-1 font-semibold">
                ❤️ {song.likes}
              </span>
            </div>

            <audio
              controls
              className="w-full h-8 scale-90 origin-left opacity-80 hover:opacity-100 transition"
            >
              <source src={`${apiUrl}${song.audioUrl}`} type="audio/wav" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  </InfiniteScroll>
);
