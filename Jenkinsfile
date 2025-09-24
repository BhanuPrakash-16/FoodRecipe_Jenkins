// This pipeline automates the build and deployment of a full-stack application
// with a React frontend and a Spring Boot backend.
pipeline {
    // Uses any available Jenkins agent to run the build.
    agent any

    // Defines the tools required for the build, matching the names configured in Jenkins.
    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
    }

    // Defines environment variables for the pipeline, making the script more maintainable.
    environment {
        // Tomcat details for deployment.
        TOMCAT_URL = 'http://localhost:9090/manager/text'
        TOMCAT_USER = 'BhanuPrakash-16'
        TOMCAT_PASS = 'Bhanu#2006'

        // Repository and project directories.
        REPO_URL = 'https://github.com/BhanuPrakash-16/FoodRecipe_Jenkins.git'
        BACKEND_DIR = 'backend/foodrecipe-backend'
        FRONTEND_DIR = 'frontend/foodrecipe-frontend'

        // Corrected WAR file paths with the proper spelling and context path.
        // This is important for Tomcat's deployment manager.
        BACKEND_WAR = 'backend/foodrecipe-backend/target/foodrecipe.war'
        FRONTEND_WAR = 'frontend/foodrecipe-frontend/FoodRecipe.war'
    }

    stages {
        // Stage 1: Clones the Git repository.
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.REPO_URL}"
            }
        }

        // Stage 2: Installs dependencies and builds the React frontend.
        stage('Build React Frontend') {
            steps {
                script {
                    // Ensures the Node.js path is correctly set.
                    def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}\\bin;${env.PATH}"
                }
                dir("${env.FRONTEND_DIR}") {
                    // Installs npm dependencies and runs the build command.
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // Stage 3: Packages the built React app into a .war file.
        // This stage is necessary to deploy a frontend application to a servlet container like Tomcat.
        stage('Package React as WAR') {
            steps {
                script {
                    def warDir = "${env.FRONTEND_DIR}\\war_content"
                    bat """
                        // Cleans up previous WAR content and creates new directories.
                        if exist "${warDir}" rmdir /S /Q "${warDir}"
                        mkdir "${warDir}\\META-INF"
                        mkdir "${warDir}\\WEB-INF"
                        // Copies the built files from the 'build' directory to the WAR content directory.
                        // Corrected from 'dist' to 'build' as it's the default output for 'npm run build'.
                        xcopy /E /Y /I "${env.FRONTEND_DIR}\\build\\*" "${warDir}\\"
                        // Creates the WAR file.
                        jar -cvf "${env.FRONTEND_WAR}" -C "${warDir}" .
                    """
                }
            }
        }

        // Stage 4: Builds the Spring Boot backend using Maven.
        stage('Build Spring Boot Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    // Cleans and packages the backend, skipping tests for a faster build.
                    bat 'mvn clean package -DskipTests'
                    // Corrected WAR file name to 'foodrecipe.war'.
                    bat 'rename target\\*.war foodrecipe.war'
                }
            }
        }

        // Stage 5: Deploys the backend WAR file to Tomcat.
        stage('Deploy Backend WAR to Tomcat') {
            steps {
                // Uses curl to upload the WAR file to Tomcat's manager.
                // The 'path' parameter is the context path for the application.
                bat "curl -u ${env.TOMCAT_USER}:${env.TOMCAT_PASS} --upload-file \"${env.BACKEND_WAR}\" \"${env.TOMCAT_URL}/deploy?path=/foodrecipe&update=true\""
            }
        }

        // Stage 6: Deploys the frontend WAR file to Tomcat.
        stage('Deploy Frontend WAR to Tomcat') {
            steps {
                bat "curl -u ${env.TOMCAT_USER}:${env.TOMCAT_PASS} --upload-file \"${env.FRONTEND_WAR}\" \"${env.TOMCAT_URL}/deploy?path=/FoodRecipe&update=true\""
            }
        }
    }

    // Post-build actions, providing status messages.
    post {
        success {
            echo "✅ Deployment Complete!"
            echo "Frontend → http://localhost:9090/FoodRecipe/"
            echo "Backend → http://localhost:9090/foodrecipe/"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
