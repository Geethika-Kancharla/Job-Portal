import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

const UpdateJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const fetchJobDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/all-jobs/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setJob(data);
        } catch (error) {
            console.error('Error fetching job:', error);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const onSubmit = (data) => {
        data.skills = selectedOption;

        fetch(`http://localhost:5000/update-job/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.acknowledged === true) {
                    alert('Job Updated successfully');
                    reset();
                }
            })
            .catch((error) => {
                console.error('Error updating job:', error);
                alert('An error occurred while updating job');
            });
    };

    const options = [
        { value: 'Javascript', label: 'Javascript' },
        { value: 'C++', label: 'C++' },
        { value: 'HTML', label: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'React', label: 'React' },
        { value: 'Node', label: 'Node' },
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'Redux', label: 'Redux' },
        { value: 'Java', label: 'Java' },
    ];

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='bg-[#FAFAFA] py-10px-4 lg:px-16'>
                {job ? (
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                        {/* 1st row */}
                        <div className='create-job-flex'>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Job Title</label>
                                <input type='text' defaultValue={job.jobTitle} {...register('jobTitle')} className='create-job-input' />
                            </div>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Company Name</label>
                                <input type='text' defaultValue={job.companyName} {...register('companyName')} className='create-job-input' />
                            </div>
                        </div>

                        {/* 2nd row */}
                        <div className='create-job-flex'>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Minimum Salary</label>
                                <input type='text' defaultValue={job.minPrice} placeholder='$20k' {...register('minPrice')} className='create-job-input' />
                            </div>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Maximum Salary</label>
                                <input type='text' defaultValue={job.maxPrice} placeholder='$120k' {...register('maxPrice')} className='create-job-input' />
                            </div>
                        </div>

                        {/* 3rd row */}
                        <div className='create-job-flex'>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Salary Type</label>
                                <select defaultValue={job.salaryType} {...register('salaryType', { required: true })} className='create-job-input'>
                                    <option value='Hourly'>Hourly</option>
                                    <option value='Monthly'>Monthly</option>
                                    <option value='Yearly'>Yearly</option>
                                </select>
                            </div>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Job Location</label>
                                <input type='text' defaultValue={job.jobLocation} placeholder='Ex: New York' {...register('jobLocation')} className='create-job-input' />
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className='create-job-flex'>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Job Posting Date</label>
                                <input type='date' defaultValue={job.postingDate} {...register('postingDate')} className='create-job-input' />
                            </div>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Experience Level</label>
                                <select defaultValue={job.experienceLevel} {...register('experienceLevel', { required: true })} className='create-job-input'>
                                    <option value='Any experience'>Any experience</option>
                                    <option value='Internship'>Internship</option>
                                    <option value='Work remotely'>Work remotely</option>
                                </select>
                            </div>
                        </div>

                        {/* 5th row */}
                        <div>
                            <label className='block mb-2 text-lg'>Required Skill Sets:</label>
                            <CreatableSelect defaultValue={job.skills} onChange={setSelectedOption} options={options} isMulti className='create-job-input py-4' />
                        </div>

                        {/* 6th row */}
                        <div className='create-job-flex'>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Company Logo</label>
                                <input type='url' defaultValue={job.companyLogo} placeholder='Paste your Company logo URL: https://weshare.com/img1' {...register('companyLogo')} className='create-job-input' />
                            </div>
                            <div className='lg:w-1/2 w-full'>
                                <label className='block mb-2 text-lg'>Employment Type</label>
                                <select defaultValue={job.employmentType} {...register('employmentType', { required: true })} className='create-job-input'>
                                    <option value='Full-time'>Full-time</option>
                                    <option value='Part-time'>Part-time</option>
                                    <option value='Temporary'>Temporary</option>
                                </select>
                            </div>
                        </div>

                        {/* 7th row */}
                        <div className='w-full'>
                            <label className='block mb-2 text-lg'>Job Description</label>
                            <textarea defaultValue={job.description} {...register('description')} className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700' rows={6} placeholder='Job Description' />
                        </div>

                        {/* Last row */}
                        <div className='w-full'>
                            <label className='block mb-2 text-lg'>Job Posted By</label>
                            <input type='email' defaultValue={job.postedBy} placeholder='your email' {...register('postedBy')} className='create-job-input' />
                        </div>

                        {/* Submit button */}
                        <input type='submit' className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' />
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default UpdateJob;