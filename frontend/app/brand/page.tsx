import Link from "next/link";

export const metadata = {
  title: "品牌故事 | 皇室百兰",
  description: "惠州市皇室百兰寝具有限公司，专业酒店床垫工程项目供应商，ISO9001及ISO14001双认证企业。",
};

const certs = [
  { code: "ISO 9001", name: "质量管理体系", year: "2022年", desc: "通过NOA认证机构审核，符合GB/T19001-2016 idt ISO9001:2015标准，认证范围覆盖弹簧床垫的生产和销售" },
  { code: "ISO 14001", name: "环境管理体系", year: "持续认证", desc: "通过ISO14001:2015环境管理体系认证，坚持绿色制造理念，承担企业环保责任" },
  { code: "CPED", name: "中国著名品牌", year: "2023年", desc: "经中国企业发展促进委员会评选，皇室百兰品牌床垫系列入选为中国著名品牌（证书编号：CPED-ZM30740）" },
  { code: "阻燃检测", name: "防火阻燃认证", year: "持续检测", desc: "产品通过国家级防火阻燃检测，面料采用进口阻燃纯棉布，安全性能符合行业高标准" },
];

const hotelCases = [
  { name: "澳门国宾馆", en: "Macau State Guest House", desc: "国家元首下榻指定用品。习主席参加澳门回归祖国二十周年庆典期间下榻澳门国宾馆，使用皇室百兰寝具产品。" },
  { name: "博鳌国宾馆（总统别墅）", en: "Boao State Guest House", desc: "博鳌亚洲论坛一号楼总统别墅指定寝具供应商，多位国家领导人下榻期间均使用皇室百兰产品。" },
  { name: "万豪酒店 · 温德姆酒店集团", en: "Marriott · Wyndham", desc: "长期服务西安万豪酒店、深圳/汕尾/肇庆/佛山/株洲/凯里等多家温德姆酒店，提供定制化床垫解决方案。" },
  { name: "豪生酒店 · 华美达酒店", en: "Howard Johnson · Ramada", desc: "深度合作多年，服务新余豪生大酒店、海口新埠岛豪生大酒店、广州凯旋华美达大酒店等。" },
];

const milestones = [
  { year: "2018", event: "惠州市皇室百兰寝具有限公司正式注册成立，注册资本壹仟万元，落户惠州市惠阳区" },
  { year: "2019", event: "与美国礼恩派、比利时贝卡特等国际供应商建立战略合作关系，引进先进弹簧技术与高端面料" },
  { year: "2020", event: "通过ISO9001质量管理体系与ISO14001环境管理体系双认证，建立系统化品控流程" },
  { year: "2021", event: "深度服务温德姆酒店集团中国区多家门店，成为其长期寝具供应商" },
  { year: "2022", event: "获得NOA认证机构颁发的ISO9001:2015质量管理体系认证证书" },
  { year: "2023", event: "入选「中国著名品牌」，合作酒店网络持续拓展，产品远销港澳台地区" },
];

const engineeringCases = [
  { name: "澳门国宾馆", desc: "国家元首下榻指定寝具" },
  { name: "博鳌国宾馆一号楼（总统别墅）", desc: "博鳌论坛国际会议指定寝具" },
  { name: "西安万豪酒店", desc: "国际五星级酒店" },
  { name: "深圳温德姆至尊酒店", desc: "温德姆集团旗下" },
  { name: "张家界纳百利皇冠酒店", desc: "旅游度假五星级" },
  { name: "广州白云宾馆", desc: "广州标志性酒店" },
  { name: "深圳上海宾馆", desc: "深圳知名酒店" },
  { name: "惠州半岛格兰云天国际大酒店", desc: "五星级国际酒店" },
  { name: "广州凯旋华美达大酒店", desc: "华美达品牌旗下" },
  { name: "新余豪生大酒店", desc: "豪生品牌旗下" },
];

