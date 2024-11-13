import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateGalleryPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const {mutate: createPost, isLoading: isCreatingPost} = useMutation({
    mutationFn: async()=>{
      try {
        const res = await fetch('/api/post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, description, category, image})
        })
        const data = await res.json()
        if(!res.ok){
          throw new Error(data.message || "error creating post")
        }
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: ()=>{
      toast.success('post created')
      queryClient.invalidateQueries({queryClient: ['posts']})
      navigate('/items')
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
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleSubmit = (e, title, image, description, category) => {
    e.preventDefault();
    // Handle form submission logic here
    createPost({title, image, description, category,})
  };

  return (
    <div className="container mx-auto max-w-lg p-6 shadow-lg bg-white rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Create Gallery</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        {image && (
          <div className="relative">
            <X className="absolute top-2 right-2 cursor-pointer" onClick={handleClearImage} />
            <img src={image} alt="Preview" className="mt-2 rounded-md" />
          </div>
        )}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input border border-gray-700 rounded p-2"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGalleryPage;
