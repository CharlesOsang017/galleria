import React from 'react'

const ProfileSkeleton = () => {
  return (
<div className="container mx-auto max-w-lg p-6 shadow-lg  rounded-lg mt-8">
  <div className="flex flex-col items-center gap-8 p-12  w-[95%] max-w-2xl">
    {/* Larger Circular Image Skeleton */}
    <div className="skeleton w-40 h-40 rounded-full"></div>

    {/* Larger Image Content Skeletons */}
    <div className="flex flex-col gap-4 items-center">
      <div className="skeleton h-6 w-48 rounded-full"></div>
      <div className="skeleton h-4 w-64 rounded-full"></div>
      <div className="skeleton h-4 w-48 rounded-full"></div>
      <div className="skeleton h-4 w-64 rounded-full"></div>
      <div className="skeleton h-4 w-48 rounded-full"></div>      
    </div>
  </div>
</div>


  )
}

export default ProfileSkeleton