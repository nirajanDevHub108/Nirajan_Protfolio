pipeline {
    agent any

    environment {
        // Shared cache for performance
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm-cache"
    }

    stages {
        stage('Install & Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u root' // Use root to avoid permission issues in Alpine
                }
            }
            steps {
                sh '''
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
                            args '-u root'
                        }
                    }
                    steps {
                        // Use the already built modules from the first stage
                        sh 'npm test -- --watchAll=false --reporters=default --reporters=jest-junit'
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