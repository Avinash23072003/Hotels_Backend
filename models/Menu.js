const mongoose=require('mongoose');
const menuItemsSchema=new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,

    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        defult:false
    },
    
})

const MenuItems=mongoose.model('MenuItems',menuItemsSchema);
module.exports=MenuItems;