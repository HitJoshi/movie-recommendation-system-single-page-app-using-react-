import React, { useContext ,useEffect, useState} from "react";
const API_URL=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();
const AppProvider =({children }) => {
    const [isLoading,setIsLoading] = useState(true);
    const [movie, setMovie] = useState([ ]);
    const [isError, setIsError] = useState({show:"false",msg:""});
    const [query, setQuery] = useState("titanic");
    
    const getMovie = async(url)=>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response ==="True"){
                setIsLoading(false);
                setIsError({
                    show: false,
                    msg:""
                });
                setMovie(data.Search);
            }else{
                setIsError({
                    show: true,
                    msg: data.Error
               })
            }
        }catch(error){
            console.log(error);
        }

    };
    useEffect(()=>{
        let timerOut = setTimeout(()=>{
            getMovie(`${API_URL}&s=${query}`);
        },900);
        return ()=> clearTimeout(timerOut);
    }, [query]);  
      return <AppContext.Provider value ={{movie,isLoading, isError, query, setQuery}}>
        {children}
    </AppContext.Provider>;
};
const useGlobalContext = () =>{
    return useContext (AppContext);
};

export {AppContext, AppProvider, useGlobalContext};
