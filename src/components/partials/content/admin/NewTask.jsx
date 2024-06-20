import React from 'react';
import { useForm } from 'react-hook-form';
import { encode, decode } from 'he';

const NewTask = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = async (data) => {
		// setLoading(true);
		encode(data);
		console.log(data)
		// try {
		// 	await fetchCsrfToken()
		// 	const csrfToken = Cookies.get('XSRF_TOKEN'); // Retrieve CSRF token from the cookie
		// 	const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data, {
		// 		headers: {
		// 			'X-CSRF-Token': csrfToken, // Include CSRF token in headers
		// 		},
		// 		withCredentials: true,
		// 	});
		// 	setFormResponse({ status: response.data.status, message: response.data.message });

		// } catch (error) {
		// 	let errorMessage = 'There was a problem with your registration: Please try again.';

		// 	// Check if the error response exists and extract the server message
		// 	if (error.response && error.response.data && error.response.data.message) {
		// 		errorMessage = error.response.data.message;
		// 	}

		// 	setFormResponse({ status: error.response.data.status, message: errorMessage });
		// 	console.error(error.response.data.status, errorMessage);
		// } finally {
		// 	setLoading(false);
		// }
	};
	
	return (
		<div className="container mt-5 overflow-scroll">
			<div className="card bg-dark text-light">
				<h2 className="card-header">Create New Task</h2>
				<div className="card-body">
					<form onSubmit={handleSubmit(onSubmit)}>

						<div className="form-group mt-2">
							<label htmlFor="title">Title</label>
							<input type="text" id="title" {...register('title', { required: true })} className="mt-3 form-control bg-dark text-light" />
							{errors.title && <span className="text-danger">Title is required.</span>}
						</div>

						<div className="form-group mt-4">
							<label htmlFor="description">Description</label>
							<textarea id="description" {...register('description', { required: true })} className="mt-3 form-control bg-dark text-light" rows="4"></textarea>
							{errors.description && <span className="text-danger">Description is required.</span>}
						</div>
						<div className="form-group mt-4">
							<label htmlFor="challenge">Challenge</label>
							<textarea id="challenge" {...register('challenge', { required: true })} className="mt-3 form-control bg-dark text-light" rows="4"></textarea>
							{errors.challenge && <span className="text-danger">Challenge is required.</span>}
						</div>
						<div className="form-group mt-4">
							<label htmlFor="challenge_answer">Challenge Answer</label>
							<textarea id="challenge_answer" {...register('challenge_answer', { required: true })} className="mt-3 form-control bg-dark text-light" rows="4"></textarea>
							{errors.challenge_answer && <span className="text-danger">Challenge Answer is required.</span>}
						</div>
						<div className="form-group mt-4">
							<label htmlFor="languages">Languages</label>
							<select id="languages" {...register('languages', { required: true })} className="mt-3 form-control bg-dark text-light">
								<option value="">Select Language</option>
								<option value="javascript">JavaScript</option>
								<option value="python">Python</option>
								<option value="java">Java</option>
								<option value="ruby">Ruby</option>
								{/* Add more options as needed */}
							</select>
							{errors.languages && <span className="text-danger">Please select a language.</span>}
						</div>
						<div className="form-group mt-4">
							<label htmlFor="level">Level</label>
							<select id="level" {...register('level', { required: true })} className="mt-3 form-control bg-dark text-light">
								<option value="">Select Level</option>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
								{/* Add more options as needed */}
							</select>
							{errors.level && <span className="text-danger">Please select a level.</span>}
						</div>
						<button type="submit" className="btn btn-primary mt-4">Create Task</button>
					</form>
				</div>
			</div>
		</div>
	);
};
export default NewTask;
