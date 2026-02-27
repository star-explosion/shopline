import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data in correct order (foreign key constraints)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: { name: "Guest User", email: "guest@royalbaland.com" },
  });

  const products = [
    {
      name: "云感乳胶弹簧床垫（R-666）",
      description:
        "甄选比利时进口天然乳胶与独立袋装弹簧复合而成，回弹迅速，贴合人体曲线，无干扰睡眠。面料采用美国杜邦特立珑纺织工艺，全年恒温舒适。搭配百兰专利双盈舒适树脂棉与高弹性七孔纤维棉，精准承托腰椎与肩颈。",
      price: 3999,
      image: "/images/R666-1.png",
      images: JSON.stringify(["/images/R666-1.png", "/images/R666-2.png"]),
      stock: 50,
    },
    {
      name: "酒店专供硬感床垫（R-888）",
      description:
        "五星级酒店标配款，采用美国礼恩派（Leggett & Platt）高碳钢弹簧体系，承重均匀，边缘强化不塌陷。经西安万豪、深圳温德姆等国际酒店长期采购验证，耐用性卓越。硬而不硬，提供坚定而有弹性的支撑体验。",
      price: 2499,
      image: "/images/R888-1.png",
      images: JSON.stringify(["/images/R888-1.png", "/images/R888-2.png"]),
      stock: 80,
    },
    {
      name: "豪华旗舰乳胶床垫（R-999）",
      description:
        "皇室百兰顶级工艺旗舰之作。采用比利时贝卡特进口面料、比利时天然乳胶与美国礼恩派高碳钢弹簧三层复合技术，内含百兰专利双盈舒适树脂棉。通过ISO9001与ISO14001双认证，每一张均经过床垫滚压测试机严格检测出厂。国宾馆同款品质。",
      price: 5999,
      image: "/images/R999-1.png",
      images: JSON.stringify(["/images/R999-1.png", "/images/R999-2.png"]),
      stock: 20,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("皇室百兰 seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
