import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzZjNzRkZGJjNTViOGZmMWZmMTJlMzEyMDJkOWRhNCIsInN1YiI6IjY0ZTA3NTVhYWFlYzcxMDNmOTk3ZTRjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mhbh_M39mf9oD7VcR_Ct_7HMJ71d2wy2v5_AbzMY-VE';

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchApiData = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};