/* eslint-disable no-console */
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import Blog from '../models/Blog';
import config from '../../config/config';

mongoose.Promise = require('bluebird');

mongoose.connect(config.BLOG_DB, { useNewUrlParser: true });

// add some small resolvers
const resolvers = {
	Query: {
		allBlogs: async () => {
			const blogs = await Blog.find();
			return blogs;
		},
		blog: async (parent, { id }, context) => {
			const blog = await Blog.findById(id);
			return blog;
		},
		blogsByAuthorId: async (parent, { authorId }, context) => {
			console.log(context);

			const blogs = await Blog.find({ user: authorId });

			return blogs;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addBlog: async (parent, blog, context) => {
			if (!context.user) {
				throw new AuthenticationError('You must be a member to add a post');
			}

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
			if (blog.user !== context.user.id) {
				throw new AuthenticationError('You must be the author to make changes');
			}

			const updatedBlog = await Blog.findOneAndUpdate(
				{ _id: blog.id },
				blog,
				{ new: true }
			);

			return updatedBlog;
		},
		deleteBlog: async (event, blog, context) => {
			if (!context.user) {
				throw new AuthenticationError('You must be logged in to delete a post');
			}

			const ifBlog = await Blog.findById(blog.id);

			if (!ifBlog) {
				throw new UserInputError('No post found. Please provide an ID');
			}

			if (ifBlog.user && ifBlog.user !== context.user.id) {
				throw new AuthenticationError('You don\'t have permission to delete this blog');
			}

			await ifBlog.remove();

			const isDeleted = await Blog.findById(blog.id) ? `Blog "${ifBlog.title}" not deleted` : `Blog "${ifBlog.title}" deleted`;

			return isDeleted;
		},
		deleteBlogsByUserId: async (parent, { user }, context) => {
			if (!context.user) {
				throw new AuthenticationError('You must be logged in to delete a post');
			}

			if (user !== context.user.id) {
				throw new AuthenticationError('You don\'t have permission to delete this users\' blogs');
			}

			await Blog.deleteMany({ user });

			const isBlogDeleted = await Blog.findOne({ user }) ? 'Unable to delete' : 'Blog deleted';

			return isBlogDeleted;
		}
	}
};

export default resolvers;
