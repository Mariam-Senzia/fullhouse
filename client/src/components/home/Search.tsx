import { FaMagnifyingGlass } from "react-icons/fa6";
import useStore from "../../store/useStore";
import { useState } from "react";

const Search = () => {
  const { events } = useStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = events.filter(
    (event) =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase()) ||
      event.category?.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {isOpen && query && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => {
            setIsOpen(false);
            setQuery("");
          }}
        ></div>
      )}

      <div className="hidden md:w-45 lg:w-100 md:flex items-center relative transition-all duration-300">
        <FaMagnifyingGlass className="text-gray-500 text-md absolute top-3 left-5" />
        <input
          type="text"
          placeholder="Search events"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:shadow-md hover:shadow-md"
        />

        {isOpen && query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50">
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-gray-400">
                No events found for "{query}"
              </p>
            ) : (
              results.map((event) => (
                <a
                  key={event.id}
                  href={`/eventDetails/${event.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#cc4324] transition-colors">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {event.date} · {event.location}
                    </p>
                    <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm">
                      {event.category?.name}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
