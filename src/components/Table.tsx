import { Fragment, useState } from "react";

export const Table = ({
  songs,
  onNext,
  apiUrl,
}: {
  songs: any[];
  onNext: () => void;
  apiUrl: string;
}) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-xs uppercase text-gray-500 font-bold">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Artist</th>
            <th className="px-6 py-4">Genre</th>
            <th className="px-6 py-4">Likes</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <Fragment key={song.index}>
              <tr
                onClick={() =>
                  setExpandedRow(expandedRow === song.index ? null : song.index)
                }
                className="border-b border-gray-100 hover:bg-indigo-50/30 cursor-pointer transition"
              >
                <td className="px-6 py-4 text-sm text-gray-400">
                  {song.index}
                </td>
                <td className="px-6 py-4 font-semibold text-indigo-900">
                  {song.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {song.artist}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {song.genre}
                </td>
                <td className="px-6 py-4 text-sm">❤️ {song.likes}</td>
              </tr>
              {expandedRow === song.index && (
                <tr className="bg-gray-50">
                  <td
                    colSpan={5}
                    className="px-10 py-6 border-b border-gray-200 animate-in fade-in duration-300"
                  >
                    <div className="flex gap-8 items-center">
                      <img
                        src={`${apiUrl}${song.coverUrl}`}
                        className="w-32 h-32 rounded-lg shadow-lg"
                        alt=""
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold">{song.title}</h4>
                        <p className="text-gray-600 mb-4">
                          {song.artist} — {song.album}
                        </p>
                        <audio controls className="w-full max-w-md">
                          <source
                            src={`${apiUrl}${song.audioUrl}`}
                            type="audio/wav"
                          />
                        </audio>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-gray-100 flex justify-center">
        <button
          onClick={onNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition"
        >
          Load Next Page
        </button>
      </div>
    </div>
  );
};
