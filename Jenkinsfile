// Jenkins pipeline for FoodRecipe project
// React frontend + Spring Boot backend → deployed on Tomcat
pipeline {
    agent any

    // Note: It's a best practice to use the 'tools' block for Jenkins to manage tool paths automatically,
    // but the hard-coded environment variables are valid for a single-machine setup.
    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-21' // Update to your JDK path
        MAVEN_HOME = 'C:\\Program Files\\Apache\\maven-3.9.3' // Update to your Maven path
        NODE_HOME = 'C:\\Program Files\\nodejs' // Update to your Node.js path
        // Adding tools to the PATH for convenience
        PATH = "${JAVA_HOME}\\bin;${MAVEN_HOME}\\bin;${NODE_HOME};${env.PATH}"
        TOMCAT_URL = 'http://localhost:9090/manager/text' // Corrected for the curl command
        TOMCAT_USER = 'BhanuPrakash-16'
        TOMCAT_PASS = 'Bhanu#2006'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/BhanuPrakash-16/FoodRecipe_Jenkins.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend/foodrecipe-backend') {
                    bat 'mvn clean package -DskipTests'
                    // Rename WAR → foodrecipie.war for Tomcat context
                    bat 'rename target\\*.war foodrecipie.war'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/foodrecipe-frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir('frontend/foodrecipe-frontend') {
                    def warName = "FoodRecipe.war"

                    // Use Windows commands for cleanup and directory creation
                    bat "if exist war_content rmdir /s /q war_content"
                    bat "mkdir war_content\\WEB-INF"
                    bat "mkdir war_content\\META-INF"
                    
                    // Copy React build output from 'dist' folder
                    bat "xcopy /E /Y /I \"dist\\*\" \"war_content\""
                    
                    // Ensure the target directory exists before creating the WAR
                    bat "if not exist target mkdir target"

                    // Create WAR directly in the frontend target directory
                    bat "jar -cvf target\\%warName% -C war_content ."

                    // Save artifact in Jenkins
                    archiveArtifacts artifacts: "target\\%warName%", fingerprint: true
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def warFile = "backend\\foodrecipe-backend\\target\\foodrecipie.war"
                    bat """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file "${warFile}" ^
                        "${TOMCAT_URL}/deploy?path=/foodrecipie&update=true"
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def frontendWar = "frontend\\foodrecipe-frontend\\target\\FoodRecipe.war"
                    bat """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file "${frontendWar}" ^
                        "${TOMCAT_URL}/deploy?path=/FoodRecipe&update=true"
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
