# Shopline MVP

最小可运行电商网站：浏览商品 → 查看详情 → 加入购物车 → 生成订单

## 技术栈

- 前端：Next.js 16 + Tailwind CSS + TypeScript
- 后端：Express + TypeScript
- 数据库：Prisma 7 + SQLite（开发环境）

## 快速启动

### 1. 启动后端

```bash
cd backend
npm install
npm run dev
# 服务运行在 http://localhost:4000
```

首次运行需先执行数据迁移和数据填充：
```bash
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### 2. 启动前端

```bash
cd frontend
npm install
npm run dev
# 访问 http://localhost:3000
```

## 项目结构

```
Shopline/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   └── controllers/
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
└── frontend/         # Next.js
    ├── app/
    │   ├── page.tsx           # 商品列表
    │   ├── products/[id]/     # 商品详情
    │   ├── cart/              # 购物车
    │   └── orders/            # 订单确认
    ├── components/
    ├── context/CartContext.tsx
    └── lib/api.ts
```

## API 接口

| Method | Path                 | 说明         |
|--------|----------------------|--------------|
| GET    | /api/products        | 商品列表     |
| GET    | /api/products/:id    | 商品详情     |
| POST   | /api/orders          | 创建订单     |
| GET    | /api/orders/:id      | 订单详情     |
