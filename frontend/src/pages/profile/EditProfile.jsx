import { X } from "lucide-react";

const EditProfile = () => {
	return (
		<>
			<button
				className='btn btn-outline rounded-full btn-sm'
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id='edit_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md relative'>
					{/* Close Button */}
					<button className='absolute top-3 right-3 outline-none' onClick={() => document.getElementById("edit_profile_modal").close()}>
						<X />
					</button>

					<h3 className='font-bold text-lg my-3 flex justify-center'>Update Profile</h3>
					<form className='flex flex-col gap-4'>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Full Name'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
							<input
								type='text'
								placeholder='Username'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='email'
								placeholder='Email'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
							<textarea
								placeholder='Location'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Skill/Profession'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
						
						</div>
						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='About'
								className='flex-1 input border border-gray-700 rounded p-2 input-md'
							/>
						
						</div>
                     
						<button className='btn  btn-neutral 
 rounded-md text-white'>update</button>
					</form>
				</div>
			</dialog>
		</>
	);
};

export default EditProfile;
