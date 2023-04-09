const validationHandler = require("../validations/validationHandler");
const { Post } = require("../models/post.model");

exports.index = async(req, res, next) => {
   
    try {
        const post = await Post.find({
            user: { $in: [...req.user.following, req.user._id] }
        }).sort({
            createdAt: -1
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
   
}

exports.show = async(req, res, next) => {
    try {
        const post = await Post.findOne({
            _id : req.params.id,
            user: { $in: [...req.user.following, req.user._id] }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
}

exports.save = async (req, res, next) => {
    try {
        validationHandler(req);
        let post = new Post({
            image :  req.file.filename,
            description : req.body.description,
            user: req.user._id
        });
        await post.save(
            (err) =>{
                if(err)console.log('Error in saving');
                else
                console.log('Post saved')
            }
        );   
        res.send(post)
    } catch (err) {
        next(err);
    }
}

exports.updateDescription = async (req, res, next) => {
    try {
        validationHandler(req);
        let post =  await Post.findById(req.params.id);

        if(!post || !post?.user || (post?.user != req.user.id)){
            const error = new Error("Wrong request");
            error.status = 400;
            throw error;
        }

        post.description = req.body.description;
        await post.save(
            (err) =>{
                if(err)console.log('Error in patch update');
                else
                console.log('Post Updated Successfully')
            }
        );   
        res.send(post)
    } catch (err) {
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        let post =  await Post.findById(req.params.id);

        if(!post ||  !post?.user || (post?.user != req.user.id)){
            const error = new Error("Wrong request");
            error.status = 400;
            throw error;
        }
        await post.delete();
        res.send({
            message: "Deleted Successfully"
        })
    } catch (err) {
        next(err);
    }
}