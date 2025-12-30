pipeline {
    agent any

    stages {
        stage('Install & Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                  npm ci
                  npm run build
                '''
            }
        }

        stage('Unit Tests (Jest)') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                  npm test
                '''
            }
        }

        stage('E2E Tests (Playwright)') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                  npm ci
                  npm install serve --no-save
                  npx serve -s build -l 3000 &
                  sleep 10
                  npx playwright test
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