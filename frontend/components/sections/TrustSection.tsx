export default function TrustSection() {
  const certs = [
    {
      code: "ISO 9001",
      name: "质量管理体系认证",
      desc: "通过GB/T19001-2016 idt ISO9001:2015标准认证，弹簧床垫生产与销售全流程品控",
    },
    {
      code: "ISO 14001",
      name: "环境管理体系认证",
      desc: "通过ISO14001:2015环境管理体系认证，坚持绿色制造与可持续发展",
    },
    {
      code: "CPED",
      name: "中国著名品牌",
      desc: "经中国企业发展促进委员会评选，皇室百兰入选为中国著名品牌并重点培育推广",
    },
    {
      code: "阻燃",
      name: "防火阻燃检测",
      desc: "产品通过专业防火阻燃检测，面料采用进口阻燃纯棉布，安全性能达到行业高标准",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">CERTIFICATION</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-4">
            国际认证品质保障
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-md mx-auto leading-relaxed">
            每一张床垫均通过严格的国际认证体系，以工业级标准守护您的睡眠品质
          </p>
        </div>

        {/* Cert cards — responsive padding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {certs.map((cert) => (
            <div
              key={cert.code}
              className="border border-[#E2DDD6] p-5 sm:p-8 text-center hover:border-[#C6A86B] transition-colors duration-300 group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 border-2 border-[#C6A86B] rounded-full flex items-center justify-center group-hover:bg-[#C6A86B] transition-colors duration-300">
                <span className="font-display text-xs font-bold text-[#C6A86B] group-hover:text-white tracking-wider transition-colors">
                  {cert.code}
                </span>
              </div>
              <h3 className="font-semibold text-[#111111] mb-2 text-sm tracking-wide">
                {cert.name}
              </h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
