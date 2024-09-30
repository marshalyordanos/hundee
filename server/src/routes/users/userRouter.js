const express = require('express')
const {
  getAllUser,
  getUser,
  updateUser,
  createUser,
  searchUsers,
  deleteUser
} = require("./userController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("users",'create'), createUser).get(protect, restricTo("users",'read'), searchUsers)

router.route("/:id").patch(protect,restricTo("users",'update'), updateUser)
                    .get(protect,restricTo("users",'read'), getUser)
                    .delete(protect,restricTo("users","delete"),deleteUser);
// router.patch("/updateMyPassword", protect, updatePassword);
// router.route("/").get(protect,restricTo("blogs",['read',]),getAllUser);

module.exports = router;
