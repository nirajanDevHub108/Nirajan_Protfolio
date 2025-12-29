pipeline {
    agent any

    stages {

        stage('W/o Docker') {
            steps {
                
                sh '''
                echo "Without Docker"
                ls -la
                touch container-no.txt
                '''
            }
        }
        stage('W/ Docker') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo "With Docker"
                ls -la
                touch container-yes.txt
                '''
            }
        }
    }
}