const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
