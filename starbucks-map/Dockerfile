FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm @angular/cli

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .

EXPOSE 4200
CMD ["pnpm", "start"]