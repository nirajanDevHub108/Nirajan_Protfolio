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

        stage('Run Parallel Tests') {
            parallel {
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
                            npm test -- --watch=false --reporters=default --reporters=jest-junit
                        '''
                    }
                    post {
                        always {
                            junit testResults: '**/test-results/*.xml', allowEmptyResults: true
                        }
                    }
                }
            } // end parallel
        } // end stage Run Parallel Tests

        stage('End-to-End') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    PLAYWRIGHT_JUNIT_OUTPUT_NAME=test-results/playwright-results.xml \
                    npx playwright test tests/home.spec.js --reporter=junit
                '''
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u node'
                }
            }
            steps {
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify --version
                '''
            }
        }
    } // end stages
} // end pipeline
