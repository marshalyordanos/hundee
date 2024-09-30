
    const Permission = require("../../models/permissionModel");
    const AppErorr = require("../../utils/appError");
    const APIFeature = require('../../utils/apiFeature')
    const filterObj = require('../../utils/pick')
    const catchAsync = require("../../utils/catchAsync");





const createPermission = catchAsync(async (req, res, next)=>{
 

  const permission = await Permission.create(req.body);

  res.status(201).json({
    status:"success",
    data:permission
  })
  
});


const searchPermissions = catchAsync(async (req,res,next)=>{
  if(req.query.permissionname){
    req.query.permissionname = { $regex: req.query.permissionname, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.permission_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(Permission.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const Permissions = await feature.query;
  const count = await Permission.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:Permissions
  })

});

const getPermission = catchAsync(async (req, res, next) => {
  const permission = await Permission.findById({ _id: req.params.id });
  if (!permission) {
    return next(new AppErorr("There is not permission in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: permission,
  });
});



const updatePermission = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
  
    const permission = await Permission.findByIdAndUpdate(id,req.body,{new:true})
    if (!permission) {
      return next(new AppErorr('permission is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Permission is updated successfully!",
      data:permission
  
    })
});



const deletePermission = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const permission = await Permission.findByIdAndDelete(id)
    if (!permission) {
      return next(new AppErorr('permission is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Permission is  deleted!",
      data:null
  
    })
});


const permissionListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_list_to_permission','method2']

    if(method_list.includes(method) && method == 'add_list_to_permission'){
      
      try{
       
        
        
        for (let permission of payload.data){
            const filteredBody =  filterObj(permission, "permission_name") ;
           
            const newPermission = new Permission(filteredBody);
            await newPermission.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Permission is created successfully!",
      })

    }catch(err){      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const permissionDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {id } = req.params

    const method_list = ['method1','method2']

    if(method_list.includes(method) && method == 'method1'){

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createPermission,
  searchPermissions,
  getPermission,
  updatePermission,
  deletePermission,
  permissionListDo,
  permissionDetailDo

}
    
    
    