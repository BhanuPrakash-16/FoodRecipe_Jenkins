pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'Java21'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YourUser/FoodRecipe_Jenkins.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend/foodrecipe-backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/foodrecipe-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'jar -cvf FoodRecipe.war -C dist .'
                }
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                // Backend WAR
                sh 'sudo cp backend/foodrecipe-backend/target/foodrecipie.war /var/lib/tomcat9/webapps/'

                // Frontend WAR
                sh 'sudo cp frontend/foodrecipe-frontend/FoodRecipe.war /var/lib/tomcat9/webapps/'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
            echo "Frontend → http://<server-ip>:8080/FoodRecipe/"
            echo "Backend → http://<server-ip>:8080/foodrecipie/"
        }
        failure {
            echo "❌ Deployment Failed! Check Jenkins logs."
        }
    }
}
