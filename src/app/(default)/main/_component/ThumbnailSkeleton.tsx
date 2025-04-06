export default function ThumbnailSkeleton() {
  return (
    <div className="w-full h-[340px] bg-gray-100 rounded-lg animate-pulse">
      <div className="h-[40px] w-[200px] bg-gray-200 rounded mb-4" />
      <div className="grid grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-[180px] bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
