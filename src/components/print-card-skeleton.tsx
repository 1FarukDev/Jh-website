function PrintCardSkeleton() {
    return (
      <div className="w-full overflow-hidden">
        {/* Image area */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.6s_infinite]" 
               style={{ backgroundSize: '600px 100%' }} 
          />
        </div>
  
        {/* Info panel — mirrors the hover overlay */}
        <div className="bg-white/90 p-4 mt-0">
          {/* Label */}
          <div className="h-3 w-2/5 bg-gray-200 rounded animate-pulse mb-3" />
          {/* Title + Price row */}
          <div className="flex justify-between items-center gap-3">
            <div className="h-4 w-3/5 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

export default PrintCardSkeleton;