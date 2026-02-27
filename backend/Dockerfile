FROM node:22-slim

WORKDIR /app

COPY package*.json ./

# Copy prisma schema BEFORE npm install so postinstall (prisma generate) can find it
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
