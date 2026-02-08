import axios from "axios";
import { useEffect, useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { Gallery } from "./components/Gallery";
import { Table } from "./components/Table";

const API_URL = "https://localhost:7081";

interface Song {
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  likes: number;
  coverUrl: string;
  audioUrl: string;
}

function App() {
  const [region, setRegion] = useState("en_US");
  const [seed, setSeed] = useState<bigint>(12345n);
  const [avgLikes, setAvgLikes] = useState(5.0);
  const [viewMode, setViewMode] = useState<"table" | "gallery">("table");

  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);

  const fetchSongs = async (reset = false) => {
    const targetPage = reset ? 1 : page;
    try {
      const response = await axios.get(
        `${API_URL}/api/song?region=${region}&seed=${seed}&avgLikes=${avgLikes}&page=${targetPage}`,
      );

      if (reset) {
        setSongs(response.data);
        setPage(2);
      } else {
        setSongs((prev) => [...prev, ...response.data]);
        setPage((prev) => prev + 1);
      }
    } catch (e) {
      console.error("Fetch error", e);
    }
  };

  useEffect(() => {
    fetchSongs(true);
  }, [region, seed, avgLikes, viewMode]);

  const randomizeSeed = () => {
    const high = BigInt(Math.floor(Math.random() * 0xffffffff));
    const low = BigInt(Math.floor(Math.random() * 0xffffffff));
    const seed64 = (high << 32n) | low;

    setSeed(seed64);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toolbar
        region={region}
        setRegion={setRegion}
        seed={seed}
        setSeed={setSeed}
        avgLikes={avgLikes}
        setAvgLikes={setAvgLikes}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onRandomize={randomizeSeed}
      />
      <main className="max-w-7xl mx-auto p-6">
        {viewMode === "gallery" ? (
          <Gallery
            songs={songs}
            next={() => fetchSongs(false)}
            apiUrl={API_URL}
          />
        ) : (
          <Table
            songs={songs}
            onNext={() => fetchSongs(false)}
            apiUrl={API_URL}
          />
        )}
      </main>
    </div>
  );
}

export default App;
