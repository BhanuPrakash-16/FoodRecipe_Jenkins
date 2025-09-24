pipeline {
    agent any

    tools {
        jdk 'JDK_HOME' 
        maven 'MAVEN_HOME'      // Must match your Jenkins Maven name
    }

    environment {
        TOMCAT_URL = 'http://localhost:9090/manager/text'
        TOMCAT_USER = 'BhanuPrakash-16'    // Your Tomcat manager username
        TOMCAT_PASS = 'Bhanu#2006'    // Your Tomcat manager password

        REPO_URL = 'https://github.com/BhanuPrakash-16/FoodRecipe_Jenkins.git'
        BACKEND_DIR = 'backend/foodrecipe-backend'
        FRONTEND_DIR = 'frontend/foodrecipe-frontend'

        BACKEND_WAR = 'backend/foodrecipe-backend/target/foodrecipie.war'
        FRONTEND_WAR = 'frontend/foodrecipe-frontend/FoodRecipe.war'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.REPO_URL}"
            }
        }

        stage('Build React Frontend') {
            steps {
                script {
                    // Set Node.js path (must configure NODE_HOME in Jenkins)
                    def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}\\bin;${env.PATH}"
                }
                dir("${env.FRONTEND_DIR}") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Package React as WAR') {
            steps {
                script {
                    def warDir = "${env.FRONTEND_DIR}\\war_content"
                    bat "if exist ${warDir} rmdir /S /Q ${warDir}"
                    bat "mkdir ${warDir}\\META-INF"
                    bat "mkdir ${warDir}\\WEB-INF"
                    bat "xcopy /E /Y /I \"${env.FRONTEND_DIR}\\dist\\*\" \"${warDir}\\\""
                    bat "jar -cvf ${env.FRONTEND_WAR} -C ${warDir} ."
                }
            }
        }

        stage('Build Spring Boot Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    bat 'mvn clean package -DskipTests'
                    bat 'rename target\\*.war foodrecipie.war'
                }
            }
        }

        stage('Deploy Backend WAR to Tomcat') {
            steps {
                bat "curl -u ${env.TOMCAT_USER}:${env.TOMCAT_PASS} --upload-file \"${env.BACKEND_WAR}\" \"${env.TOMCAT_URL}/deploy?path=/foodrecipie&update=true\""
            }
        }

        stage('Deploy Frontend WAR to Tomcat') {
            steps {
                bat "curl -u ${env.TOMCAT_USER}:${env.TOMCAT_PASS} --upload-file \"${env.FRONTEND_WAR}\" \"${env.TOMCAT_URL}/deploy?path=/FoodRecipe&update=true\""
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Complete!"
            echo "Frontend → http://localhost:9090/FoodRecipe/"
            echo "Backend → http://localhost:9090/foodrecipie/"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
