// Jenkins pipeline for FoodRecipe project
// React frontend + Spring Boot backend → deployed on Tomcat
pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        GIT_REPO = 'https://github.com/BhanuPrakash-16/FoodRecipe_Jenkins.git'
        BRANCH = 'main'
        BACKEND_DIR = 'backend/foodrecipe-backend'
        FRONTEND_DIR = 'frontend/foodrecipe-frontend'
        TOMCAT_USER = 'BhanuPrakash-16'
        TOMCAT_PASS = 'Bhanu#2006'
        TOMCAT_URL = 'http://localhost:9090'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${BRANCH}", url: "${GIT_REPO}"
            }
        }

        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat "mvn clean package -DskipTests"
                    // Rename WAR → foodrecipie.war for Tomcat context
                    bat "rename target\\*.war foodrecipie.war"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat "npm install"
                    bat "npm run build"
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                script {
                    def warDir = "${FRONTEND_DIR}\\war_content"
                    def warName = "FoodRecipe.war"

                    // Cleanup previous WAR content
                    bat "if exist \"${warDir}\" rmdir /s /q \"${warDir}\""
                    bat "mkdir \"${warDir}\\WEB-INF\""
                    bat "mkdir \"${warDir}\\META-INF\""

                    // Copy Vite build output
                    bat "xcopy /E /Y /I \"${FRONTEND_DIR}\\dist\\*\" \"${warDir}\""

                    // Create WAR
                    bat "jar -cvf ${warName} -C ${warDir} ."

                    // Archive artifact in Jenkins
                    archiveArtifacts artifacts: warName, fingerprint: true
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def warFile = "${BACKEND_DIR}\\target\\foodrecipie.war"
                    bat """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file "${warFile}" ^
                        "${TOMCAT_URL}/manager/text/deploy?path=/foodrecipie&update=true"
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def frontendWar = "FoodRecipe.war"
                    bat """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file "${frontendWar}" ^
                        "${TOMCAT_URL}/manager/text/deploy?path=/FoodRecipe&update=true"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
            echo "Frontend → http://localhost:9090/FoodRecipe/"
            echo "Backend → http://localhost:9090/foodrecipie/"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