export default function BrandPage() {
  return (
    <div>
      <div className="relative pt-32 pb-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=1600&q=70')" }}>
        <div className="absolute inset-0 bg-[#111111]/70" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-white">
          <p className="text-xs tracking-[0.4em] text-[#C6A86B] mb-4">ABOUT US</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight max-w-xl">酒店床垫<br />工程专家</h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-lg">惠州市皇室百兰寝具有限公司（Royal Baland），专业从事酒店床垫工程项目，是一家集研发、生产、销售高品质床垫及软床系列产品为一体的生产型企业。</p>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">OUR STORY</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#111111] mb-6 leading-snug">合作 · 共赢<br />健康 · 舒适</h2>
              <div className="space-y-4 text-sm text-[#6B6B6B] leading-loose">
                <p>皇室百兰寝具有限公司设有深圳总部及惠州生产基地，总面积达8000平方米，拥有员工70多人。公司通过ISO9001:2015质量管理体系认证和ISO14001:2015环境管理体系环保认证。</p>
                <p>企业快速发展得益于先进的技术与团队力量：技术方面，选择了国际上最优秀的合作伙伴——美国礼恩派、美国杜邦特立珑纺织、德国恩科远红外线科技公司、韩国颐康生化科技公司、比利时天然乳胶制造商、比利时贝卡特纺织布料商、中国医学睡眠研究中心等。</p>
                <p>皇室百兰以"以人为本"为管理方针，产品的市场份额不断扩大，销售网络遍布国内各大中城市及港澳台地区，与众多国际知名酒店深入合作。</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ n: "30+", l: "合作酒店" }, { n: "8000㎡", l: "生产基地" }, { n: "70+", l: "专业团队" }, { n: "ISO²", l: "双认证企业" }].map((s) => (
                <div key={s.l} className="bg-[#F8F8F6] border border-[#E2DDD6] p-6 text-center">
                  <p className="font-display text-3xl text-[#C6A86B] font-semibold mb-1">{s.n}</p>
                  <p className="text-xs text-[#6B6B6B] tracking-widest">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F8F8F6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">MILESTONES</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#111111]">品牌发展历程</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E2DDD6] hidden md:block" />
            <div className="space-y-6 md:space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className={`md:grid md:grid-cols-2 md:gap-8 items-start ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-last"}`}>
                  <div className={`pb-6 md:pb-10 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                    <span className="inline-block text-[#C6A86B] font-display text-2xl font-semibold mb-1">{m.year}</span>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{m.event}</p>
                  </div>
                  <div className="hidden md:flex items-start justify-start">
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#C6A86B] rounded-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">CERTIFICATIONS</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#111111] mb-4">资质认证</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert) => (
              <div key={cert.code} className="border border-[#E2DDD6] p-6 hover:border-[#C6A86B] transition-colors duration-300 group">
                <div className="w-14 h-14 border-2 border-[#C6A86B] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#C6A86B] transition-colors">
                  <span className="font-display text-xs font-bold text-[#C6A86B] group-hover:text-white tracking-wider transition-colors">{cert.code}</span>
                </div>
                <p className="font-semibold text-[#111111] text-sm mb-1">{cert.name}</p>
                <p className="text-[10px] text-[#C6A86B] mb-3">{cert.year}</p>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F8F8F6]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">PARTNERSHIPS</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#111111] mb-4">合作酒店</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotelCases.map((hotel) => (
              <div key={hotel.en} className="bg-white border border-[#E2DDD6] p-7 hover:border-[#C6A86B] transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#111111] text-sm group-hover:text-[#C6A86B] transition-colors">{hotel.name}</h3>
                    <p className="text-[10px] text-[#6B6B6B] tracking-widest uppercase mt-0.5">{hotel.en}</p>
                  </div>
                </div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{hotel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">PROJECT CASES</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#111111]">工程案例</h2>
          </div>
          <div className="border border-[#E2DDD6]">
            {engineeringCases.map((c, i) => (
              <div key={c.name} className={`flex items-center justify-between px-6 py-5 hover:bg-[#F8F8F6] transition-colors ${i < engineeringCases.length - 1 ? "border-b border-[#E2DDD6]" : ""}`}>
                <div className="flex items-center gap-5">
                  <span className="font-display text-2xl text-[#E2DDD6] w-8 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-[#111111]">{c.name}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-6">
                  <p className="text-xs text-[#6B6B6B]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">OUR FACTORY</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6">现代化生产基地</h2>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-10 leading-relaxed">深圳总部及惠州生产基地总面积达8000平方米，拥有专业团队70多人。配备床垫滚压测试机等专业检测设备，确保每一张床垫出厂品质。</p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {["8000㎡ 生产基地", "70+ 专业团队", "ISO² 双认证"].map((s) => (
              <div key={s} className="border border-white/10 py-6 px-4">
                <p className="text-white text-sm leading-relaxed">{s.split(" ")[0]}</p>
                <p className="text-white/40 text-xs mt-1">{s.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 p-6 mb-10 text-left max-w-lg mx-auto">
            <p className="text-white/70 text-xs leading-relaxed mb-2">
              <span className="text-[#C6A86B]">地址：</span>惠州市惠阳区秋长镇茶园村将军路迅扬高科园1号楼
            </p>
            <p className="text-white/70 text-xs leading-relaxed mb-2">
              <span className="text-[#C6A86B]">电话：</span>0752-5898301
            </p>
            <p className="text-white/70 text-xs leading-relaxed">
              <span className="text-[#C6A86B]">传真：</span>0752-5898306
            </p>
          </div>

          <Link href="/products" className="inline-block px-12 py-4 bg-[#C6A86B] text-white text-sm tracking-[0.2em] hover:bg-[#A8884A] transition-colors duration-300">
            探索产品系列
          </Link>
        </div>
      </section>
    </div>
  );
}
