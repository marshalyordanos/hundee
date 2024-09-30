// const Profile = require("../model/profileModel");
const User = require("../../models/userModel");
const RefreshToken = require("../../models/refreshTokenModel")
const AppErorr = require("../../utils/appError");
const APIFeature = require('../../utils/apiFeature')
const filterObj = require('../../utils/pick')
const jsonwebtoken = require("jsonwebtoken");
const catchAsync = require("../../utils/catchAsync");
const Role = require("../../models/roleModel");



const createUser = catchAsync(async (req, res, next)=>{
  req.body.password = '123456';
  req.body.passwordConfirm = '123456';

  console.log("12345432",123123,req.body)

  if(!req.body.userType){
    const role = await Role.findOne({role_name:req.body.userType})
    req.body.roles= [role._id]
  }else{
    const role = await Role.findOne({role_name:'sales'})
    req.body.roles= [role._id]
  }

  const user = await User.create(req.body);

  res.status(201).json({
    status:"success",
    data:user
  })
  
});


const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const searchUsers = catchAsync(async (req,res,next)=>{
  if(req.query.username){
    req.query.username = { $regex: req.query.username, $options: 'i' } 

  }
  console.log("username",req.query)
  if(req.query.searchText){
    req.query.username = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(User.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const users = await feature.query;
  const count = await User.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:users
  })

});

const getUser = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const user = await User.findById({ _id: req.params.id }).select("-password");
  if (!user) {
    return next(new AppErorr("There is not user in this ID", 404));
  }
  res.status(200).json({ 
    status: "successasDas",
    data: user,
  });
});



const updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  
  
  
 

  //1)create err if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppErorr(
        "this route is not for password update. please use /updateMypassword",
        400
      )
    );
  }

  //2) update user docuent

  const filteredBody = filterObj(req.body, "username", "email","status","phoneNumber","fullName","gender","branch","userType","isSystemAdmin","date");

  const user = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!user){
    return next(
      new AppErorr("the user is not found!",404)
    )
  }

  res.status(200).json({
    status: "success",
    data: user
  });
});



const deleteUser = catchAsync(async (req, res, next) => {
 

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppErorr("the user is not found"), 400);
  }

  
  return res.status(204).json({
    status:"success",
    data:true
  })
});

module.exports = {
  createUser,
  getAllUser,
  searchUsers,
  getUser,
  updateUser,
  deleteUser

}