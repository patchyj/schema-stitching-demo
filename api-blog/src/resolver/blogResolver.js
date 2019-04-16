/* eslint-disable no-console */
import mongoose from 'mongoose';
import Blog from '../models/Blog';
import config from '../../config';
import throwError from '../../tools/throwErrors';
import checkConnection from '../../tools/checkConnection';

mongoose.Promise = require('bluebird');

// VERIFICATION STEPS
// 1. DOES THE USER NEED AN ACCOUNT?
// 2. DOES THE RESOURCE EXIST?
// (2.5 DOES THE USER EXIST?)
// 3. DOES THE USER HAVE TO BE THE AUTHOR / CREATOR / ADMIN?

// CHECK INTERNET CONNECTION
checkConnection((isConnected) => {
	if (isConnected) {
		// connected to the internet
		console.log('Connected to mLab');
		mongoose.connect(config.BLOG_DB, { useNewUrlParser: true });
	} else {
		// not connected to the internet
		console.log('Connected to localhost');
		mongoose.connect(config.BLOG_DB_LOCAL, { useNewUrlParser: true });
	}
});

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
		addBlog: async (parent, blog, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to add a post');

			const newBlog = new Blog({
				title: blog.title,
				tagline: blog.tagline,
				body: blog.body,
				user: context.user.id
			});

			newBlog.save();

			return newBlog;
		},
		updateBlog: async (parent, blog, context) => {
			if (!context.user) throwError('AUTH', 'You must be authorised to make changes');

			if (blog.user !== context.user.id) throwError('AUTH', 'You must be the author to make changes');

			const updatedBlog = await Blog.findOneAndUpdate(
				{ _id: blog.id },
				blog,
				{ new: true }
			);

			return updatedBlog;
		},
		deleteBlog: async (event, blog, context) => {
			if (blog.user !== context.user.id) throwError('AUTH', 'You must be logged in to delete a post');

			const ifBlog = await Blog.findById(blog.id);

			if (ifBlog === null) throwError('USER', 'No blog found');

			if (blog.user !== context.user.id) throwError('USER', 'You must have permission to delete this post');

			if (ifBlog.user && ifBlog.user !== context.user.id) throwError('AUTH', 'You don\'t have permission to delete this blog');

			await ifBlog.remove();

			const isDeleted = await Blog.findById(blog.id) ? `Blog "${ifBlog.title}" not deleted` : `Blog "${ifBlog.title}" deleted`;

			return isDeleted;
		},
		deleteBlogsByUserId: async (parent, { user }, context) => {
			if (!context.user) throwError('AUTH', 'You must be logged in to delete a post');
			if (user !== context.user.id) throwError('AUTH', 'You don\'t have permission to delete this users\' blogs');

			await Blog.deleteMany({ user });

			const isBlogDeleted = await Blog.findOne({ user }) ? 'Unable to delete' : 'Blog deleted';

			return isBlogDeleted;
		}
	}
};

export default resolvers;
