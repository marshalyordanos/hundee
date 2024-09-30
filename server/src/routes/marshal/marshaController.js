
    const Marsha = require("../../models/marshaModel");
    const AppErorr = require("../../utils/appError");
    const APIFeature = require('../../utils/apiFeature')
    const filterObj = require('../../utils/pick')
    const catchAsync = require("../../utils/catchAsync");





const createMarsha = catchAsync(async (req, res, next)=>{

   

  const marsha = await Marsha.create(req.body);

  res.status(201).json({
    status:"success",
    data:marsha
  })
  
});


const searchMarshal = catchAsync(async (req,res,next)=>{
  if(req.query.marshaname){
    req.query.marshaname = { $regex: req.query.marshaname, $options: 'i' } 

  }
  if(req.query.searchText){
    req.query.marsha_name = { $regex: req.query.searchText, $options: 'i' } 

  }
  const feature = new APIFeature(Marsha.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paging();
  const Marshal = await feature.query;
  const count = await Marsha.countDocuments({});

  res.status(200).json({
    status:'success2',
    total:count,
    data:Marshal
  })

});

const getMarsha = catchAsync(async (req, res, next) => {
  const marsha = await Marsha.findById({ _id: req.params.id });
  if (!marsha) {
    return next(new AppErorr("There is not marsha in this ID", 404));
  }
  res.status(200).json({ 
    status: "success",
    data: marsha,
  });
});



const updateMarsha = catchAsync(async (req, res, next) => {
 
    const { id } = req.params;
  
    const marsha = await Marsha.findByIdAndUpdate(id,req.body,{new:true})
    if (!marsha) {
      return next(new AppErorr('marsha is not found!', 404))
    }
    
    res.status(201).json({
      status: "success",
      message: "The Marsha is updated successfully!",
      data:marsha
  
    })
});



const deleteMarsha = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const marsha = await Marsha.findByIdAndDelete(id)
    if (!marsha) {
      return next(new AppErorr('marsha is not found!', 404))
    }
    res.status(205).json({
      status: "success",
      message: "The Marsha is  deleted!",
      data:null
  
    })
});


const marshaListDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;

    const method_list = ['add_list_to_marsha','method2']

    if(method_list.includes(method) && method == 'add_list_to_marsha'){
      
      try{
       
        
        
        for (let marsha of payload.data){
            const filteredBody =  filterObj(marsha, "marsha_name") ;
           
            const newMarsha = new Marsha(filteredBody);
            await newMarsha.save();
          
        }
       
      
      
      res.status(201).json({
        status: "success",
        message: "The Marsha is created successfully!",
      })

    }catch(err){      
      return next(new AppErorr('Something is wrong!', 400))

    }

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
   
});

const marshaDetailDo = catchAsync(async (req, res, next) => {
    const { method,payload } = req.body;
    const {id } = req.params

    const method_list = ['method1','method2']

    if(method_list.includes(method) && method == 'method1'){

    }else if(method_list.includes(method) && method == 'medthod2'){

    }

    
  
   
    return next(new AppErorr('method is not found!', 404))
});



module.exports = {
  createMarsha,
  searchMarshal,
  getMarsha,
  updateMarsha,
  deleteMarsha,
  marshaListDo,
  marshaDetailDo

}
    
    
    