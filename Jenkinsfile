pipeline {
    agent any

    environment {
        // Change 'yourdockerhubusername' to your actual Docker Hub username
        DOCKER_IMAGE = 'yourdockerhubusername/devops-dashboard'
        // This links to the credentials we will set up in Jenkins
        DOCKER_CREDS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pulls the latest code from your GitHub repository
                checkout scm
            }
        }

        stage('Install & Test') {
            steps {
                echo 'Installing dependencies and running tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building the Docker container...'
                // Builds the image and tags it with the Jenkins Build ID and 'latest'
                sh "docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} ."
                sh "docker tag ${DOCKER_IMAGE}:${env.BUILD_ID} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                // Logs into Docker Hub securely using the credentials
                sh "echo \$DOCKER_CREDS_PSW | docker login -u \$DOCKER_CREDS_USR --password-stdin"
                sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! Docker image pushed to Docker Hub.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}