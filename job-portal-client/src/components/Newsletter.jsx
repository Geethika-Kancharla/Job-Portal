import React, { useState } from 'react'
import { useRef } from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubscribe = () => {
        // Add your subscription logic here
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        alert(`Subscribed successfully with email: ${email}`);
        setEmail('');
    };
    const handleChangeInput = (event) => {
        setEmail(event.target.value);

    };

    const handleUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger click on file input
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            alert(`File "${file.name}" selected for upload.`);
            // Perform further logic (e.g., upload to server or store in state)
            setTimeout(() => {
                alert(`File "${file.name}" uploaded successfully.`);
            }, 1000);
        }
    };

    

    return (
        <div >
            <div>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaEnvelopeOpenText />
                    Email me for jobs</h3>
                <p className='text-primary/75 text-base mb-4'>Stay Updated with the Latest Job Openings
Subscribe to Our Newsletter!
Be the first to know about the latest job opportunities in your field. By subscribing to our newsletter, you'll receive</p>
                <div>
                    <input type='email' name='email' placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none'
                        onChange={handleChangeInput} />
                    <input type='submit' name='subscribe' value={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'
                        onClick={handleSubscribe}
                    />

                </div>
            </div>

            <div className='mt-20'>
                <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                    <FaRocket />
                    Get noticed faster</h3>
                <p className='text-primary/75 text-base mb-4'>Upload Your Resume
Get Noticed by Top Employers!
Maximize your job search potential by uploading your resume to our platform. By doing so, you'l</p>
                <div>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt" // Optional: specify accepted file types
                    />

                    {/* Button to trigger file selection */}
                    <button onClick={handleUpload} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold'>
                        Upload your resume
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Newsletter