import Sequelize from 'sequelize';
import config from '../../config';
import throwError from '../../tools/throwErrors';

const sequelize = new Sequelize(config.PROJECT_PG_DB, { dialect: 'postgres' });

// CREATE SCHEMA
// SEQUELIZE.JS MAKES IT DIFFICULT TO EXTRACT THE MODEL INTO ANOTHER FILE
const Project = sequelize.define('project', {
	title: { type: Sequelize.STRING, allowNull: false },
	tagline: { type: Sequelize.STRING, allowNull: false },
	about: { type: Sequelize.TEXT, allowNull: false },
	twitterURL: { type: Sequelize.STRING },
	websiteURL: { type: Sequelize.STRING },
	facebookURL: { type: Sequelize.STRING },
	linkedInURL: { type: Sequelize.STRING },
	images: { type: Sequelize.ARRAY({ type: Sequelize.STRING }) },
	user: { type: Sequelize.STRING }
});

// ADD SOME SMALL RESOLVERS
const resolvers = {
	Query: {
		allProjects: async () => {
			const projects = await Project.findAll();
			return projects;
		},
		project: async (parent, { id }) => {
			const project = await Project.findAll({ where: { id } });
			return project[0];
		},
		projectsByAuthorId: async (parent, { authorId }) => {
			const projects = await Project.findAll({ where: { user: authorId } });
			return projects;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addProject: async (parent, project, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to add a project');

			// ...add validation here...
			await sequelize.sync();
			const newProject = await Project.create(
				{
					title: project.title,
					tagline: project.tagline,
					about: project.about,
					twitterURL: project.twitterURL,
					websiteURL: project.websiteURL,
					facebookURL: project.facebookURL,
					linkedInURL: project.linkedInURL,
					images: project.images,
					user: context.user.id
				},
				{ returning: true }
			);

			return newProject;
		},
		updateProject: async (parent, project, context) => {
			if (!context.user) throwError('AUTH', 'You must be authorised to make changes');

			if (project.user !== context.user.id) throwError('AUTH', 'You must be the project\'s author to make changes');

			await sequelize.sync();
			await Project.update(
				project, // BODY TO UPDATE
				{
					where: { id: project.id }
				},
				{ returning: true } // RETURNS NUMBER OF RECORDS UPDATED, NOT THE INSTANCES THEMSELVES
			);

			// HAVE TO QUERY AGAIN TO GET UPDATED RECORD
			const updatedProject = await Project.findAll({
				where: { id: project.id }
			});

			return updatedProject[0];
		},
		deleteProject: async (parent, { id }, context) => {
			if (!context.user) throwError('AUTH', 'You must be logged in to delete a post');
			
			await sequelize.sync();
			const project = await Project.findOne({ where: { id } });
			
			if (!project.user) throwError('USER', 'No project found. Please provide an ID');
			if (project.user && project.user !== context.user.id) throwError('AUTH', 'You don\'t have permission to delete this project');

			await Project.destroy({ where: { id } });

			const ifProject = (await Project.findOne({ where: { id } }))
				? 'Something went wrong'
				: 'Deleted';

			return ifProject;
		},
		deleteProjectsByAuthorId: async (parent, project) => {
			await sequelize.sync();
			const deletedProjects = await Project.destroy({
				where: { user: project.user }
			});

			return deletedProjects;
		}
	}
};

export default resolvers;
