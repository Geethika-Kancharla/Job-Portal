import React, { useState, useEffect } from 'react';
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from '../components/Card';
import '../App.css';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("jobs.json")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setQuery(value);
    } else if (name === 'location') {
      setLocation(value);
    }
  };


  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredItems = jobs.filter((job) => {
   const tileMatches= job.jobTitle.toLowerCase().includes(query.toLowerCase());
   const locMatches=job.jobLocation.toLowerCase().includes(location.toLowerCase());
   return tileMatches && locMatches;
  }
  );

  const filteredData = () => {
    let filteredJobs = filteredItems;
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => (
        jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
        parseInt(maxPrice) <= parseInt(selectedCategory) ||
        salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
        employmentType.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData();

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ? (
              <p className="font-medium">Loading...</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
                <p>No data found!</p>
              </>
            )
          }
          {
            result.length > 0 && (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage}>Previous</button>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage}>Next</button>
              </div>
            )
          }
        </div>

        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>
    </div>
  );
};

export default Home;
