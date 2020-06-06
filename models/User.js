const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// userSchema save 하기전에 행동 정의
// next()하면 save하는 곳으로 바로 보냄.
userSchema.pre("save", function (next) {
  // this -> userSchema 가르킴
  var user = this;
  // 비밀번호 수정할 때만 진행
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // hash 값으로 저장
        next();
      });
    });
  } else {
    next();
  }
});

// 패스워드 비교 메서드 생성
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword = test1
  // 암호화된 패스워드 = $2b$10$f5xYJwy/nlYddWAsR68sk.YUGxxmNpm3NBFYbcEpmb/3pwBGPMSEm
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// jsonwebtoken 이용해서 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
