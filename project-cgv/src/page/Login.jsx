import React from "react";
import "../components/css/Login.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("Vui lòng điền đầy đủ thông tin"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("Vui lòng điền đầy đủ thông tin"),
    }),

    onSubmit: async (values) => {
      try {
        let url = await axios.get(
          `http://localhost:8000/users?email=${values.email}&password=${values.password}`
        );
       
        let result = url.data;
          
        if (result.length > 0) {
          localStorage.setItem("userLogin", JSON.stringify(result[0]));
          if (result[0].role === "admin") {
            navigate("/admin");
          } else if (result[0].role === "regular") {
            navigate("/");
          }
        } else {
          // Sai email hoặc password
          alert("Email hoặc mật khẩu không đúng");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div>
      <Header />
      <div className="container login">
        <div className="login_left">
          <div className="login_title">
            <h5>
              <Link to={"/login"}>Đăng Nhập</Link>
            </h5>
            <h5>
              <Link to={"/Register"}>Đăng Ký</Link>
            </h5>
          </div>

          <div className="login_form">
            <form onSubmit={formik.handleSubmit}>
              <label className="login_label">Email:</label>
              <input
                className="login_input"
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="register_error">{formik.errors.email}</p>
              )}
              <br />

              <label className="login_label">Mật khẩu:</label>
              <input
                className="login_input"
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="register_error_password">
                  {formik.errors.password}
                </p>
              )}
              <br />

              <div className="login_btn_form">
                <button className="login_btn" type="submit">
                  Đăng Nhập
                </button>
              </div>
            </form>
            
          </div>
        </div>

        <div className="login_right">
          <div className="login_carousel">
            <div>
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img
                    className="login_carousel_img"
                    src="https://www.cgv.vn/media/wysiwyg/2020/3.jpg"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="login_carousel_img"
                    src="https://www.cgv.vn/media/wysiwyg/2020/1.jpg"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="login_carousel_img"
                    src="https://www.cgv.vn/media/wysiwyg/2020/2.jpg"
                    alt=""
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
