

const DetailPageSkeleton = () => {
  return (
<div className="flex justify-center min-h-screen">
  <div className="flex flex-col gap-6 p-8  rounded-lg  w-[90%] max-w-xl">
    <div className="flex gap-6 ">
      <div className="skeleton w-20 h-20 rounded-full shrink-0"></div>
      <div className="flex flex-col gap-3">
        <div className="skeleton h-4 w-32 rounded-full"></div>
        <div className="skeleton h-4 w-48 rounded-full"></div>
      </div>
    </div>
    <div className="skeleton h-60 w-full rounded-lg"></div>
  </div>
</div>


  )
}

export default DetailPageSkeleton