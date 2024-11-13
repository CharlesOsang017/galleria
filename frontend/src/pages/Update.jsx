import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        category: ""
      })

    const {data: detailPost, isPending} = useQuery({queryKey: ['detailPost']})
    const {mutate: updatePost, isLoading: isUpdatingPost} = useMutation({
        mutationFn: async()=>{
          try {
            const res = await fetch(`/api/post/update/${detailPost._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
            const data = await res.json()
          if(!res.ok){
            throw new Error(data.message || 'errorr updating')
          }
          return data;
          } catch (error) {
            throw new Error(error.message)
          }
        },
        onSuccess: ()=>{
          toast.success('post updated')
          queryClient.invalidateQueries({queryKey: ['detailPPost']})
          navigate(`/detail/${detailPost._id}`)
        },
        onError: (error)=>{
          toast.error(error.message)
        }
      })
  
    const handleImgChange = (e) => {
        const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFormData({image: reader.result})
                    // setImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
      };
    
      const handleClearImage = () => {
        setFormData({image:null})
      };
    
      const handleSubmit = (e, title, image, description, category) => {
        e.preventDefault();
        // Handle form submission logic here
        updatePost({title, image, description, category,})
      };

      useEffect(()=>{
        if(detailPost){
            setFormData({
                title: detailPost.title,
                image: detailPost.image,
                description: detailPost.description,
                category: detailPost.category
            })
        }
      },[])
  return (
    <div className="container mx-auto max-w-lg p-6 shadow-lg bg-white rounded-lg mt-8">
    <h1 className="text-2xl font-bold mb-4 flex justify-center">Update Gallery</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        name='title'
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="input border border-gray-700 rounded p-2"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImgChange}
        className="border border-gray-700 rounded p-2"
        required
      />
      {formData.image && (
        <div className="relative">
          <X className="absolute top-2 right-2 cursor-pointer" onClick={handleClearImage} />
          <img src={formData.image} alt="Preview" className="mt-2 rounded-md" />
        </div>
      )}
      <textarea
        placeholder="Description"
        value={formData.description}
        name='description'
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className="input border border-gray-700 rounded p-2"
        required
      />
      <select
        value={formData.category}
        name="category"
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        className="input border border-gray-700 rounded p-2"
        required
      >
        <option value="" disabled>Select Category</option>
        <option value="Nature">Nature</option>
        <option value="Art">Art</option>
        <option value="Technology">Technology</option>
        <option value="Architecture">Architecture</option>
        <option value="People">People</option>
        {/* Add more categories as needed */}
      </select>
      <button type="submit" className="btn btn-primary rounded-full mt-4 text-white">
        Update
      </button>
    </form>
  </div>
  )
}

export default Update