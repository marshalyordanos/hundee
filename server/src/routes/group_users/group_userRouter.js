
    const express = require('express')
const {
  getGroup_user,
  updateGroup_user,
  createGroup_user,
  searchGroup_users,
  deleteGroup_user,
  group_userListDo,
  group_userDetailDo
} = require("./group_userController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("group_users",'create'), createGroup_user).get(protect, restricTo("group_users",'read'), searchGroup_users)
router.route('/do').post(protect,restricTo("group_users",'create'), group_userListDo)
router.route('/do/:id').post(protect,restricTo("group_users",'create'), group_userDetailDo)



router.route("/:id").patch(protect,restricTo("group_users",'update'), updateGroup_user)
                    .get(protect,restricTo("group_users",'read'), getGroup_user)
                    .delete(protect,restricTo("group_users","delete"),deleteGroup_user);

module.exports = router;

    
    