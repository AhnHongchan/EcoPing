pipeline {
    agent any

    environment {
        // 공통 환경 변수
        GITLAB_CREDENTIALS_ID = "haejun"  // GitLab 인증 정보
        GITLAB_REPO = "https://lab.ssafy.com/s11-fintech-finance-sub1/S11P21A304.git"  // GitLab 저장소 URL
        BRANCH = "develop"  // 체크아웃할 브랜치
        DOCKER_CREDENTIALS_ID = "dockerhub-hub-haejun"  // Docker Hub 인증 정보
        SSH_CREDENTIALS_ID = "ssafy-ec2-ssh"  // SSH 자격증명 ID
        SERVER_IP = "13.124.102.223"  // 배포할 서버 IP 주소
        
        // 백엔드용 환경 변수
        BACKEND_DOCKER_IMAGE = "seajun/backend"
        BACKEND_DOCKER_TAG = "${GIT_BRANCH.tokenize('/').last()}-${GIT_COMMIT.substring(0,7)}"
        
        // 프론트엔드용 환경 변수
        FRONTEND_DOCKER_IMAGE = "seajun/nextjs-app"
        FRONTEND_DOCKER_TAG = "${GIT_BRANCH.tokenize('/').last()}-${GIT_COMMIT.substring(0,7)}"
        NGINX_IMAGE = "nginx:alpine"  // Nginx 이미지
    }

    stages {
        stage('Clone Repository') {
            steps {
                // GitLab에서 저장소 복제
                git credentialsId: "${GITLAB_CREDENTIALS_ID}", branch: "${BRANCH}", url: "${GITLAB_REPO}"
            }
        }

        // 백엔드 애플리케이션 빌드 및 배포
        stage('Backend - Add Env') {
            steps {
                dir('backend') {  // backend 폴더 기준으로 작업
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
                            docker run -d --name backend -p 8081:8080 ${BACKEND_DOCKER_IMAGE}:${BACKEND_DOCKER_TAG}
                            
                            # 프론트엔드 배포 (Nginx 사용)
                            docker pull ${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}
                            docker stop nginx-container || true
                            docker rm nginx-container || true
                            docker run -d --name nginx-container -p 80:80 -v /path/to/your/nginx.conf:/etc/nginx/conf.d/default.conf:ro ${FRONTEND_DOCKER_IMAGE}:${FRONTEND_DOCKER_TAG}
                        '
                    """
                }
            }
        }
    }
}
