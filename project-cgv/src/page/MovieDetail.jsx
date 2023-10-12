import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/MovieDetail.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
  // ẩn hiện thông tin và trailer
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = (show) => {
    setShowDetails(show);
  };
  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };
  // hiện từng phim theo yêu cầu.
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  const loadMovieDetail = async () => {
    const result = await axios.get(`http://localhost:8000/movies/${id}`);
    setDetail(result.data);
  };

  useEffect(() => {
    loadMovieDetail();
    onUpdate();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <h2>Nội Dung Phim</h2>
        </div>
        <hr />

        <div className="movie_detail">
          <div className="movie_detail_img">
            <img src={detail.image} alt="" />
          </div>
          <div className="movie_detail_infor">
            <h4>{detail.title}</h4>
            <p>
              Đạo Diễn: <span>{detail.director}</span>
            </p>
            <p>
              Diễn Viên: <span>{detail.actors}</span>
            </p>
            <p>
              Thể Loại: <span>{detail.genre}</span>
            </p>
            <p>
              Ngày phát hành: <span>{detail.releaseDate}</span>
            </p>
            <p>
              Thời Lượng: <span>{detail.duration} phút</span>
            </p>
            <p>
              Ngôn Ngữ: <span>Phụ đề tiếng Việt</span>
            </p>
            <p>
              Rated:
              <span>
                T16 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 16 TUỔI TRỞ LÊN
                (16+)
              </span>
            </p>

            <button className="btn_buy_movie_detail">
              <p>
                <i className="fas fa-phone-alt"></i>Mua vé
              </p>
            </button>
          </div>
        </div>

        <div>
          <div className="rectangle_detail">
            <p className="event_endow_detail">
              <span onClick={() => toggleDetails(true)}>
                <i
                  className={`${showDetails && "fas fa-hand-point-right"}`}
                ></i>
                Chi Tiết
              </span>
              /
              <span onClick={() => toggleDetails(false)}>
                <i
                  className={`${!showDetails && "fas fa-hand-point-right"}`}
                ></i>
                Trailer
              </span>
            </p>
          </div>
        </div>

        <div className="detail_content">
          {showDetails && (
            <div>
              <p>{detail.description}</p>
            </div>
          )}

          {!showDetails && (
            <div>
              <iframe
                width="100%"
                height="400"
                src={detail.trailer}
                title="Embedded Video"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;
