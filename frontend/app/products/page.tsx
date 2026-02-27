import { fetchProducts } from "@/lib/api";
import { Product, ProductsResponse } from "@/types";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "产品系列 | 皇室百兰",
  description: "皇室百兰全系列高端床垫，五星级酒店同款，ISO国际认证品质保障。",
};

export default async function ProductsPage() {
  let data: ProductsResponse = { products: [], total: 0, page: 1, limit: 12 };

  try {
    data = await fetchProducts(1, 12);
  } catch {
    // handled below
  }

  return (
    <div>
      {/* Page Header */}
      <div className="pt-24 pb-12 bg-white border-b border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">COLLECTION</p>
          <h1 className="font-display text-4xl md:text-5xl text-[#111111] mb-4">产品系列</h1>
          <p className="text-[#6B6B6B] text-sm max-w-lg leading-relaxed">
            每一款产品都经过严格的工艺验证，为您提供五星级酒店同款的睡眠体验
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-[#F8F8F6] border-b border-[#E2DDD6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-6 overflow-x-auto">
          {["全部产品", "乳胶床垫", "弹簧床垫", "椰棕床垫", "酒店工程款"].map((tag, i) => (
            <button
              key={tag}
              className={`text-xs tracking-widest whitespace-nowrap pb-1 transition-colors ${
                i === 0
                  ? "text-[#111111] border-b border-[#111111]"
                  : "text-[#6B6B6B] hover:text-[#111111]"
              }`}
            >
              {tag}
            </button>
          ))}
          <div className="ml-auto text-xs text-[#6B6B6B] whitespace-nowrap flex-shrink-0">
            共 {data.total} 款产品
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        {data.products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#6B6B6B] text-sm">暂无产品，请确保后端服务已启动</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom trust bar */}
      <div className="bg-white border-t border-[#E2DDD6] py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "ISO双认证", sub: "国际质量保证" },
              { title: "10年质保", sub: "售后无忧" },
              { title: "免费配送", sub: "全国上门安装" },
              { title: "30天试睡", sub: "不满意退换" },
            ].map((b) => (
              <div key={b.title}>
                <p className="text-sm font-semibold text-[#111111] mb-1">{b.title}</p>
                <p className="text-xs text-[#6B6B6B]">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
