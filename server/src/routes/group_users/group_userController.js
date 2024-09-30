
const Group_user = require("../../models/group_userModel");
const AppErorr = require("../../utils/appError");
const APIFeature = require('../../utils/apiFeature')
const filterObj = require('../../utils/pick')
const catchAsync = require("../../utils/catchAsync");
const Role = require('../../models/roleModel');
const User = require("../../models/userModel");




const createGroup_user = catchAsync(async (req, res, next)=>{

   

  const group_user = await Group_user.create(req.body);

  res.status(201).json({
    status:"success",
    data:group_user
  })
  
});


const searchGroup_users = catchAsync(async (req,res,next)=>{
  if(req.query.group_username){
    req.query.group_username = { $regex: req.query.group_username, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.group_user_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(Group_user.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const Group_users = await feature.query;
  const count = await Group_user.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:Group_users
  })

});

const getGroup_user = catchAsync(async (req, res, next) => {
  const group_user = await Group_user.findById({ _id: req.params.id });
  if (!group_user) {
    return next(new AppErorr("There is not group_user in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: group_user,
  });
});



const updateGroup_user = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
  
    const group_user = await Group_user.findByIdAndUpdate(id,req.body,{new:true})
    if (!group_user) {
      return next(new AppErorr('group_user is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Group_user is updated successfully!",
      data:group_user
  
    })
});



const deleteGroup_user = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const group_user = await Group_user.findByIdAndDelete(id)
    if (!group_user) {
      return next(new AppErorr('group_user is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Group_user is  deleted!",
      data:null
  
    })
});


const group_userListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_users_to_group','method2']

    if(method_list.includes(method) && method == 'add_users_to_group'){
      
      try{
       
        
        
        for (let group_user of payload.data){
            const filteredBody =  filterObj(group_user, "group_user_name") ;
           
            const newGroup_user = new Group_user(filteredBody);
            await newGroup_user.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Group_user is created successfully!",
      })

    }catch(err){      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const group_userDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {id } = req.params
    const role = await Role.findById(id);
    if (!role) {
      return next(new AppErorr("There is not role in this ID", 404));
    }
    

    const method_list = ['add_users_to_group','search_users']

    if(method_list.includes(method) && method == 'add_users_to_group'){
      const {data} = payload

      for (let userList of data){
    
        await Role.findOneAndUpdate({_id:id},{ $addToSet: { users: userList._id } },{new:true})
        await User.findByIdAndUpdate(userList._id,
                  { $addToSet: { roles: id } },
                  {new:true})


      }

     return res.status(201).json({
        status: "success",
        message: "The Group_user is created successfully!",
      })
    }else if(method_list.includes(method) && method == 'search_users'){
        if(req.query.searchText){
          req.query.username = { $regex: req.query.searchText, $options: 'i' } 
      
        }
        req.query.roles ={ $in: [id] } 
        const feature = new APIFeature(User.find(), req.query)
          .filter()
          .sort()
          .fields()
          .paging();
        const users = await feature.query;
        const count = await User.countDocuments({roles:{ $in: [id] }} );
      
        
        return  res.status(200).json({
          status:'success2',
          total:count,
          data:users
        })
    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createGroup_user,
  searchGroup_users,
  getGroup_user,
  updateGroup_user,
  deleteGroup_user,
  group_userListDo,
  group_userDetailDo

}
    
    
    