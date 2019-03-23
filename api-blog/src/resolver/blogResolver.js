import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Blog from '../models/Blog';

dotenv.config();
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.BLOG_DB, { useNewUrlParser: true });

// add some small resolvers
const resolvers = {
	Query: {
		allBlogs: async () => {
			const blogs = await Blog.find();
			return blogs;
		},
		blog: async (parent, { id }) => {
			const blog = await Blog.findById(id);
			return blog;
		},
		blogsByAuthorId: async (parent, { authorId }) => {
			const blogs = await Blog.find({ user: authorId });

			return blogs;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addBlog: async (parent, blog) => {
			// ...add validation here...
			const newBlog = new Blog({
				title: blog.title,
				tagline: blog.tagline,
				body: blog.body,
				user: blog.user
			});

			newBlog.save();

			return newBlog;
		},
		updateBlog: async (parent, blog) => {
			const updatedBlog = await Blog.findOneAndUpdate(blog.id, blog, {
				new: true
			});

			return updatedBlog;
		},
		deleteBlog: async (event, blog) => {
			const deletedBlog = await Blog.findByIdAndDelete(blog.id);

			const ifBlog = await Blog.findById(blog.id) ? `Blog "${deletedBlog.title}" not deleted` : `Blog "${deletedBlog.title}" deleted`;

			return ifBlog;
		},
		deleteBlogsByUserId: async (parent, { user }) => {
			await Blog.deleteMany({ user });

			const isBlogDeleted = await Blog.findOne({ user }) ? 'Unable to delete' : 'Blog deleted';

			return isBlogDeleted;
		}
	}
};

export default resolvers;
