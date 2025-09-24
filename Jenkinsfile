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
        TOMCAT_URL  = 'http://localhost:9090'
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
                    sh "mvn clean package -DskipTests"
                    // Rename WAR → foodrecipie.war for Tomcat context
                    sh "mv target/*.war target/foodrecipie.war"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                script {
                    def warDir = "${FRONTEND_DIR}/war_content"
                    def warName = "${FRONTEND_DIR}/target/FoodRecipe.war"

                    sh "rm -rf ${warDir} ${FRONTEND_DIR}/target"
                    sh "mkdir -p ${warDir}/WEB-INF ${warDir}/META-INF ${FRONTEND_DIR}/target"

                    // Copy React build output
                    sh "cp -r ${FRONTEND_DIR}/build/* ${warDir}/"

                    // Create WAR
                    sh "jar -cvf ${warName} -C ${warDir} ."

                    archiveArtifacts artifacts: "${FRONTEND_DIR}/target/FoodRecipe.war", fingerprint: true
                }
            }
        }

        stage('Deploy Backend to Tomcat') {
            steps {
                script {
                    def warFile = "${BACKEND_DIR}/target/foodrecipie.war"
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file ${warFile} \\
                        "${TOMCAT_URL}/manager/text/deploy?path=/foodrecipie&update=true"
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def frontendWar = "${FRONTEND_DIR}/target/FoodRecipe.war"
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} --upload-file ${frontendWar} \\
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
            echo "Backend  → http://localhost:9090/foodrecipie/"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
