const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
   feedback:{
       type:String,
       required:false,
       default:'',
       trim:true,
   },
   stars:{
    type:Number,
    required:true
   },
   userId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "userSchema"
   }
});

const feedbackForm = mongoose.model('feedbackForm',FeedbackSchema);

module.exports = feedbackForm