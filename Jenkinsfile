pipeline {
    agent any

    stages {
        // this is comment
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u root' // run container as root
                }
            }
            steps {
                sh '''
                    npm config set cache /tmp/.npm --global
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u root' // run container as root
                }
            }
            steps {
                sh '''
                test -f build/index.html
                npm test
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
                    npm install serve --save-dev
                    node_modules/.bin/serve -s build
                    npx playwright test
                '''
            }
        }
    }
    post {
        always {
            junit 'test-results/junit.xml'
        }
      }
}