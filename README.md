# Pre Requisites

1. git
2. docker desktop
3. node v22 and above

# Initializing the Application

1. Run `initial-setup.sh` (in project root) to copy default config files to local environment
2. Run `docker compose -p school-portal up -d` to initialize mysql
3. Initialize local database once with by running `init-script-docker.sh` (in `school-portal-backend/ddl` directory)

# Starting the Application

1. Start the backend server, run `npm run start:nodemon` in the `school-portal-backend` directory
2. Start the frontend server, run `npm start` in the `school-portal-web` directory
3. Start common module incremental compilation, run `npm run build:watch` in the `school-portal-common` directory
