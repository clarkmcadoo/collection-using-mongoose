var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var guitarSchema = new Schema({
    brand:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ["Acoustic", "Electric", "Bass"]
    },
    strings:{
        type: Number,
        default: 6,
        min: 4,
        max: 12
    },
    price:{
        type: Number,
        require: true
    }
})    

module.exports = mongoose.model("Guitar", guitarSchema);
