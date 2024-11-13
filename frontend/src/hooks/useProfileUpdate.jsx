import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


const useProfileUpdate = () => {
    const queryClient = useQueryClient()
      const {mutate: updateProfile, isPending:isUpdatingProfile} = useMutation({
        mutationFn: async(formData)=>{
            try {
                const res = await fetch('/api/user/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if(!res.ok){
                    throw new Error(data.message || "error updating")
                }
                return data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: async()=>{
            toast.success('profile updated successfully')
            document.getElementById("edit_profile_modal").close()
            queryClient.invalidateQueries({queryKey: ['authUser']})
            queryClient.invalidateQueries({queryKey: ['userProfile']})
        },
        onError: async(error)=>{
            toast.error(error.message)
        }
      })
  return {updateProfile, isUpdatingProfile}
}

export default useProfileUpdate