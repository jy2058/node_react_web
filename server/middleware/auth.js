const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  // 토큰 복호화 -> 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    /// 유저 있으면 인증 성공
    // 서버쪽에서 토큰과 user정보를 사용할 수 있게 넣어줌
    req.token = token;
    req.user = user;
    next();
  });

  // 유저 없으면 인증 실패
};

module.exports = { auth };
