
    const express = require('express')
const {
  getPermission,
  updatePermission,
  createPermission,
  searchPermissions,
  deletePermission,
  permissionListDo,
  permissionDetailDo
} = require("./permissionController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("permissions",'create'), createPermission).get(protect, restricTo("permissions",'read'), searchPermissions)
router.route('/do').post(protect,restricTo("permissions",'create'), permissionListDo)
router.route('/do/:id').post(protect,restricTo("permissions",'create'), permissionDetailDo)



router.route("/:id").patch(protect,restricTo("permissions",'update'), updatePermission)
                    .get(protect,restricTo("permissions",'read'), getPermission)
                    .delete(protect,restricTo("permissions","delete"),deletePermission);

module.exports = router;

    
    