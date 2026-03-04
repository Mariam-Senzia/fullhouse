const EventCardSkeleton = () => (
  <div className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100">
    <div className="relative h-64 md:h-72 bg-gray-200 animate-pulse">
      <div className="absolute top-4 left-4 bg-white rounded-sm shadow-sm overflow-hidden w-14">
        <div className="bg-gray-300 h-6 w-full" />
        <div className="px-3 py-2 space-y-1">
          <div className="h-6 bg-gray-200 rounded w-8 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-10 mx-auto" />
        </div>
      </div>
    </div>

    <div className="p-5 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-32" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-40" />
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded w-10 mb-1" />
        <div className="h-5 bg-gray-200 rounded w-20" />
      </div>
    </div>
  </div>
);

export default EventCardSkeleton;
