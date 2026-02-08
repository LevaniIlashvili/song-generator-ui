interface ToolbarProps {
  region: string;
  setRegion: (val: string) => void;
  seed: bigint;
  setSeed: (val: bigint) => void;
  avgLikes: number;
  setAvgLikes: (val: number) => void;
  viewMode: "table" | "gallery";
  setViewMode: (val: "table" | "gallery") => void;
  onRandomize: () => void;
}

export const Toolbar = ({
  region,
  setRegion,
  seed,
  setSeed,
  avgLikes,
  setAvgLikes,
  viewMode,
  setViewMode,
  onRandomize,
}: ToolbarProps) => (
  <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
    <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6">
      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase text-gray-500 mb-1">
          Region
        </label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="en">🇺🇸 English (USA)</option>
          <option value="es">🇪🇸 Spanish (ES)</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase text-gray-500 mb-1">
          Seed
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-2 py-1 w-48 outline-none font-mono text-sm"
            value={seed.toString()}
            onChange={(e) => {
              try {
                setSeed(BigInt(e.target.value || "0"));
              } catch (e) {}
            }}
          />
          <button
            onClick={onRandomize}
            className="bg-gray-100 hover:bg-gray-200 p-1 rounded-md transition"
          >
            🔀
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-50">
        <div className="flex justify-between">
          <label className="text-xs font-bold uppercase text-gray-500 mb-1">
            Avg Likes
          </label>
          <span className="text-xs font-mono font-bold text-indigo-600">
            {avgLikes}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          value={avgLikes}
          onChange={(e) => setAvgLikes(Number(e.target.value))}
        />
      </div>

      <div className="flex bg-gray-100 p-1 rounded-lg">
        {(["table", "gallery"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-1 rounded-md text-sm font-medium capitalize transition ${
              viewMode === mode
                ? "bg-white shadow-sm text-indigo-600"
                : "text-gray-500"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  </header>
);
