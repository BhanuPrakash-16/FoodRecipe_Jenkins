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

                    // Clean previous WAR content
                    bat "if exist \"${warDir}\" rmdir /s /q \"${warDir}\""
                    bat "mkdir \"${warDir}\\WEB-INF\""
                    bat "mkdir \"${warDir}\\META-INF\""

                    // Add minimal web.xml
                    writeFile file: "${warDir}\\WEB-INF\\web.xml", text: '''
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         version="3.1">
</web-app>
'''.stripIndent()

                    // Copy Vite build output
                    bat "xcopy /E /Y /I \"${FRONTEND_DIR}\\dist\\*\" \"${warDir}\""

                    // Create WAR using jar command
                    bat "jar -cvf \"${FRONTEND_DIR}\\${warName}\" -C \"${warDir}\" ."

                    // Move WAR to Jenkins workspace root
                    bat "move \"${FRONTEND_DIR}\\${warName}\" ."

                    // Archive for visibility
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
