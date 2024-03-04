FROM feelanetcloudacr.azurecr.io/ubuntu2004_nodejs18:2.0

# 기본 폴더 세팅
WORKDIR /app

# Compile된 소스 복사
COPY ./.next ./.next
COPY ./public ./public

# package 파일 복사
COPY ./package.json ./
COPY ./package-lock.json ./

# Production 의존성 패키지 설치
RUN npm ci --omit=dev

COPY ./.env .

CMD npm start