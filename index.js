import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// set the "views" folder (default is ./views)
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
let posts = [
  {
    id: 1,
    name: "First Post",
    bio: "Short bio here",
    content: "Full content goes here",
    photo: "img1.jpg",
  },
  {
    id: 2,
    name: "Second Post",
    bio: "Another bio",
    content: "More content here",
    photo: "img2.jpg",
  },
];

app.get("/blog", (req, res) => {
  res.render("blog.ejs", { posts });
});
app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

app.post("/create-post", (req, res) => {
  const { name, bio, content, photo } = req.body;
  const newPost = {
    id: posts.length + 1, // auto-increment ID
    name,
    bio,
    content,
    photo: photo || "default.jpg",
  };
  posts.push(newPost);
  res.redirect("/blog"); // refresh blog to show new post
});
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render("notfound"); // needs notfound.ejs
  }

  res.render("post", { post }); // <-- "post" must match post.ejs file
});

app.get("/login_signup", (req, res) => {
  res.render("login_signup.ejs");
});

app.get("/post/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render("notfound");
  }

  res.render("updatepost", { post });
});

// Update post
app.post("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).render("notfound");
  }

  // Update fields
  post.name = req.body.name;
  post.bio = req.body.bio;
  post.content = req.body.content;
  post.photo = req.body.photo;

  res.redirect(`/post/${postId}`);
});
app.post("/post/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).render("notfound");
  }

  // Remove the post
  posts.splice(postIndex, 1);

  res.redirect("/blog");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
