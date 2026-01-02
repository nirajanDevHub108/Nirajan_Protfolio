pipeline {
    agent any

    environment {
        NPM_CONFIG_CACHE = "/tmp/.npm"
        NETLIFY_SITE_ID = '1fe4e804-c4e0-435c-ab95-e19aa36773ef'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
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
                            rm -rf node_modules package-lock.json
                            npm install
                            npm test -- --watch=false --reporters=default --reporters=jest-junit
                        '''
                    }
                    post {
                        always {
                            junit testResults: '**/test-results/*.xml', 
                            allowEmptyResults: true,
                            skipPublishingChecks: true 
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
                    echo "Deploying to production . Site Id: $NETLIFY_SITE_ID"
                    node_modules/.bin/netlify status

                    ls -ld build || echo "Build folder missing!"

                    ./node_modules/.bin/netlify deploy \
                        --dir=build \
                        --prod \
                        --site=$NETLIFY_SITE_ID \
                        --auth=$NETLIFY_AUTH_TOKEN \
                        --message="Jenkins Build ${BUILD_NUMBER}"

                '''
            }
        }
    } // end stages
} // end pipeline
