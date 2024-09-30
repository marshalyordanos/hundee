const express = require('express')
const {
  getRole,
  updateRole,
  createRole,
  searchRoles,
  deleteRole,
  roleListDo,
  roleDetailDo
} = require("./roleController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("roles",'create'), createRole).get(protect, restricTo("roles",'read'), searchRoles)
router.route('/do').post(protect,restricTo("roles",'create'), roleListDo)
router.route('/do/:id').post(protect,restricTo("roles",'create'), roleDetailDo)



router.route("/:id").patch(protect,restricTo("roles",'update'), updateRole)
                    .get(protect,restricTo("roles",'read'), getRole)
                    .delete(protect,restricTo("roles","delete"),deleteRole);

module.exports = router;
