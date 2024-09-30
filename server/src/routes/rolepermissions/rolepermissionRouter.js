
    const express = require('express')
const {
  getRolepermission,
  updateRolepermission,
  createRolepermission,
  searchRolepermissions,
  deleteRolepermission,
  rolepermissionListDo,
  rolepermissionDetailDo
} = require("./rolepermissionController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("rolepermissions",'create'), createRolepermission).get(protect, restricTo("rolepermissions",'read'), searchRolepermissions)
router.route('/do').post(protect,restricTo("rolepermissions",'create'), rolepermissionListDo)
router.route('/do/:id').post(protect,restricTo("rolepermissions",'create'), rolepermissionDetailDo)



router.route("/:id").patch(protect,restricTo("rolepermissions",'update'), updateRolepermission)
                    .get(protect,restricTo("rolepermissions",'read'), getRolepermission)
                    .delete(protect,restricTo("rolepermissions","delete"),deleteRolepermission);

module.exports = router;

    
    