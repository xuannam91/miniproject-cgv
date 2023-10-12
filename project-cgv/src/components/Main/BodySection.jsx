import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/BodySection.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Link } from "react-router-dom";
import axios from "axios";

function BodySection() {
  // gọi Api movie.

  const [dataMovie, setDataMovie] = useState([]);

  const loadMovie = async () => {
    let url = `http://localhost:8000/movies`;
    let result = await axios.get(url);
    setDataMovie(result.data);
  };

  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadMovie();
    onUpdate();
  }, []);

  // modal trailer movie
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  // trailer movie
  const [modal, setModal] = useState({});
  const handleShowModal = async (id) => {
    setShowModal(true);
    let resultmodal = await axios.get(`http://localhost:8000/movies/${id}`);
    setModal(resultmodal.data);
  };

  return (
    <div>
      <div className="image-wrapper_left">
        <img
          src="https://www.cgv.vn/media/wysiwyg/2023/082023/BB_DAMOBANVE_120x600.jpg"
          alt=""
        />
      </div>

      <div className="image-wrapper_right">
        <img
          src="https://www.cgv.vn/media/wysiwyg/2023/082023/BB_DAMOBANVE_120x600.jpg"
          alt=""
        />
      </div>

      <div className="body_title container">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-header-transparent-home.png"
          alt=""
        />
        <hr />
        <hr />
      </div>
      {/* carousel */}
      <div className="section_carousel">
        <div className="container">
          <Carousel interval={2000}>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980wx448h-min_2.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/e/dem_980x448.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980wx448h_41.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_241.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_1__49.jpg"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/_/c/_cgv_c_tr_n_zlp_980x448-min.png"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/h/u/hugo_x_cgv_980x448.png"
                alt=""
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img_carousel"
                src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/p/e/peanuts_rolling_banner.jpg"
                alt=""
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      {/* owl carousel slider */}
      <div className="container line_movie">
        <div className="movie_title">
          <hr />
          <hr />
        </div>
        <div className="movie_img">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/h3_movie_selection.gif"
            alt=""
          />
        </div>
      </div>

      <div className="container">
        <OwlCarousel
          key={dataMovie.length}
          items={4}
          className="owl-theme"
          loop
          nav
          margin={8}
        >
          {dataMovie.slice(-7).map((element, index) => {
            return (
              <div className="item" key={index}>
                <div className="owl-theme_movie">
                  <img className="img" src={element.image} />
                  <div className="owl-theme_movie_action">
                    <h5>{element.title}</h5>
                    <div className="owl-theme_btn">
                      <Link to={`/moviedetail/${element.id}`}>
                        <button className="btn_details">Xem Chi Tiết</button>
                      </Link>

                      <button className="btn_buy">Mua Vé</button>
                    </div>
                  </div>

                  <div className="movie_play">
                    <button
                      className="btn_movie_play"
                      onClick={() => handleShowModal(element.id)}
                    >
                      Trailer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>

        {/* modal */}
        {showModal && (
          <div className="overlay">
            <div className="modal-content">
              <Modal.Body className="modal_body">
                <Button
                  className="btn_modal"
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  X
                </Button>
                <iframe
                  width="100%"
                  height="400"
                  src={modal.trailer}
                  title="Embedded Video"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </Modal.Body>
            </div>
          </div>
        )}
      </div>

      {/* event */}
      <div className="container event">
        <div className="event_title">
          <hr />
          <hr />
        </div>

        <div className="event_img">
          <img
            src="https://www.cgv.vn/skin/frontend/cgv/default/images/h3_event.gif"
            alt=""
          />
        </div>

        <div className="rectangle">
          <p className="event_endow">
            Thành Viên CGV / <span>Tin Mới & Ưu Đãi</span>
          </p>
        </div>

        <div className="event_article">
          <div>
            <img
              src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed-02.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201-uu.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/i/birthday_popcorn_box_240x201.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/u/2/u22_2023_special_cinemas_240x201_1.png"
              alt=""
            />
          </div>
        </div>

        <div className="event_img_finish">
          <div className="event_img_finish_header">
            <img
              src="https://www.cgv.vn/media/wysiwyg/2023/214x245.jpg"
              alt=""
            />
          </div>
          <div className="event_img_finish_center">
            <img
              src="https://www.cgv.vn/media/wysiwyg/2023/062023/u22_072023_496x267.png"
              alt=""
            />
          </div>
          <div className="event_img_finish-footer">
            <img
              src="https://www.cgv.vn/media/wysiwyg/2023/thue-rap.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodySection;
