# Microservice Portfolio

## Client

### Tools

- React
- Redux
- Moment
- Bootstrap

### Setup

1. Clone this repository to a location of your choice and move into it
2. Install dependencies using `npm i` or `yarn`
3. Make sure you have the [Oddjob API](https://github.com/patchyj/oddjob-node-api) installed
4. In the API, create a _.env_ file ( `touch .env` )
5. Make sure you have MongoDB running (do `mongod` in a new terminal, or use [mLab](https://mlab.com/) )
6. configure your `.env`:
   ```bash
   PORT=4000
   MONGODB_URI=<your mongodb here>
   SECRET=somesuperdupersecret
   ```
7. By default, the API will try and use a local Mongo Oddjob collection
8. After you've checked the server is running, seed the database. From the API CLI, run `npm run seed`
9. Once seeded, run `npm start` in both the API and Client CLIs
10. Go to [your localhost](http://localhost:3000/login)
11. Email: **test0@test.com**...**test9@test.com** - Password: **password**
12. Enjoy!

### Build

```json
// original script, removed as refused to build if not 100% clean
"prebuild": "npm run lint && npm run test && npm run clean-dist",
```
