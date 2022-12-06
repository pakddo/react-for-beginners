import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    })
    return (
        <div style={{
            backgroundImage: `url(${movie.background_image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>
            <div className={styles.detail}>
                {loading ? (
                    <div className={styles.loader}>
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div>
                        <div className={styles.content}>
                            <img src={movie.large_cover_image} alt={movie.title} className={styles.detail__img} />
                            <div>
                                <h1 className={styles.detail__title}>{movie.title}</h1>
                                <h3>{movie.year}</h3>
                                <ul className={styles.detail__genres}>
                                    {movie.genres.map(g => (
                                        <li key={g}>{g}</li>
                                    ))}
                                </ul>                                
                                <p>{movie.description_full}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Detail;
