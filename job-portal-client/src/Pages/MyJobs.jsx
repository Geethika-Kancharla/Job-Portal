import React, { useEffect, useState } from 'react'

const MyJobs = () => {
    const email="fs-dbmsproject@gmail.com"
    const[job,setJob]=useState([]);
    const[searchText,setSearchText]=useState("");
    const[isLoading,setIsLoading]=useState(true);
    useEffect(()=>{
        setIsLoading(true);
        fetch(`http://localhost:5000/myJobs/kirthana9@gmail.com`).then(res=>res.json()).then(data=>{setJob(data)})
    },[])
  return (
    <div>MyJobs</div>
  )
}

export default MyJobs;