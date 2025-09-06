# Step 1: Build React App
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .    

RUN npm run build

# Step 2: Serve the App
FROM node:18-alpine3.18
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/build /app/build

EXPOSE 3000


CMD ["serve", "-s", "build", "-l", "3000"]