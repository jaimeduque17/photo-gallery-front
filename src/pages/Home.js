import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getPictures } from './ApiCore';
import Card from '../components/Card';
import Search from '../components/Search';

const Home = () => {

  /* eslint-disable no-unused-vars */
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(false);

  const loadPictures = () => {
    getPictures('createdAt').then(data => {
      if (data.err) {
        setError(data.err);
      } else {
        setPictures(data);
      }
    });
  }

  useEffect(() => {
    loadPictures();
  }, []);

  return (
    <Layout title="Home Page" description="Welcome to Photo Gallery" className="container-fluid">
      <Search />
      <h2 className="mb-4">Lastest pictures created</h2>
      <div className="row">
        {pictures.map((picture, i) => (
          <div key={i} className="col-4 mb-3">
            <Card picture={picture} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
