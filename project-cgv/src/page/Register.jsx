import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/Register.css";
import { Link, useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

import { useFormik } from "formik";

import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [dataUser, setDataUser] = useState([]);
  const loadUser = async () => {
    let result = await axios.get("http://localhost:8000/users");
    setDataUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const [emailExistsError, setEmailExistsError] = useState(false);

  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      phonenumber: "",
      email: "",
      password: "",
      address: "",
      birthplace: "",
      gender: "male",
      role: "regular",
      status: "",
    },
    // b4: sử dụng Yup để viết các điều kiện cho input
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Nhập nhiều hơn 5 kí tự")
        .max(25, "Không vượt quá 25 kí tự")
        .required("không được để trống"),
      phonenumber: Yup.string().required("không được để trống"),
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("không được để trống"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("không được để trống"),
      address: Yup.string().required("không được để trống"),
      birthplace: Yup.string().required("không được để trống"),
      gender: Yup.string().required("không được để trống"),
    }),

    onSubmit: async (values) => {
      const emailExists = dataUser.some((user) => user.email === values.email);
      if (emailExists) {
        setEmailExistsError(true);
      } else {
        await axios.post("http://localhost:8000/users", values);
        toast.success("Đăng kí thành công");
        navigate("/login");
      }
    },
  });

  return (
    <div>
      <Header />
      <div className="container register">
        <div className="register_left">
          <div className="registe_title">
            <h5>
              <Link to={"/login"}>Đăng Nhập</Link>
            </h5>
            <h5>
              <Link to={"/Register"}>Đăng Ký</Link>
            </h5>
          </div>

          <div className="registe_form">
            <form onSubmit={formik.handleSubmit}>
              <label className="registe_label">Tên:</label>
              <input
                className="registe_input"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <p className="register_error">{formik.errors.username}</p>
              )}
              <br />

              <label className="registe_label">Số điện thoại:</label>
              <input
                className="registe_input"
                type="text"
                name="phonenumber"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
              />
              {formik.errors.phonenumber && formik.touched.phonenumber && (
                <p className="register_error">{formik.errors.phonenumber}</p>
              )}
              <br />

              <label className="registe_label">Email:</label>
              <input
                className="registe_input"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="register_error">{formik.errors.email}</p>
              )}
              {emailExistsError && (
                <p className="register_error">Email đã có người sử dụng</p>
              )}
              <br />

              <label className="registe_label">Mật khẩu:</label>
              <span className="register_password">
                <input
                  className="input_register_password"
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <i
                  className={`fa-solid ${
                    togglePassword ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={() => setTogglePassword(!togglePassword)}
                ></i>
                {formik.errors.password && formik.touched.password && (
                  <p className="register_error_password">
                    {formik.errors.password}
                  </p>
                )}
              </span>
              <br />

              <label className="registe_label">Địa chỉ:</label>
              <input
                className="registe_input"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && formik.touched.address && (
                <p className="register_error">{formik.errors.address}</p>
              )}
              <br />

              <label className="registe_label">Ngày sinh:</label>
              <input
                className="registe_input"
                type="date"
                name="birthplace"
                value={formik.values.birthplace}
                onChange={formik.handleChange}
              />
              {formik.errors.birthplace && formik.touched.birthplace && (
                <p className="register_error">{formik.errors.birthplace}</p>
              )}
              <br />

              <label className="registe_label">Giới tính:</label>
              <span className="registe_label_gender">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                />
                <label>Nam</label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                />

                <label>Nữ</label>
                {formik.errors.gender && formik.touched.gender && (
                  <p className="register_error">{formik.errors.gender}</p>
                )}
              </span>

              <div className="register_btn_form">
                <button className="register_btn" type="submit">
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="register_right">
          <div className="register_carousel">
            <div>
              <Carousel interval={2000}>
                <Carousel.Item>
                  <img
                    className="register_carousel_img"
                    src="https://www.cgv.vn/media/wysiwyg/2020/3.jpg"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="register_carousel_img"
                    src="https://www.cgv.vn/media/wysiwyg/2020/1.jpg"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="register_carousel_img"
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

export default Register;
