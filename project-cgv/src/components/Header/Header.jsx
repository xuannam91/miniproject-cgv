import React, { useState } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

function Header() {
  // gọi từ local về.
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
 
 
  const navigate = useNavigate();
  // logout
  const handleLogOut = () => {
    localStorage.removeItem("userLogin");
    navigate("/login");
  };

  // modal thay đổi thông tin người dùng
  const [modalUser, setModalUser] = useState(false);

  const handleShowModalUser = () => setModalUser(true);
  const handleCloseModalUser = () => setModalUser(false);




  const formik = useFormik({
    initialValues: {
      username: "",
      phonenumber: "",
      email: "",
      password: "",
      newpassword: "",
      address: "",
      birthplace: "",
      gender: "male",
    },
    // b4: sử dụng Yup để viết các điều kiện cho input
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Nhập nhiều hơn 5 kí tự")
        .max(25, "Không vượt quá 25 kí tự")
        .required("Tên không được để trống"),
      phonenumber: Yup.string().required("Số điện thoại không được để trống"),
      email: Yup.string()
        .email("email chưa đúng định dạng")
        .required("Email không được để trống"),

      password: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("password không được để trống"),
      newpassword: Yup.string()
        .min(8, "Nhập nhiều hơn 8 kí tự")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
        )
        .required("newpassword không được để trống"),

      address: Yup.string().required("Địa chỉ không được để trống"),
      birthplace: Yup.string().required("Ngày sinh không được để trống"),
      gender: Yup.string().required("Giới tính không được để trống"),
    }),

    onSubmit: async (values) => {
      
     if(userLogin.password === values.password && userLogin.email === values.email){
      const newUserChange = {
        id: userLogin.id,
        username: values.username,
        phonenumber: values.phonenumber, 
        email: values.email,
        password: values.newpassword,
        address: values.address,
        birthplace: values.birthplace,
        gender: values.gender,
      }
      await axios.patch(`http://localhost:8000/users/${userLogin.id}`, newUserChange);
      toast.success("Đổi thông tin thành công");
      handleLogOut();
      navigate("/login");
     
     }else{
      alert("Email hoặc Mật khẩu cũ không chính xác")
     }
    },
  });

  return (
    <div>
      <div>
        <div className="container">
          <div className="header_img">
            <img
              src="https://advserver.cgv.vn/www/images/e8aafb8590eca2f888bbc3c7ba815f36.jpg"
              alt=""
            />
          </div>

          <div className="header_item">
            <ul>
              <li className="header_item_fontawesome">
                <Link to={"/login"}>TIN MỚI & ƯU ĐÃI</Link>
              </li>

              <li className="header_item_fontawesome">
                <Link to={"/login"}>VÉ CỦA TÔI</Link>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-user"></i>
                </span>
                {userLogin === null ? (
                  <Link to={"/login"}>ĐĂNG KÍ / ĐĂNG NHẬP</Link>
                ) : (
                  <span>
                    <span className="user_login" onClick={handleShowModalUser}>
                      {userLogin.username}
                    </span>
                    <button onClick={handleLogOut} className="logout_user">
                      Đăng Xuất
                    </button>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* modal thay đổi thông tin người dùng */}
        {modalUser && (
          <div className="overlay_user">
            <div className="modal-content_user">
              <Modal.Body className="modal_body_user">
                <Button
                  className="btn_modal_user"
                  variant="secondary"
                  onClick={handleCloseModalUser}
                >
                  X
                </Button>

                <div className="change_user">
                  <h4>Thay Đổi Hồ Sơ</h4>
                  <form
                    className="form_change_user"
                    onSubmit={formik.handleSubmit}
                  >
                    <label className="change_user_label">Tên:</label>
                    <input
                      className="change_user_input"
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && formik.touched.username && (
                      <p className="change_user_error">{formik.errors.username}</p>
                    )}
                    <br />

                    <label className="change_user_label">Số điện thoại:</label>
                    <input
                      className="change_user_input"
                      type="text"
                      name="phonenumber"
                      value={formik.values.phonenumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phonenumber &&
                      formik.touched.phonenumber && (
                        <p className="change_user_error">
                          {formik.errors.phonenumber}
                        </p>
                      )}
                    <br />

                    <label className="change_user_label">Email cũ:</label>
                    <input
                      className="change_user_input"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="change_user_error">{formik.errors.email}</p>
                    )}
                    <br />

                    <label className="change_user_label">Mật khẩu cũ:</label>
                    <input
                      className="change_user_input"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className="change_user_error">
                        {formik.errors.password}
                      </p>
                    )}
                    <br />
                    <label className="change_user_label">Mật khẩu mới:</label>
                    <input
                      className="change_user_input"
                      type="password"
                      name="newpassword"
                      value={formik.values.newpassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.newpassword &&
                      formik.touched.newpassword && (
                        <p className="change_user_error">
                          {formik.errors.newpassword}
                        </p>
                      )}
                    <br />

                    <label className="change_user_label">Địa chỉ:</label>
                    <input
                      className="change_user_input"
                      type="text"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.address && formik.touched.address && (
                      <p className="change_user_error">{formik.errors.address}</p>
                    )}
                    <br />

                    <label className="change_user_label">Ngày sinh:</label>
                    <input
                      className="change_user_input"
                      type="date"
                      name="birthplace"
                      value={formik.values.birthplace}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.birthplace && formik.touched.birthplace && (
                      <p className="change_user_error">{formik.errors.birthplace}</p>
                    )}
                    <br />

                    <label className="change_user_label">Giới tính:</label>
                    <span className="change_gender">
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
                    </span>

                    <div className="">
                      <button className="btn_change_user" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </div>
          </div>
        )}

        <div className="header_nav">
          <ul>
            <Link to={"/listmovie"}>
              <li className="header_list_item">PHIM</li>
            </Link>
            <li className="header_list_item">RẠP CGV</li>
            <li className="header_list_item">THÀNH VIÊN</li>
            <li className="header_list_item">CULTUREPLEX</li>
            <li className="header_list_item">TUYỂN DỤNG</li>
          </ul>
          <div>
            <Link to={"/"}>
              <img
                className="background_color1"
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                alt=""
              />
            </Link>
          </div>
          <div>
            <img
              className="background_color2"
              src="https://www.cgv.vn/media/wysiwyg/2019/AUG/kenhcine.gif"
              alt=""
            />
          </div>
          <div>
            <img
              className="background_color3"
              src="https://www.cgv.vn/media/wysiwyg/news-offers/mua-ve_ngay.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="background_color4"
              src="https://www.cgv.vn/skin//frontend/cgv/default/images/hot-jobs.png"
              alt=""
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
