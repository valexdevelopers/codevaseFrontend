import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import he from 'he';

const NewTaske = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        // Encode HTML entities in form data
        const encodedData = {
            title: he.encode(data.title),
            description: he.encode(data.description),
            challenge: he.encode(data.challenge),
            challenge_answer: he.encode(data.challenge_answer),
            languages: he.encode(data.languages),
            level: he.encode(data.level)
        };
        console.log(encodedData);

        // try {
        //     // Make Axios call to insert data
        //     const response = await axios.post('your-api-endpoint', encodedData);
        //     console.log('Server response:', response.data);
        //     // Reset form after successful submission
        //     reset();
        // } catch (error) {
        //     console.error('Error submitting data:', error);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-light">
                <h2 className="card-header">Create New Task</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" {...register('title', { required: true })} className="form-control bg-dark text-light" />
                            {errors.title && <span className="text-danger">Title is required.</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" {...register('description', { required: true })} className="form-control bg-dark text-light" rows="4"></textarea>
                            {errors.description && <span className="text-danger">Description is required.</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="challenge">Challenge</label>
                            <textarea id="challenge" {...register('challenge', { required: true })} className="form-control bg-dark text-light" rows="4"></textarea>
                            {errors.challenge && <span className="text-danger">Challenge is required.</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="challenge_answer">Challenge Answer</label>
                            <textarea id="challenge_answer" {...register('challenge_answer', { required: true })} className="form-control bg-dark text-light" rows="4"></textarea>
                            {errors.challenge_answer && <span className="text-danger">Challenge Answer is required.</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="languages">Languages</label>
                            <select id="languages" {...register('languages', { required: true })} className="form-control bg-dark text-light">
                                <option value="">Select Language</option>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="ruby">Ruby</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.languages && <span className="text-danger">Please select a language.</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="level">Level</label>
                            <select id="level" {...register('level', { required: true })} className="form-control bg-dark text-light">
                                <option value="">Select Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                {/* Add more options as needed */}
                            </select>
                            {errors.level && <span className="text-danger">Please select a level.</span>}
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Submitting...' : 'Create Task'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewTaske;
