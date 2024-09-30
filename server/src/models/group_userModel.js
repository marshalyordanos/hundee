
    const mongoose = require('mongoose');

    const group_userSchema = new mongoose.Schema(
        {
        
    
                fullname:String,
            
                username:String,
            
                email:String,
            
                issystemadmin:Boolean,
             
        },
        {
            timestamps:true
        }
    )

    const Group_user = mongoose.model('Group_user',group_userSchema);

    module.exports = Group_user;
    
    