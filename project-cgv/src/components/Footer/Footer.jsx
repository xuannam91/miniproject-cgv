import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer_list_item container">
          <div className="footer_item">
            <h6>CGV Việt Nam</h6>
            <p>Giới Thiệu</p>
            <p>Tiện Ích Online</p>
            <p>Thẻ Quà Tặng</p>
            <p>Tuyển Dụng</p>
            <p>Liên Hệ Quảng Cáo CGV</p>
          </div>
          <div className="footer_item">
            <h6>Điều khoản sử dụng</h6>
            <p>Điều Khoản Chung</p>
            <p>Điều Khoản Giao Dịch</p>
            <p>Chính Sách Thanh Toán</p>
            <p>Chính Sách Bảo Mật</p>
            <p>Câu Hỏi Thường Gặp</p>
          </div>
          <div className="footer_item">
            <h6>Kết nối với chúng tôi</h6>
            <p>
              <img className="img_lienket"
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-social-footer-40.png"
                alt=""
              />
            </p>
            <p>
              <img
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/cong-thuong.PNG"
                alt=""
              />
            </p>
          </div>
          <div className="footer_item">
            <h6>Chăm sóc khách hàng</h6>
            <p>Hotline: 1900 6017</p>
            <p>Giờ làm việc: 8:00 - 22:00 Tất cả</p>
            <p>các ngày bao gồm cả Lễ Tết</p>
            <p>Email hỗ trợ: hoidap@cgv.vn</p>
          </div>
        </div>
      </div>



      <div className="container">
        <div className="finish">
          <div className="finish_img">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="finish_information">
            <h6>CÔNG TY TNHH CJ CGV VIETNAM</h6>
            <p>
              Giấy CNĐKDN: 0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký
              thay đổi lần thứ 5 ngày 14/10/2015, cấp bởi
            </p>
            <p>Sở KHĐT thành phố Hồ Chí Minh.</p>
            <p>
              Địa Chỉ: Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14,
              Q.10, TPHCM.
            </p>
            <p>Hotline: 1900 6017</p>
            <p>COPYRIGHT 2017 CJ CGV. All RIGHTS RESERVED .</p>
          </div>
        </div>
      </div>
      <div className="finish_wall">
        <img
          src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-bottom-footer.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
