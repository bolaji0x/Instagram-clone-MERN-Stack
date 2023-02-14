const User = require ('../models/User.js')
const { StatusCodes } = require ('http-status-codes')
const CustomError = require ('../errors/index.js')
const cloudinary = require("cloudinary")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const followUser = async (req, res) => {
  const myAccount = await User.find({_id: req.params.id, followers: req.user.userId})

  if(myAccount.length > 0) return res.status(500).json({msg: "You followed this user."})

  const otherUser = await User.findOneAndUpdate({_id: req.params.id}, { 
    $push: {followers: req.user.userId}
  }, {new: true}).populate("followers following", "-password")

  const user = await User.findOneAndUpdate({_id: req.user.userId}, {
      $push: {following: req.params.id}
  }, {new: true})

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const unfollowUser = async (req, res) => {
    const otherUser = await User.findOneAndUpdate({_id: req.params.id}, { 
        $pull: {followers: req.user.userId}
    }, {new: true}).populate("followers following", "-password")

    const user = await User.findOneAndUpdate({_id: req.user.userId}, {
        $pull: {following: req.params.id}
    }, {new: true})

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

const searchUser = async (req, res) => {
  const users = await User.find({username: {$regex: req.query.username}}).limit(10).select("fullname username images")
            
  res.status(StatusCodes.OK).json({ users })
    
}

module.exports = { 
    followUser,
    unfollowUser,
    searchUser 
  }
  

