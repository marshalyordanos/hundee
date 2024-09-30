
    const express = require('express')
const {
  getStat,
  updateStat,
  createStat,
  searchState,
  deleteStat,
  statListDo,
  statDetailDo
} = require("./statController");
const { protect, restricTo } = require('../auth/auth.controller');

const router = express.Router();


router.route('').post(protect,restricTo("state",'create'), createStat).get(protect, restricTo("state",'read'), searchState)
router.route('/do').post(protect,restricTo("state",'create'), statListDo)
router.route('/do/:id').post(protect,restricTo("state",'create'), statDetailDo)



router.route("/:id").patch(protect,restricTo("state",'update'), updateStat)
                    .get(protect,restricTo("state",'read'), getStat)
                    .delete(protect,restricTo("state","delete"),deleteStat);

module.exports = router;

    
    