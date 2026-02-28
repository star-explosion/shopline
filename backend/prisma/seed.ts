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
      name: "皇室百兰 R666 五星级酒店床垫",
      nameEn: "Royal Baland R666 Five-Star Hotel Mattress",
      nameJa: "ロイヤルバランド R666 五つ星ホテルマットレス",
      description:
        "专为高级酒店定制的经济型床垫，采用独立袋装弹簧六环结构，进口抗菌阻燃纯棉面料，1020个独立弹簧提供完美承托。符合国家标准，适合四星级及商务酒店使用。",
      descriptionEn:
        "Economical hotel mattress featuring independent pocket spring hexagonal structure, imported antibacterial flame-retardant cotton fabric, 1020 independent springs providing perfect support. Meets national standards, suitable for 4-star and business hotels.",
      descriptionJa:
        "高級ホテル向け経済型マットレス、独立袋装スプリング六環構造、輸入抗菌難燃純綿生地、1020個の独立スプリングが完璧なサポートを提供。国家基準に適合。",
      price: 5999,
      originalPrice: 8999,
      category: "mattress",
      subcategory: "hotel",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        "https://images.unsplash.com/photo-1617325247661-69c5631e9aa7",
        "https://images.unsplash.com/photo-1616594039964-ae90fc752431",
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
      name: "皇室百兰 R888 高端酒店床垫",
      nameEn: "Royal Baland R888 Premium Hotel Mattress",
      nameJa: "ロイヤルバランド R888 高級ホテルマットレス",
      description:
        "高端五星级酒店专用床垫，独立袋装弹簧配合助弓加固系统，5cm对开山体树脂棉双层结构，超厚隔音棉被，符合英国BS7177及美国CFR1633防火标准，为华侨城洲际、静思园豪生等五星级酒店指定供应商。",
      descriptionEn:
        "Premium five-star hotel mattress with independent pocket springs and reinforced bow system, 5cm dual-layer mountain resin cotton, extra-thick soundproof cotton. Complies with UK BS7177 and US CFR1633 fire standards. Designated supplier for InterContinental and Hilton hotels.",
      descriptionJa:
        "高級五つ星ホテル専用マットレス、独立袋装スプリングと助弓補強システム、5cm対開山体樹脂棉二層構造、超厚防音綿。英国BS7177及び米国CFR1633防火基準に適合。",
      price: 9999,
      originalPrice: 15999,
      category: "mattress",
      subcategory: "hotel",
      image: "https://images.unsplash.com/photo-1522771753035-4a50423a5a63",
      images: [
        "https://images.unsplash.com/photo-1522771753035-4a50423a5a63",
        "https://images.unsplash.com/photo-1618221195719-dd68f397fbbd",
        "https://images.unsplash.com/photo-1617103996702-96ff29b1c467",
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
      name: "皇室百兰 R999 总统套房床垫",
      nameEn: "Royal Baland R999 Presidential Suite Mattress",
      nameJa: "ロイヤルバランド R999 大統領スイートマットレス",
      description:
        "旗舰级总统套房床垫，采用进口阻燃织锦面料，多层5cm对开山体树脂棉，高密度树脂棉，超厚隔音棉被双层结构，独立筒袋装床网核心支撑。独有ABC三种软硬度可调节系统，27种不同组合，满足不同睡眠习惯。博鳌国宾馆总统别墅指定供应商。",
      descriptionEn:
        "Flagship presidential suite mattress featuring imported flame-retardant brocade fabric, multiple layers of 5cm mountain resin cotton, high-density resin cotton, dual-layer extra-thick soundproof cotton, independent pocket spring core. Exclusive ABC adjustable firmness system with 27 different combinations. Designated supplier for Boao National Hotel Presidential Villa.",
      descriptionJa:
        "旗艦級大統領スイートマットレス、輸入難燃織錦生地、複数層5cm山体樹脂棉、高密度樹脂綿、超厚防音綿二層構造、独立筒袋装床網コアサポート。独自のABC三種類軟硬度調整可能システム、27種異なる組合せ。",
      price: 15999,
      originalPrice: 25999,
      category: "mattress",
      subcategory: "hotel",
      image: "https://images.unsplash.com/photo-1590523741831-ab7f850fb9b4",
      images: [
        "https://images.unsplash.com/photo-1590523741831-ab7f850fb9b4",
        "https://images.unsplash.com/photo-1616594039964-ae90fc752431",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
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
