import React from 'react'
import Item from './Item'
import { useQuery } from '@tanstack/react-query'
import ItemsSkeleton from '../components/skeleton/ItemsSkeleton'

const Items = () => {
  const {data: posts, isLoading} = useQuery({
    queryKey: ['posts'],
    queryFn: async()=>{
      try {
        const res = await fetch('/api/post/all')
        const data = await res.json()
        if(!res.ok){
          throw new Error(data.message || 'error in getting posts')
        }
        return data;
      } catch (error) {
        throw new Error(error.message)
      }
    }
  })
  return (
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 gap-4 pt-8">
  {isLoading && (
     <>
     <ItemsSkeleton />
     <ItemsSkeleton />
     <ItemsSkeleton />
     </>
  
  )}
   {posts?.map((post)=>(
    <Item post={post} key={post?._id}/>
   ))}

</div>

  )
}

export default Items