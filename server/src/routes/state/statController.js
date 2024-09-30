
    const Stat = require("../../models/statModel");
    const AppErorr = require("../../utils/appError");
    const APIFeature = require('../../utils/apiFeature')
    const filterObj = require('../../utils/pick')
    const catchAsync = require("../../utils/catchAsync");





const createStat = catchAsync(async (req, res, next)=>{

   

  const stat = await Stat.create(req.body);

  res.status(201).json({
    status:"success",
    data:stat
  })
  
});


const searchState = catchAsync(async (req,res,next)=>{
  if(req.query.statname){
    req.query.statname = { $regex: req.query.statname, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.stat_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(Stat.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const State = await feature.query.populate("user_id");
  const count = await Stat.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:State
  })

});

const getStat = catchAsync(async (req, res, next) => {
  const stat = await Stat.findById({ _id: req.params.id }).populate("user_id");
  if (!stat) {
    return next(new AppErorr("There is not stat in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: stat,
  });
});



const updateStat = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
  
    const stat = await Stat.findByIdAndUpdate(id,req.body,{new:true})
    if (!stat) {
      return next(new AppErorr('stat is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Stat is updated successfully!",
      data:stat
  
    })
});



const deleteStat = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const stat = await Stat.findByIdAndDelete(id)
    if (!stat) {
      return next(new AppErorr('stat is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Stat is  deleted!",
      data:null
  
    })
});


const statListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_list_to_stat','method2']

    if(method_list.includes(method) && method == 'add_list_to_stat'){
      
      try{
       
        
        
        for (let stat of payload.data){
            const filteredBody =  filterObj(stat, "stat_name") ;
           
            const newStat = new Stat(filteredBody);
            await newStat.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Stat is created successfully!",
      })

    }catch(err){      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const statDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {id } = req.params

    const method_list = ['method1','method2']

    if(method_list.includes(method) && method == 'method1'){

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createStat,
  searchState,
  getStat,
  updateStat,
  deleteStat,
  statListDo,
  statDetailDo

}
    
    
    