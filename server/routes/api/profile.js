const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')
const ProfileModel = require("../../models/Profile");
const userModel = require("../../models/User");

// @route                              GET api/profile/test
// @desc                               Tests Profile route
// @access                             Public

router.get("/test", (req, res) =>
  res.json({ msg: "Hello this Profile works" })
);

// @route                              GET api/profile/
// @desc                               Get current user's profile
// @access                             Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    ProfileModel.findOne({ user: req.user.id })
    .populate('user',['name','avatar'])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route                              GET api/profile/user/:user_id
// @desc                               Get profile by user ID
// @access                             Public

router.get('/user/:user_id',(req,res)=>{
    const errors={}

    ProfileModel.findOne({user: req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='There is no profile for this user';
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
})

// @route                              GET api/profile/all
// @desc                               Get All profiles
// @access                             Public

router.get('/all',(req,res)=>{
    const errors={}

    ProfileModel.find()
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='There are no profiles';
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
})


// @route                              GET api/profile/handle/:handle
// @desc                               Get profile by handle
// @access                             Public

router.get('/handle/:handle',(req,res)=>{
    const errors={}

    ProfileModel.findOne({handle: req.params.handle})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile='There is no profile for this user';
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
})


// @route                              POST api/profile/
// @desc                               Create user's profile
// @access                             Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors,isValid} = validateProfileInput(req.body)
    //Check validations
    if(!isValid){
        return res.status(400).json(errors)
    }
    // get fields
    const profilefields = {};
    profilefields.user = req.user.id;
    if (req.body.handle) profilefields.handle = req.body.handle;
    if (req.body.company) profilefields.company = req.body.company;
    if (req.body.website) profilefields.website = req.body.website;
    if (req.body.location) profilefields.location = req.body.location;
    if (req.body.bio) profilefields.bio = req.body.bio;
    if (req.body.status) profilefields.status = req.body.status;
    if (req.body.githubrepo) profilefields.githubrepo = req.body.githubrepo;
    //Skills Splits into array
    if (typeof req.body.skills !== "undefined") {
      profilefields.skills = req.body.skills.split(',');
    }
    //Social
    profilefields.social = {};
    if (req.body.youtube) profilefields.social.youtube = req.body.youtube;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

    ProfileModel.findOne({ user: req.user.id })
    .then((profile) => {
      if (profile) {
        //Update
        ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //Create
 
        //Check if handle exists
        ProfileModel.findOne({ handle: profilefields.handle }).then(profile=>{
            if(profile){
                errors.handle='That handle already exists'
                res.status(400).json(errors)
            }
            //Save Profile
            new ProfileModel(profilefields).save().then(profile=>res.json(profile))
        })
      }
    });
  }
);


// @route                              Post api/profile/experience
// @desc                               Add experience to profile
// @access                             Private

router.post('/experience',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const { errors,isValid} = validateExperienceInput(req.body)
    //Check validations
    if(!isValid){
        return res.status(400).json(errors)
    }
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
        const newexp= {
            title : req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        //Add to experience Array
        profile.experience.unshift(newexp)
        profile.save().then(profile=>res.json(profile))
    })
})

// @route                              Post api/profile/education
// @desc                               Add education to profile
// @access                             Private

router.post('/education',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const { errors,isValid} = validateEducationInput(req.body)
    //Check validations
    if(!isValid){
        return res.status(400).json(errors)
    }
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
        const newEdu= {
            school : req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        //Add to education Array
        profile.education.unshift(newEdu)
        profile.save().then(profile=>res.json(profile))
    })
})



// @route                              Delete api/profile/experience/:exp_id
// @desc                               Delete experience from profile
// @access                             Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
       //Get remove index
       const removeIndex = profile.experience
  .map(item => item.id)
  .indexOf(req.params.exp_id);
//when there isn't any exp_id then it'll return -1 index  
// if there is any index then it'll definitely get index of that and it'll not be equal to -1  
if (removeIndex !== -1) { // if not equal to -1 then remove the selected index 
  profile.experience.splice(removeIndex, 1);
  profile.save().then(profile=>res.json(profile)); // Ensure you save after modifying
} else {
  return res.status(404).json({ msg: "Experience not found" });
}
    }).catch(err=>res.status(404).json(err))
})




// @route                              Delete api/profile/education/:edu_id
// @desc                               Delete education from profile
// @access                             Private

router.delete('/education/:edu_id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
       //Get remove index
       const removeIndex= profile.education.map(item=>item.id).indexOf(req.params.edu_id);
       //Splice out of array if there is selected index
       if(removeIndex !== -1){
        profile.education.splice(removeIndex,1)
        //save
        profile.save().then(profile=>res.json(profile))
      }
      else{
        res.status(404).json('Education not found')
      }
    }).catch(err=>res.status(404).json(err))
})


// @route                              Delete api/profile/
// @desc                               Delete profile
// @access                             Private
router.delete('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
  ProfileModel.findOneAndDelete({user: req.user.id})
  .then(()=>{
    userModel.findOneAndDelete({_id: req.user.id})
    .then(()=>res.json({success: true}))
  })
})



module.exports = router;
