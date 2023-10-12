import React, { useEffect, useState } from "react";
import "../components/css/ListMovie.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function ListMovie() {
  const [dataListMovie, setDataListMovie] = useState([]);
  const loadList = async () => {
    let url = `http://localhost:8000/movies`;
    let resultList = await axios.get(url);
    setDataListMovie(resultList.data);
  };

  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadList();
    onUpdate();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <h2>Danh Sách Phim</h2>
          <hr />
        </div>
        <div className="list_movie">
          {dataListMovie.map((element, index) => (
            <div className="list_movie-item" key={element.id}>
              <Link to={`/moviedetail/${element.id}`}>
                <div>
                  <img src={element.image} alt="" />
                </div>
                <div className="movie-item_article">
                  <h6>{element.title}</h6>
                  <p className="movie-item_genre">
                    Thể Loại: <span>{element.genre}</span>
                  </p>
                  <p>
                    Thời lượng: <span>{element.duration} phút</span>
                  </p>
                  <p>
                    Khởi chiếu: <span>{element.releaseDate}</span>
                  </p>
                </div>
              </Link>
              <button className="btn_movie-item">
                <p>
                  <i className="fas fa-phone-alt"></i>Mua vé
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListMovie;
