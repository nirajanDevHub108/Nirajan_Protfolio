pipeline {
    agent any

    environment {
        NPM_CONFIG_CACHE = "/tmp/.npm"
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u node'
                }
            }
            steps {
                sh '''
                    whoami
                    node --version
                    npm --version
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u node'
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    npm test -- --watch=false
                '''
            }
        }

        stage('End-to-End') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm ci
                    npx serve -s build &
                    sleep 10
                    npx playwright test tests/home.spec.js
                '''
            }
        }
    }

    post {
        always {
            junit 'test-results/*.xml'
        }
    }
}