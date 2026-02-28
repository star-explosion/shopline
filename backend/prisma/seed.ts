import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

type ProductSeed = {
  code: "R666" | "R888" | "R999";
  name: string;
  nameEn: string;
  nameJa: string;
  subtitle: string;
  subtitleEn: string;
  subtitleJa: string;
  description: string;
  descriptionEn: string;
  descriptionJa: string;
  price: number;
  originalPrice: number;
  category: "mattress";
  subcategory: "hotel";
  image: string;
  images: string[];
  specifications: Record<string, unknown>;
  features: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  warranty: string;
  deliveryTime: string;
};

async function main() {
  const products: ProductSeed[] = [
    {
      code: "R666",
      name: "皇室百兰 R666 舒享商务床垫",
      nameEn: "Royal Baland R666 Comfort Business Mattress",
      nameJa: "ロイヤルバランド R666 コンフォートビジネスマットレス",
      subtitle: "独立袋装弹簧六环系统 · 1020个精准承托弹簧",
      subtitleEn: "Pocket spring six-ring system · 1020 precision support springs",
      subtitleJa: "独立ポケットスプリング六環システム · 1020基の精密サポートスプリング",
      description:
        "专为高级酒店定制的经济型床垫，采用独立袋装弹簧六环结构，进口抗菌阻燃纯棉面料，1020个独立弹簧提供完美承托。符合国家标准GB10564-89和GB4357-89，适合四星级及商务酒店使用。",
      descriptionEn:
        "An economical mattress tailored for upscale hotels, featuring an independent pocket spring six-ring structure and imported antibacterial flame-retardant cotton fabric. 1020 independent springs provide precise support. Complies with GB10564-89 and GB4357-89, ideal for four-star and business hotels.",
      descriptionJa:
        "高級ホテル向けの経済型マットレス。独立ポケットスプリング六環構造と輸入抗菌難燃純綿生地を採用し、1020個の独立スプリングが精密なサポートを提供。GB10564-89およびGB4357-89に適合し、四つ星・ビジネスホテルに最適。",
      price: 2888,
      originalPrice: 9000,
      category: "mattress",
      subcategory: "hotel",
      image: "/images/products/R666/front.png",
      images: [
        "/images/products/R666/front.png",
        "/images/products/R666/side.png",
        "/images/products/R666/front.png",
      ],
      specifications: {
        springType: "独立袋装弹簧（六环）",
        springCount: "1.8米床: 1020个",
        wireGauge: "2.0mm",
        dimensions: "1.8m x 2.0m x 28cm",
        materials: [
          "进口抗菌阻燃纯棉布",
          "32mm高弹力波浪海棉",
          "18mm透气海棉",
          "高弹力棉 + 丝棉",
        ],
        certifications: ["GB10564-89", "GB4357-89", "ISO9001"],
        firmness: "中等偏硬",
        thickness: "28cm",
      },
      features: [
        "1020个独立袋装弹簧",
        "进口抗菌阻燃面料",
        "六环弹簧结构",
        "4个透气孔设计",
        "百兰刺绣拉手",
        "防烟边带",
        "五年质保",
      ],
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: false,
      stock: 50,
      rating: 4.6,
      reviewCount: 128,
      warranty: "5年质保，弹簧10年保修",
      deliveryTime: "3-7个工作日",
    },
    {
      code: "R888",
      name: "皇室百兰 R888 尊耀五星床垫",
      nameEn: "Royal Baland R888 Prestige Five-Star Mattress",
      nameJa: "ロイヤルバランド R888 プレスティージュファイブスターマットレス",
      subtitle: "助弓加固系统 · 双重防火标准 · 五星级酒店专享",
      subtitleEn: "Reinforced bow system · Dual fire standards · Five-star hotel exclusive",
      subtitleJa: "助弓補強システム · 二重防火基準 · 五つ星ホテル専用",
      description:
        "高端五星级酒店专用床垫，独立袋装弹簧配合16个助弓加固系统，5cm对开山体树脂棉双层结构，超厚隔音棉被。符合英国BS7177及美国CFR1633双重防火标准，为华侨城洲际、静思园豪生等五星级酒店指定供应商。",
      descriptionEn:
        "A premium five-star hotel mattress featuring independent pocket springs with 16 reinforced bows, dual-layer 5cm mountain resin cotton, and extra-thick soundproof padding. Complies with UK BS7177 and US CFR1633 fire standards. Designated supplier for leading five-star hotels.",
      descriptionJa:
        "高級五つ星ホテル専用マットレス。独立ポケットスプリングに16基の助弓補強を組み合わせ、5cm対開山体樹脂綿の二層構造と超厚防音パディングを採用。英国BS7177および米国CFR1633の二重防火基準に適合。五つ星ホテル向け指定供給。",
      price: 3888,
      originalPrice: 16000,
      category: "mattress",
      subcategory: "hotel",
      image: "/images/products/R999/front.png",
      images: [
        "/images/products/R999/front.png",
        "/images/products/R999/side.png",
        "/images/products/R999/front.png",
      ],
      specifications: {
        springType: "独立袋装弹簧（六环）+ 助弓加固",
        springCount: "1.8米床: 1020个弹簧 + 16个助弓",
        wireGauge: "弹簧: 2.0mm, 边框: 5.0mm",
        dimensions: "1.8m x 2.0m x 32cm",
        materials: [
          "进口抗菌阻燃纯棉布",
          "5cm对开山体树脂棉（双层）",
          "高密度树脂棉",
          "超厚隔音棉被",
          "独立筒袋装床网",
        ],
        certifications: [
          "GB10564-89",
          "GB4357-89",
          "英国BS7177阻燃标准",
          "美国CFR1633防火标准",
          "ISO9001",
          "ISO14001",
        ],
        firmness: "中等",
        thickness: "32cm",
      },
      features: [
        "1020个独立袋装弹簧",
        "16个助弓加固系统",
        "5cm山体树脂棉双层",
        "超厚隔音棉被",
        "英国+美国双重防火标准",
        "五星级酒店指定供应商",
        "ABC可调节软硬度系统",
        "十年质保",
      ],
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      stock: 30,
      rating: 4.9,
      reviewCount: 256,
      warranty: "10年质保，终身维护",
      deliveryTime: "3-7个工作日",
    },
    {
      code: "R999",
      name: "皇室百兰 R999 至尊总统床垫",
      nameEn: "Royal Baland R999 Supreme Presidential Mattress",
      nameJa: "ロイヤルバランド R999 サプリームプレジデンシャルマットレス",
      subtitle: "ABC智能调节系统 · 27种组合 · 总统套房级尊享",
      subtitleEn: "ABC smart adjust system · 27 combinations · Presidential-suite luxury",
      subtitleJa: "ABCスマート調整システム · 27通りの組合せ · 大統領スイート級の贅沢",
      description:
        "旗舰级总统套房床垫，采用进口阻燃织锦面料，多层5cm对开山体树脂棉，超厚隔音棉被双层结构。独有ABC三种软硬度可调节系统，27种不同组合，满足不同睡眠习惯。博鳌国宾馆总统别墅指定供应商。",
      descriptionEn:
        "A flagship presidential-suite mattress featuring imported flame-retardant brocade fabric, multiple layers of 5cm mountain resin cotton, and dual-layer extra-thick soundproof padding. Exclusive ABC adjustable firmness system offers 27 combinations to fit different sleep preferences. Designated supplier for presidential villas.",
      descriptionJa:
        "旗艦級の大統領スイートマットレス。輸入難燃織錦生地と多層5cm山体樹脂綿、超厚防音パディング（二層）を採用。独自のABC三種類の硬さ調整システムで27通りの組合せを実現し、睡眠習慣に合わせて最適化。国賓館級施設向け指定供給。",
      price: 5888,
      originalPrice: 26000,
      category: "mattress",
      subcategory: "hotel",
      image: "/images/products/R888/front.png",
      images: [
        "/images/products/R888/front.png",
        "/images/products/R888/side.png",
        "/images/products/R888/front.png",
      ],
      specifications: {
        springType: "独立筒袋装床网 + ABC可调节系统",
        springCount: "1.8米床: 1020个弹簧",
        wireGauge: "2.0mm (高温处理250-280℃)",
        dimensions: "1.8m x 2.0m x 35cm",
        materials: [
          "进口阻燃织锦面料",
          "高弹性七孔纤维棉",
          "百兰专利双层舒适树脂棉",
          "5cm对开山体树脂棉（多层）",
          "高密度树脂棉",
          "高强度抗拉环保纤维布",
          "超厚隔音棉被（双层）",
        ],
        certifications: [
          "GB10564-89",
          "GB4357-89",
          "英国BS7177阻燃标准",
          "美国CFR1633防火标准",
          "ISO9001质量管理体系",
          "ISO14001环保体系",
          "中国名优产品",
          "中国消费者信得过产品",
        ],
        firmness: "可调节（27种组合）",
        thickness: "35cm",
      },
      features: [
        "进口阻燃织锦面料",
        "ABC三种软硬度可调节",
        "27种不同组合选择",
        "多层5cm山体树脂棉",
        "双层超厚隔音棉被",
        "独立筒袋装床网核心",
        "总统套房级配置",
        "博鳌国宾馆指定供应商",
        "高弹性七孔纤维棉",
        "百兰专利舒适系统",
        "终身维护服务",
      ],
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: true,
      stock: 15,
      rating: 5.0,
      reviewCount: 89,
      warranty: "终身质保，3个月一次免费上门保养",
      deliveryTime: "5-10个工作日（定制）",
    },
  ];

  const prune = process.env.SEED_PRUNE === "true";
  if (prune) {
    const deletable = await prisma.product.findMany({
      where: {
        NOT: { code: { in: products.map((p) => p.code) } },
        orderItems: { none: {} },
      },
      select: { id: true },
    });
    const ids = deletable.map((p) => p.id);
    if (ids.length > 0) {
      await prisma.product.deleteMany({ where: { id: { in: ids } } });
    }
  }

  for (const p of products) {
    await prisma.product.upsert({
      where: { code: p.code },
      create: {
        code: p.code,
        name: p.name,
        nameEn: p.nameEn,
        nameJa: p.nameJa,
        subtitle: p.subtitle,
        subtitleEn: p.subtitleEn,
        subtitleJa: p.subtitleJa,
        description: p.description,
        descriptionEn: p.descriptionEn,
        descriptionJa: p.descriptionJa,
        price: p.price,
        originalPrice: p.originalPrice,
        category: p.category,
        subcategory: p.subcategory,
        image: p.image,
        images: JSON.stringify(p.images),
        specifications: JSON.stringify(p.specifications),
        features: JSON.stringify(p.features),
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        isNewArrival: p.isNewArrival,
        stock: p.stock,
        rating: p.rating,
        reviewCount: p.reviewCount,
        warranty: p.warranty,
        deliveryTime: p.deliveryTime,
      },
      update: {
        name: p.name,
        nameEn: p.nameEn,
        nameJa: p.nameJa,
        subtitle: p.subtitle,
        subtitleEn: p.subtitleEn,
        subtitleJa: p.subtitleJa,
        description: p.description,
        descriptionEn: p.descriptionEn,
        descriptionJa: p.descriptionJa,
        price: p.price,
        originalPrice: p.originalPrice,
        category: p.category,
        subcategory: p.subcategory,
        image: p.image,
        images: JSON.stringify(p.images),
        specifications: JSON.stringify(p.specifications),
        features: JSON.stringify(p.features),
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        isNewArrival: p.isNewArrival,
        stock: p.stock,
        rating: p.rating,
        reviewCount: p.reviewCount,
        warranty: p.warranty,
        deliveryTime: p.deliveryTime,
      },
    });
  }

  const count = await prisma.product.count({
    where: { code: { in: products.map((p) => p.code) } },
  });
  console.log(`Seed completed. Upserted ${products.length} products. Current count: ${count}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
