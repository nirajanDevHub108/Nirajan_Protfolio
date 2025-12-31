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

        stage('Tests') {
            parallel {

                stage('Unit Tests (Jest)') {
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
                }

                stage('End-to-End (Playwright)') {
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

                            PLAYWRIGHT_JUNIT_OUTPUT_NAME=test-results/playwright-results.xml \
                            npx playwright test tests/home.spec.js --reporter=junit
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            junit testResults: '**/test-results/*.xml', allowEmptyResults: true
        }
    }
}