import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  return (
    <>
      <div className="hidden md:w-45 lg:w-100 md:flex items-center relative transition-all duration-300">
        <FaMagnifyingGlass className="text-gray-500 text-md absolute top-3 left-5" />
        <input
          type="text"
          placeholder="Search events"
          className="w-full py-2 pl-12 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-md hover:shadow-md"
        />
      </div>
    </>
  );
};

export default Search;
