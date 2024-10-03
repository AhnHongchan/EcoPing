pipeline {
    agent any

    environment {
        // 공통 환경 변수
        GITLAB_CREDENTIALS_ID = "haejun"
        GITLAB_REPO = "https://lab.ssafy.com/s11-fintech-finance-sub1/S11P21A304.git"
        BRANCH = "develop"
        DOCKER_CREDENTIALS_ID = "docker-hub-haejun"
        SSH_CREDENTIALS_ID = "ssafy-ec2-user"
        SERVER_IP = "13.124.102.223"
        
        // 백엔드용 환경 변수
        BACKEND_DOCKER_IMAGE = "seajun/backend"
        BACKEND_DOCKER_TAG = "${GIT_BRANCH.tokenize('/').last()}-${GIT_COMMIT.substring(0,7)}"
        
        // 프론트엔드용 환경 변수
        FRONTEND_DOCKER_IMAGE = "seajun/nextjs-app"
        FRONTEND_DOCKER_TAG = "${GIT_BRANCH.tokenize('/').last()}-${GIT_COMMIT.substring(0,7)}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: "${GITLAB_CREDENTIALS_ID}", branch: "${BRANCH}", url: "${GITLAB_REPO}"
            }
        }

        // 백엔드 애플리케이션 빌드 및 배포
        stage('Backend - Add Env') {
            steps {
                dir('backend') {
                    withCredentials([file(credentialsId: 'application', variable: 'application')]) {
                        sh '''
                            mkdir -p src/main/resources
                            chmod -R 777 src/main/resources
                            cp ${application} src/main/resources/application.yml
                        '''
                    }
                }
            }
        }

        stage('Backend - Build') {
            steps {
                dir('backend') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean build -Pprofile=prod'
                }
            }
        }

        stage('Backend - Docker Build') {
            steps {
                script {
                    docker.build("${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}", "backend")
                }
            }
        }

        stage('Backend - Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}").push()
                        docker.image("${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}").push("latest")
                    }
                }
            }
        }

        // 프론트엔드 애플리케이션 빌드 및 배포
        stage('Frontend - Docker Build') {
            steps {
                script {
                    dir('newfrontend') {
                        docker.build("${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}")
                    }
                }
            }
        }

        stage('Frontend - Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}").push()
                        docker.image("${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}").push("latest")
                    }
                }
            }
        }

        stage('Prepare Nginx Config') {
            steps {
                script {
                    // GitLab에서 가져온 nginx.conf 파일을 작업 공간에 복사
                    sh 'cp newfrontend/nginx.conf nginx.conf'
                    // 필요한 경우 여기서 nginx.conf 파일을 수정할 수 있습니다
                }
            }
        }
        stage('Copy Nginx Config') {
    steps {
        script {
            sshagent([SSH_CREDENTIALS_ID]) {
                sh '''
                    scp -o StrictHostKeyChecking=no ubuntu@${SERVER_IP}:/home/ubuntu/nginx.conf ./
                '''
            }
        }
    }
}

        // 배포 단계 (백엔드 및 프론트엔드 모두)
        stage('Deploy') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} '
                            # 백엔드 배포
                            docker pull ${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}
                            docker stop backend || true
                            docker rm backend || true
                            docker run -d --name backend -p 8081:8080 ${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG} # Change port to 8081
                            
                            # 프론트엔드 배포
                            docker pull ${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}
                            docker stop frontend || true
                            docker rm frontend || true
                            docker run -d --name frontend -p 3000:3000 ${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}
                            
                            # Nginx 설정 및 실행
                            docker stop nginx || true
                            docker rm nginx || true
                            # Ensure that nginx.conf is a regular file
                            docker run -d --name nginx -p 80:80 -p 443:443 -v /home/ubuntu/nginx.conf:/etc/nginx/nginx.conf:ro -v /etc/letsencrypt:/etc/letsencrypt:ro nginx:alpine

                        '
                    """
                }
            }
        }
    }
}
