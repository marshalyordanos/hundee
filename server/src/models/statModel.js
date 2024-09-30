
    const mongoose = require('mongoose');

    const statSchema = new mongoose.Schema(
        {
        
    
                name:String,
            
                user_id:String,
            
        },
        {
            timestamps:true
        }
    )

    const Stat = mongoose.model('Stat',statSchema);

    module.exports = Stat;
    
    