pipeline {
    agent any

    environment {
        NPM_CONFIG_CACHE = "/tmp/.npm"
        NETLIFY_SITE_ID = '1fe4e804-c4e0-435c-ab95-e19aa36773ef'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        JEST_JUNIT_OUTPUT_DIR = "test-results"
    }

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
                    node -v
                    npm -v
                    npm ci
                    npm run build
                    ls -ld build
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
                    npm ci
                    npm test -- --watch=false --reporters=default --reporters=jest-junit
                '''
            }
            post {
                always {
                    junit testResults: '**/test-results/*.xml', allowEmptyResults: true
                }
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
                   
                    # Playwright will now automatically run 'npx serve' based on the config
                    PLAYWRIGHT_JUNIT_OUTPUT_NAME=test-results/playwright.xml \
                    npx playwright test --reporter=junit
                '''
            }
            post {
                always {
                    junit testResults: '**/test-results/*.xml', allowEmptyResults: true
                }
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                    args '-u root' 
                }
            }
            steps {
                sh '''
                    npm install netlify-cli  
                    node_modules/.bin/netlify --version 
                    echo "Deploying to production . Site Id: $NETLIFY_SITE_ID"

                    netlify deploy \
                      --dir=build \
                      --prod \
                      --site=$NETLIFY_SITE_ID \
                      --auth=$NETLIFY_AUTH_TOKEN \
                      --message="Jenkins Build #${BUILD_NUMBER}"
                '''
            }
        }
    }
}
