import React, { useState } from 'react';

const CreateGalleryPage = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, image, description, category });
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
          onChange={handleImageUpload}
          className="border border-gray-700 rounded p-2"
          required
        />
        {image && <img src={image} alt="Preview" className="mt-2 rounded" />}
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
