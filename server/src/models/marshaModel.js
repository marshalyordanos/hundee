
    const mongoose = require('mongoose');

    const marshaSchema = new mongoose.Schema(
        {
        
    
                age:Number,
            
                name:String,
            
                last_name:String,
            
        },
        {
            timestamps:true
        }
    )

    const Marsha = mongoose.model('Marsha',marshaSchema);

    module.exports = Marsha;
    
    