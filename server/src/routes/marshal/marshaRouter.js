
    const express = require('express')
const {
  getMarsha,
  updateMarsha,
  createMarsha,
  searchMarshal,
  deleteMarsha,
  marshaListDo,
  marshaDetailDo
} = require("./marshaController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("marshal",'create'), createMarsha).get(protect, restricTo("marshal",'read'), searchMarshal)
router.route('/do').post(protect,restricTo("marshal",'create'), marshaListDo)
router.route('/do/:id').post(protect,restricTo("marshal",'create'), marshaDetailDo)



router.route("/:id").patch(protect,restricTo("marshal",'update'), updateMarsha)
                    .get(protect,restricTo("marshal",'read'), getMarsha)
                    .delete(protect,restricTo("marshal","delete"),deleteMarsha);

module.exports = router;

    
    