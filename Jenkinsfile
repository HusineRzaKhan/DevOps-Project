

pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/HusineRzaKhan/DevOps-Project.git'
            }
        }


        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myflaskapp:part1 .'
            }
        }

        stage('Run Flask App') {
            steps {
                sh 'docker run -d -p 5000:5000 myflaskapp:part1'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

