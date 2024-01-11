import { useState ,useEffect} from 'react'
import axios from 'axios';


const apikey = "a136e550b28a452c2cd6ef4dbb3c52a2";

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


const  App= () =>{
  const [year,setYear] = useState<string>('2022');
  const[movies,setMovies] = useState<Movie[]>([]);
  const[allmovies,setallMovies] = useState<MovieApiResponse[]>([]);
  const[page,setPage] = useState<number>(66);

  const fetchMovies = async (selectedYear:string ,selectPage:number) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${selectedYear}&with_watch_monetization_types=flatrate&page=${selectPage}`;
    try {
      
      const response = await axios.get(url);
      // console.log('API Response:', response.data);
      // console.log('API Response:', response.data.results);
      setMovies(response.data.results);
      setallMovies(response.data);
      // console.log(movies);
      
    } catch (error) {
      console.error('Error fetching movies:',error);
    }
  };
   
  const handleYearChange = (event:React.ChangeEvent<HTMLSelectElement>) =>{
    const selectYear = event.target.value;
    setYear(selectYear);
    // fetchMovies(year,page)
  };

  const handlePageChange = (p: number) =>{
    const selectPage = p;
    setPage(selectPage);
    // fetchMovies(year,page);
  };

  useEffect(()=>{
      fetchMovies(year,page);
  },[year]);

  useEffect(()=>{
    fetchMovies(year,page);
},[page]);

  useEffect(() => {
    console.log('Movies after setMovies:', movies);
  }, [movies]);
  useEffect(() => {
    console.log('allMovies after setMovies:', allmovies);
    console.log('page:', allmovies['page']<number>);
  }, [allmovies]);
  


  const ytUrl = 'https://www.youtube.com/results?search_query='
  const urlPoster = 'https://image.tmdb.org/t/p/w500/';

  return(
    <div>
      <nav>
        <a href="index.html">
          <h2>Movies APP</h2>
        </a>
           <select name="" id="years" onChange={handleYearChange} value={year}>
           {[...Array(200).keys()].map((index) => {
            const yearValue = 2022 - index;
            return (
              <option key={yearValue} value={yearValue.toString()}>
                {yearValue}
              </option>
            );
          })}
           </select>
      </nav>

       <div className="content" id='content' >
        {movies && movies.map((data)=>(
          <a href={`${ytUrl}${data.title}fullmovies พาทย์ไทย`}>
            
              <div className='superContainer' key={data.title}>
                <div className="rateContainer">
                   <h2 className='rate_text'>{data.vote_average}</h2>
                </div>
                 <h2 className='title'>{data.title.substring(0,25)}</h2>
                 <img src={`${urlPoster}${data.poster_path}`} alt="{data.title}" />
            
             </div>

          </a>
          
        ))}
        
        

       </div>

       {/* <nav className='pagination'>
            <div className='pagecontainer'><button onClick={()=>handlePageChange(1)}>1</button></div>
            <div className='pagecontainer'><a onClick={()=>handlePageChange(2)}>2</a></div>
            <div className='pagecontainer'><a onClick={()=>handlePageChange(3)}>3</a></div>
            <div className='pagecontainer'><a onClick={()=>handlePageChange(4)}>4</a></div>
            <div className='pagecontainer'><a onClick={()=>handlePageChange(5)}>5</a></div>
        </nav> */}
        <nav className='pagination'>
        {[...Array(10).keys()].map((index) => {
            // const yearValue = 2022 - index;
            return (
              <div className='pagecontainer'><a onClick={()=>handlePageChange(index)}>{index}</a></div>
            );
          })}
            
            
        </nav>
        

        
    </div>
  )
}

export default App
