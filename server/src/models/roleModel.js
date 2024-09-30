const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
       role_name:{
        type:String,
        unique:true,
        require:true
       },
       users: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        }
      ],
    },
    {
        timestamps:true
    }
)

const Role = mongoose.model('Role',roleSchema);

module.exports = Role;