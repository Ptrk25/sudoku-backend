# First stage
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build && \
    mkdir build_app && \
    mv package.json next.config.js public .next node_modules build_app

# Second stage
FROM node:18-slim

ENV BACKEND_PORT=3000

EXPOSE $BACKEND_PORT

WORKDIR /app

COPY --from=builder /app/build_app/ .

ENTRYPOINT ["npm", "start"]