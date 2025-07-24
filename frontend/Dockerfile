# Etapa de build
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Etapa de produção
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --legacy-peer-deps --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
