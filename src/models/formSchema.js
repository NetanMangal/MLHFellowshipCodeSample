const mongoose = require('mongoose');
const { boolean } = require('@hapi/joi');

function toLower(value) {
    return value.toLowerCase();
}

const DonarAddressSchema = new mongoose.Schema({
    addressLine1: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine2: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    pincode: {
        type: Number,
        required: true,
        trim: true,
    },

});

const EmergencyContactPersonSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    middleName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    relation: {
        type: String,
        trim: true,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        set: toLower,
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine2: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    pincode: {
        type: Number,
        required: true,
        trim: true,
    },
    mobileNo: {
        type: Number,
        required: true,
        trim: true,
    },
});

// const WitnessSchema = new mongoose.Schema({
//     firstName:{
//         type: String,
//         required: true,
//         maxlength:20,
//         trim:true,
//     },
//     middleName:{
//         type: String,
//         maxlength:20,
//         trim:true,
//     },
//     lastName:{
//         type: String,
//         required: true,
//         maxlength:20,
//         trim:true,
//     },
//     sonDaughterWifeOff:{
//         type: String,
//         required: true,
//         maxlength:20,
//         trim:true,
//     },
//     dateOfBirth:{
//         type:Number,
//         required: true,
//         trim:true,
//     },
//     age:{
//         type: Number,
//         required: true,
//         trim:true,
//         min:1,
//     }, 
//     relation:{
//         type:String,
//         trim:true,
//         required:true,
//     },
//     emailId:{
//         type: String,
//         required:true,
//         trim:true,
//         set: toLower,
//     },
//     addressLine1:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     addressLine2:{
//         type:String,
//         trim:true,
//     },
//     country:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     state:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     city:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     pincode:{
//         type:Number,
//         required:true,
//         trim:true,
//     },
//     mobileNo:{
//        type:Number,
//        required:true,
//        trim:true,
//     },     
// })

const OrganDonationSchema = new mongoose.Schema({
    allOrgans: {
        type: Boolean,
        required: true,
    },
    liver: {
        type: Boolean,
        required: true,
    },
    kidney: {
        type: Boolean,
        required: true,
    },
    heart: {
        type: Boolean,
        required: true,
    },
    intestine: {
        type: Boolean,
        required: true,
    },
    pancreas: {
        type: Boolean,
        required: true,
    },
    lung: {
        type: Boolean,
        required: true,
    },
    allTissues: {
        type: Boolean,
        required: true,
    },
    bones: {
        type: Boolean,
        required: true,
    },
    heartValve: {
        type: Boolean,
        required: true,
    },
    skin: {
        type: Boolean,
        required: true,
    },
    cornea: {
        type: Boolean,
        required: true,
    },
    cartilage: {
        type: Boolean,
        required: true,
    },
    // others: {
    //     type: String,
    //     default: false,
    //     trim: true,
    // },
});

const DonarSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    middleName: {
        type: String,
        maxlength: 20,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    sonDaughterWifeOff: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true,
    },
    dateOfBirth: {
        type: Number,
        required: true,
        trim: true,
    },
    // age: {
    //     type: Number,
    //     required: true,
    //     trim: true,
    //     min: 1,
    // },
    gender: {
        type: String,
        maxlength: 20,
        trim: true,
        required: true
    },
    weight: {
        type: Number,
        trim: true,
        required: true
    },
    height: {
        type: Number,
        trim: true,
        required: true
    },
    bloodGroup: {
        type: String,
        trim: true,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        set: toLower,
    },
    mobileNo: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    photoUrl: {
        type: String,
        default: '',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    address: DonarAddressSchema,
    emergencyContactPerson: EmergencyContactPersonSchema,
    organDonation: OrganDonationSchema,
    // witness: [ WitnessSchema ],
},
    {
        timestamps: true
    });

const PledgeForm = mongoose.model('PledgeForm', DonarSchema);

module.exports = PledgeForm;

