import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url)=>{
    const [apiData, setApiData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true)
            try{
                const res = await axios.get(url)
                // if no error
                setApiData(res.data)
                setIsLoading(false)
                setError(false)
            }
            catch(err){
                setError(err.response.data)
                setApiData([])
                setIsLoading(false)
            }

        }
        fetchData()
    }, [url])

     // refetching
  const refetch = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      // if no error
      setApiData(res.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

    return {apiData, isLoading, error, refetch}
}

export default useFetch