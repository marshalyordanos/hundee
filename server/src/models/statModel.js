
    const mongoose = require('mongoose');

    const statSchema = new mongoose.Schema(
        {
        
    
                name:String,
            
                user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            
        },
        {
            timestamps:true
        }
    )

    const Stat = mongoose.model('Stat',statSchema);

    module.exports = Stat;
    
    