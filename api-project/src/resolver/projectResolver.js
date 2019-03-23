import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.PROJECT_PG_DB, { dialect: 'postgres' });

// Create Schema
const Project = sequelize.define('project', {
	title: Sequelize.STRING,
	tagline: Sequelize.STRING,
	about: Sequelize.TEXT,
	twitterURL: Sequelize.STRING,
	websiteURL: Sequelize.STRING,
	facebookURL: Sequelize.STRING,
	linkedInURL: Sequelize.STRING,
	images: Sequelize.ARRAY(Sequelize.STRING),
	user: Sequelize.STRING
});

// add some small resolvers
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
		addProject: async (parent, project) => {
			// ...add validation here...
			await sequelize.sync();
			const newProject = await Project.create({
				title: project.title,
				tagline: project.tagline,
				about: project.about,
				twitterURL: project.twitterURL,
				websiteURL: project.websiteURL,
				facebookURL: project.facebookURL,
				linkedInURL: project.linkedInURL,
				images: project.images,
				user: project.user
			}, { returning: true });

			return newProject;
		},
		updateProject: async (parent, project) => {
			// ...add validation here...
			await sequelize.sync();
			await Project.update(project, {
				where: { id: project.id }
			}, { returning: true });

			const updatedProject = await Project.findAll({ where: { id: project.id } });

			return updatedProject[0];
		},
		deleteProject: async (parent, project) => {
			await sequelize.sync();
			const deletedProject = await Project.destroy({ where: { id: project.id } });

			return deletedProject;
		},
		deleteProjectsByAuthorId: async (parent, project) => {
			await sequelize.sync();
			const deletedProjects = await Project.destroy({ where: { user: project.user } });

			return deletedProjects;
		}
	}
};

export default resolvers;
