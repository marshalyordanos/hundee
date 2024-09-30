const Role = require("../../models/roleModel");
const AppErorr = require("../../utils/appError");
const APIFeature = require('../../utils/apiFeature')
const filterObj = require('../../utils/pick')
const catchAsync = require("../../utils/catchAsync");



const validateCreate = catchAsync(async (req,res,next)=>{
    return true

})

const createRole = catchAsync(async (req, res, next)=>{

    if(!validateCreate()){
        return next(new AppErorr('Validation Error',400))
    }

  const role = await Role.create(req.body);

  res.status(201).json({
    status:"success",
    data:role
  })
  
});


const searchRoles = catchAsync(async (req,res,next)=>{
  if(req.query.rolename){
    req.query.rolename = { $regex: req.query.rolename, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.role_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(Role.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const Roles = await feature.query;
  const count = await Role.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:Roles
  })

});

const getRole = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const role = await Role.findById({ _id: req.params.id });
  if (!role) {
    return next(new AppErorr("There is not role in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: role,
  });
});


const validateUpdate = catchAsync(async (req,res,next)=>{
  return true

})
const updateRole = catchAsync(async (req, res, next) => {
  if(!validateUpdate()){
    return next(new AppErorr('Validation Error',400))
}
    const { id } = req.params;
  
    const role = await Role.findByIdAndUpdate(id,req.body,{new:true})
    if (!role) {
      return next(new AppErorr('role is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Role is updated successfully!",
      data:role
  
    })
});



const deleteRole = catchAsync(async (req, res, next) => {
  console.log("------------","delete")
    const { id } = req.params;
  
    const role = await Role.findByIdAndDelete(id)
    if (!role) {
      return next(new AppErorr('role is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Role is  deleted!",
      data:null
  
    })
});


const roleListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_list_to_role','method2']

    if(method_list.includes(method) && method == 'add_list_to_role'){
      
      try{
       
        console.log("payload------------------")
        
        for (let role of payload.data){
           const filteredBody =  filterObj(role, "role_name") ;
           console.log("payload",filteredBody)
          const newRole = new Role(filteredBody);
          await newRole.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Role is created successfully!",
      })

    }catch(err){
      console.log("errrrrrreee",err)
      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const roleDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {id } = req.params

    const method_list = ['method1','method2']

    if(method_list.includes(method) && method == 'method1'){

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createRole,
  searchRoles,
  getRole,
  updateRole,
  deleteRole,
  roleListDo,
  roleDetailDo

}