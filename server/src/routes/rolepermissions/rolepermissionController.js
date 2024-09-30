
    const Rolepermission = require("../../models/rolepermissionModel");
    const AppErorr = require("../../utils/appError");
    const APIFeature = require('../../utils/apiFeature')
    const filterObj = require('../../utils/pick')
    const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const Permission = require("../../models/permissionModel");
const RolePermission = require("../../models/rolepermissionModel");





const createRolepermission = catchAsync(async (req, res, next)=>{

   

  const rolepermission = await Rolepermission.create(req.body);

  res.status(201).json({
    status:"success",
    data:rolepermission
  })
  
});


const searchRolepermissions = catchAsync(async (req,res,next)=>{
  if(req.query.rolepermissionname){
    req.query.rolepermissionname = { $regex: req.query.rolepermissionname, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.rolepermission_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  
  const feature = new APIFeature(Rolepermission.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const Rolepermissions = await feature.query.populate('permission').populate('role');
  const count = await Rolepermission.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:Rolepermissions
  })

});

const getRolepermission = catchAsync(async (req, res, next) => {
  const rolepermission = await Rolepermission.findById({ _id: req.params.id });
  if (!rolepermission) {
    return next(new AppErorr("There is not rolepermission in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: rolepermission,
  });
});



const updateRolepermission = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
  
    const rolepermission = await Rolepermission.findByIdAndUpdate(id,req.body,{new:true})
    if (!rolepermission) {
      return next(new AppErorr('rolepermission is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Rolepermission is updated successfully!",
      data:rolepermission
  
    })
});



const deleteRolepermission = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const rolepermission = await Rolepermission.findByIdAndDelete(id)
    if (!rolepermission) {
      return next(new AppErorr('rolepermission is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Rolepermission is  deleted!",
      data:null
  
    })
});


const rolepermissionListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_list_to_rolepermission','method2']

    if(method_list.includes(method) && method == 'add_list_to_rolepermission'){
      
      try{
       
        
        
        for (let rolepermission of payload.data){
            const filteredBody =  filterObj(rolepermission, "rolepermission_name") ;
           
            const newRolepermission = new Rolepermission(filteredBody);
            await newRolepermission.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Rolepermission is created successfully!",
      })

    }catch(err){      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const rolepermissionDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {read,update,create,destroy} = payload.perm;
    const {type,data} = payload;


    const {id } = req.params

    const method_list = ['add_list_to_rolepermission','method2']



    if(method_list.includes(method) && method == 'add_list_to_rolepermission'){

      console.log(read,update,create,destroy,type,data,id)

      const permmision = await Permission.findById(id);

        if (!permmision) {
          return next(new AppErorr("There is not permmision in this ID", 404));
        }

      if (type == "user") {

        for (let userList of data){
    
        const user = await User.findById(userList._id);
        if (!user) {
          return next(new AppErorr("There is not user in this ID", 404));
        }
        
    
        const role = await Role.create({ role_name: user.username+' '+permmision.perm_name })
        await Role.findOneAndUpdate({_id:role._id},{ $addToSet: { users: user._id } },{new:true})
        await User.findOneAndUpdate({_id:user._id},{ $addToSet: { roles: role._id } },{new:true})

        
        await user.save();

      
    
        const rolePermission = await RolePermission.create({
          permission: id,
          role: role._id,
          create:create,
          read:read, 
          update:update, 
          delete:destroy
    
          });
        }
      }else {
        for(let listGroup of data){
          const group = await Role.findById(listGroup._id);
        if (!group) {
          return next(new AppErorr("There is not group in this ID", 404));
        }
        const rolePermission = await RolePermission.create({
          permission: id,
          role: group._id,
          create:create,
          read:read, 
          update:update, 
          delete:destroy
    
          });
        }
    
      }

     return res.status(200).json({
        status:"seccuss",
        message:"The rolePermission is created successfully!"
      })

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createRolepermission,
  searchRolepermissions,
  getRolepermission,
  updateRolepermission,
  deleteRolepermission,
  rolepermissionListDo,
  rolepermissionDetailDo

}
    
    
    