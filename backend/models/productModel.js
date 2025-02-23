import mongoose from 'mongoose'

const productschema = new mongoose.Schema({


    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean},
    images:{type:Array,required:true},

   
    date:{type:Number,required:true}

})

const productModel =mongoose.models.products|| mongoose.model("product",productschema)

export default productModel;