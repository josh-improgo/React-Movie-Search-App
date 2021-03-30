import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import MovieCard from './MovieCard'

function SearchMovies() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const API_KEY = process.env.REACT_APP_API_KEY
    const searchMovies = async (e) => {
        e.preventDefault()

        const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`

        /*
        fetch(URL)
            .then(response => response.json())
            .then(responseJson => console.log(responseJson))
        */
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label
                    className="label"
                    htmlFor="query"
                >Movie Name
            </label>
                <input
                    className="input"
                    name="query"
                    type="text"
                    placeholder="i.e. Rush Hour"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
                <button
                    className="button"
                    type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies
                    .filter(({poster_path}) => poster_path)
                    .map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

            </div>
        </>
    )
}

export default SearchMovies
