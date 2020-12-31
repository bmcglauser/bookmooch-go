FROM node:12-stretch AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:alpine

COPY --from=builder /app ./
EXPOSE 4000
CMD ["node", "index.js"]
