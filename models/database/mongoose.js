const mongoose = require('mongoose');

const run = async () => {
  await mongoose.connect("mongodb+srv://penpen:Qwerty09@cluster0.jzy9jwp.mongodb.net/Laundry_Shop?retryWrites=true&w=majority&appName=Cluster0");
  console.log("Connected to myDB");
}

run()
.catch((err) => console.error(err))

// mongoose.connect('mongodb://localhost:27017/Laundry_Shop')
//   .then(() => {
//     console.log('Connection successful');
//   })
//   .catch((error) => {
//     console.error('Something went wrong', error);
// });

const mongo_uri = 'mongodb+srv://penpen:Qwerty09@cluster0.jzy9jwp.mongodb.net/Laundry_Shop?retryWrites=true&w=majority&appName=Cluster0';

  // user account schema 
const User_accSchema = new mongoose.Schema({
    username : {
      type : String, 
      required : true, 
      unique: true
    },
    password : {
      type : String, 
      required : true
    },
    isLoggedin : {
      type : Boolean,
      default : false 
    },
    rememberMe : {
      type : Boolean,
    }
});

  // profile schema
const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'User_accModel',
        required: true
    },
    profile_pic: String,
    firstname: String,
    lastname: String,
    name: String,
    email: String,
    mobnum: Number,
    shortdesc: String,
    ratingCount : Number,
    rating_ave : Number,
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReviewsModel'
    }],
    likes: [{
      reviewId: String,
    }],
    dislikes: [{
      reviewId: String,
    }],
    likesReply: [{
      replyId: String,
    }],
    dislikesReply: [{
      replyId: String,
    }],
});

//reply schema
const ReplySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
      type: String,
      ref: 'User_accModel',
      required: true
  },
  profile_pic: String,
  review: {
      type: String,
      ref: 'ReviewsModel',
      required: true
  },
  title: String,
  content: String,
  date: String,
  likes: Number,
  dislikes: Number
});

//reviews schema 
const ReviewsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    ref: 'User_accModel',
    required: true
  },
  profile_pic: String,
  shop: {
    type: String,
    ref: 'LaundryShopModel',
    required: true
  },
  title: String,
  content: String,
  commentImg : String,
  date: String,
  likes: Number,
  dislikes: Number,
  rating: Number,
  edited : {
    type : Boolean,
    default : false 
  },

  replies: [{
    _id: String,
    username: String,
    profile_pic: String,
    review: String,
    title: String,
    content: String,
    likes: Number,
    dislikes: Number,
    date: String
  }]
});

// laundry shop 
const Laundry_Shop = new mongoose.Schema({
  _id: {
    type: String, // Treat customId as ObjectId
    required: true,
  },
  profile_pic: String,
  shop_name : String, 
  rate_desc : String, 
  timein : String, 
  timeout : String,
  link : String, 
  mobnum : Number,
  address : String, 
  map_img : String,
  ave_rating : Number,
  totalNoRating : Number
});

// laundry_shop_owner
const ShopOwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: 'User_accModel',
    required: true
  },
  profile_pic : String,
  shopname :{
    type : String,
    ref : 'LaundryShopModel'
  },
  email: String,
  mobnum : Number,
  firstname : String,
  lastname : String,
  shortdesc : String,
  likes: [{
    reviewId: String,
  }],
  dislikes: [{
    reviewId: String,
  }],
  likesReply: [{
    replyId: String,
  }],
  dislikesReply: [{
    replyId: String,
  }],
});
  

// models 
const User_accModel = mongoose.model("User_accModel", User_accSchema, "user_acc");
const ProfileModel = mongoose.model("ProfileModel", ProfileSchema, "profile");
const ReviewsModel = mongoose.model("ReviewsModel", ReviewsSchema, "reviews");
const ShopOwnerModel = mongoose.model("ShopOwnerModel", ShopOwnerSchema, "laundry_shop_owner");
const ReplyModel = mongoose.model("ReplyModel", ReplySchema, "reply" );
const LaundryShopModel = mongoose.model("LaundryShopModel", Laundry_Shop, "laundry_shop");


module.exports = {
  User_accModel,
  ProfileModel,
  ReviewsModel,
  ReplyModel,
  ShopOwnerModel,
  LaundryShopModel,
  mongo_uri
};
