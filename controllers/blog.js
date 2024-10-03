// controllers/blog.js
const blogModel = require('../models/blog/blogModel'); // Ensure the path is correct

const addBlog = async (req, res) => {
    console.log("add blog");
    res.render('src/html/addBlog');
};

const viewBlog = async (req, res) => {
    console.log("view blog controller");


    const blogData = await blogModel.find({});
    console.log("blogData", blogData);
    res.render('src/html/viewBlog', { data: req.user, blogData: blogData });
};

const addBlogController = async (req, res) => {
    console.log("add blog controller");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const data = {
        title: req.body.title,
        content: req.body.content,
        blog_img:  req.file ? req.file.path : null
    };

    let newBlog = new blogModel(data);
    console.log("db", newBlog);
    await newBlog.save();
    res.redirect('/');
};

const editController = async (req, res) => {

    const blogEntry = await blogModel.findById(req.params.id);

    res.render('src/html/editBlog', { blog: blogEntry });

};

const updateController = async (req, res) => {

    const blogEntry = await blogModel.findById(req.params.id);

    blogEntry.title = req.body.title;
    blogEntry.content = req.body.content;

    if (req.file) {
        blogEntry.blog_img = req.file.path;
    }

    await blogEntry.save();
    res.redirect('/viewBlog');
};

const deleteController = async (req, res) => {

    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);

    res.redirect('/viewBlog');
};

// all blogs

const allBlog = async (req, res) => {
    const blogData = await blogModel.find({});
    res.render('src/html/allBlog', { data: req.user, blogData: blogData });
}

module.exports = { addBlog, addBlogController, viewBlog, editController, updateController, deleteController  , allBlog };
