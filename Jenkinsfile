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
                        image 'mcr.microsoft.com' // Use latest 2025 stable image
                        reuseNode true
                    }
        }
        steps {
            sh '''
                npm ci
                npx serve -s build &
                sleep 10
                # Tell Playwright to output JUnit XML to the specific folder Jenkins expects
                PLAYWRIGHT_JUNIT_OUTPUT_NAME=test-results/results.xml npx playwright test tests/home.spec.js --reporter=junit
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