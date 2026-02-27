import Image from "next/image";
import { Product } from "@/types";
import { Link } from "@/i18n/navigation";

interface Props {
  products: Product[];
}

export default function ProductHighlightSection({ products }: Props) {
  const featured = products.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">FLAGSHIP PRODUCTS</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111]">
              旗舰产品系列
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-[#6B6B6B] hover:text-[#111111] tracking-widest border-b border-[#E2DDD6] hover:border-[#111111] pb-0.5 transition-colors self-start sm:self-auto"
          >
            查看全部产品 →
          </Link>
        </div>

        {/* Product grid
            Mobile  (<640px):  1 column, show first 2 products
            Tablet  (640–1023): 2 columns, show 2 products (3rd hidden)
            Desktop (1024px+): 3 columns, all 3 shown
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group block ${
                i === 2 ? "hidden lg:block" : ""
              } ${
                i === 1 ? "hidden sm:block" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE9E3] mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
                {i === 0 && (
                  <span className="absolute top-4 left-4 bg-[#C6A86B] text-white text-[10px] tracking-widest px-3 py-1">
                    热销首选
                  </span>
                )}
                {i === 2 && (
                  <span className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] tracking-widest px-3 py-1">
                    旗舰款
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-[#C6A86B] border border-[#C6A86B] px-2 py-0.5 tracking-wider">
                    酒店同款
                  </span>
                </div>
                <h3 className="font-semibold text-[#111111] text-sm mb-1 group-hover:text-[#C6A86B] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed mb-3">
                  {product.description}
                </p>
                <p className="font-display text-xl text-[#C6A86B]">
                  ¥{product.price.toFixed(0)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
