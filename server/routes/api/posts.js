const express= require('express')
const router = express.Router()
const mongoose = require("mongoose");
const PostModel= require('../../models/post')
const ProfileModel= require('../../models/Profile')
const passport = require("passport");
const validatePostInput = require('../../validation/post')


// @route                              GET api/posts/test
// @desc                               Tests posts route
// @access                             Public

router.get('/test',(req,res)=>res.json({msg:'Hello this post works'}))

// @route                              GET api/posts/
// @desc                               Get all posts 
// @access                             Public

router.get('/',(req,res)=>{
    PostModel.find()
    .sort({date: -1})
    .then(posts=>{
        if(posts.length !== 0){
            return res.json(posts)
        }
        else{
            return res.status(404).json({err: 'Posts are not found'})
        }
    })
    .catch(err=>res.status(404).json({err: 'Posts not found'}))
})


// @route                              GET api/posts/:id
// @desc                               Get post by id 
// @access                             Public

router.get('/:id',(req,res)=>{
    PostModel.findById(req.params.id)
    .sort({date: -1})
    .then(post=>res.json(post))
    .catch(err=>res.status(404).json({nopostsfound: 'Post not found'}))
})


// @route                              Delete api/posts/:id
// @desc                               Delete posts 
// @access                             Private

router.delete('/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
        PostModel.findById(req.params.id)
        .then(post=>{
            //Check if the logged in user posts this or not
            if(post.user.toString() !== req.user.id){
                return res.status(404).json({notauthorized: 'User Not Authorized'})
            }
            post.deleteOne().then(()=>res.json({success: 'True'}))
        }).catch(err=> res.status(404).json({postnotfound: 'Post Not found'}))
    })
})



// @route                              POST api/posts/like/:id
// @desc                               Like post
// @access                             Private

router.post('/like/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
        PostModel.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({alreadyLiked:'User already liked this post'})
            }
            //Add user ID to likes array
            post.likes.unshift({user: req.user.id})
            post.save().then(post=> res.json(post))
        }).catch(err=> res.status(404).json({postnotfound: 'Post Not found'}))
    })
})



// @route                              POST api/posts/unlike/:id
// @desc                               unlike post
// @access                             Private

router.post('/unlike/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    ProfileModel.findOne({user: req.user.id})
    .then(profile=>{
        PostModel.findById(req.params.id)
        .then(post=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notliked:'User hasnt liked liked this post yet'})
            }
            //Unlike user ID from like [array]
            const removeIndex = post.likes
            .map(item=> item.user.toString())
            .indexOf(req.user.id)

            // Splice out of array
            post.likes.splice(removeIndex,1)
            post.save().then(post=>res.json(post))
        }).catch(err=> res.status(404).json({postnotfound: 'Post Not found'}))
    })
})


// @route                              Post api/posts/
// @desc                               Create posts 
// @access                             Private

router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body) 
    //Check validity
    if(!isValid){
        //Send errors with 400 status 
        return res.status(400).json(errors)
    }
    
    const newPost = PostModel.create({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    }).then(post=>res.json(post))
})

// @route                              POST api/posts/comment/:id
// @desc                               comment post
// @access                             Private
router.post('/comment/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {errors,isValid} = validatePostInput(req.body) 
    //Check validity
    if(!isValid){
        //Send errors with 400 status 
        return res.status(400).json(errors)
    }
    PostModel.findById(req.params.id)
    .then(post=>{
        const newComment={
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
        }

        //Add comment to post
        post.comments.unshift(newComment)
        post.save().then(post=>res.json(post))
    }).catch(err=>res.status(404).json({postnotfound: 'Post not found'}))
})

 

// @route                              Delete api/posts/comment/:id/:comment_id
// @desc                               Delete comment post
// @access                             Private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session: false}),(req,res)=>{
    PostModel.findById(req.params.id)
    .then(post=>{
        //Check if the comment exists
        if(post.comments.filter(comment=> comment._id.toString()=== req.params.comment_id).length === 0){
            return res.status(404).json({commentnotexists:'Comment does not exixts'})
        }
        // get remove index
        const removeIndex = post.comments
        .map(item=> item._id.toString())
        .indexOf(req.params.comment_id)

        //Splice comment outta array
        post.comments.splice(removeIndex,1)
        post.save().then(post=> res.json(post))
    }).catch(err=>res.status(404).json({postnotfound: 'Post not found'}))
})




module.exports = router