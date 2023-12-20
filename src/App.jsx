import { useState, useEffect } from 'react'
import { fetchApiData } from './utils/Api'
import './App.scss'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';
import Details from './pages/details/Details';
import PageNotFound from './pages/404/PageNotFound';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import Header from './components/header/Header'

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    getData();
    genresCall();
  }, []);

  const getData = () => {
    fetchApiData("/configuration").then((res) => {
      dispatch(getApiConfiguration(res));
    });
  }

  const genresCall = async () => {
    let promises = [];
    let endpoint = ['tv', 'movie'];
    let allGenres = {};
    endpoint.forEach((item) => {
      promises.push(fetchApiData(`/genre/${item}/list`));
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((genre) => (allGenres[genre.id] = genre.name))
    })
    dispatch(getGenres(allGenres));
  }

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/:mediaType/:id' element={<Details />}/>
            <Route path='/search/:query' element={<SearchResult />}/>
            <Route path='/explore/:mediaType' element={<Explore />}/>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
