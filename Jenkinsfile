pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'Java21'
    }

    environment {
        TOMCAT_HOME = '/path/to/tomcat'  // Change to your local Tomcat folder
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BhanuPrakash-16/FoodRecipe_Jenkins.git'
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
                sh "cp backend/foodrecipe-backend/target/foodrecipie.war $TOMCAT_HOME/webapps/"
                sh "cp frontend/foodrecipe-frontend/FoodRecipe.war $TOMCAT_HOME/webapps/"
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
