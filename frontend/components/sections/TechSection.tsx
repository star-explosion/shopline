export default function TechSection() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 4C24 4 12 12 12 24C12 36 24 44 24 44C24 44 36 36 36 24C36 12 24 4 24 4Z" />
          <path d="M18 24C18 20.686 20.686 18 24 18C27.314 18 30 20.686 30 24" />
          <path d="M16 32L32 16" strokeDasharray="3 3" />
        </svg>
      ),
      title: "独立袋装弹簧系统",
      desc: "采用美国礼恩派（Leggett & Platt）弹簧技术，独立筒袋装设计精准对应人体压力分区，高碳钢丝经250-280°C高温热处理",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="16" />
          <path d="M24 8V16M24 32V40M8 24H16M32 24H40" />
          <path d="M15 15L20 20M28 28L33 33M15 33L20 28M28 20L33 15" />
        </svg>
      ),
      title: "进口阻燃面料",
      desc: "面料选用美国杜邦特立珑（DuPont Teflon）纺织工艺，搭配比利时贝卡特（Bekaert）高端布料，通过防火阻燃检测认证",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M24 6L30 18H42L32 26L36 38L24 30L12 38L16 26L6 18H18L24 6Z" />
        </svg>
      ),
      title: "抗菌防螨处理",
      desc: "采用韩国颐康生化科技（YiKang）专业抗菌防螨剂，有效阻断尘螨滋生，面料经进口抗菌阻燃纯棉布处理",
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 36C12 36 16 24 24 24C32 24 36 36 36 36" />
          <path d="M24 24C24 24 20 16 24 8C28 16 24 24 24 24Z" />
          <path d="M10 40H38" />
        </svg>
      ),
      title: "比利时天然乳胶",
      desc: "精选比利时天然乳胶制造商原产乳胶，搭配百兰专利双盈舒适树脂棉与高弹性七孔纤维棉，弹性持久耐用",
    },
  ];

  return (
    <section className="section-padding bg-[#F8F8F6]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs tracking-[0.3em] text-[#C6A86B] mb-3">TECHNOLOGY</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#111111] mb-4">
            核心睡眠科技
          </h2>
          <p className="text-[#6B6B6B] text-sm max-w-lg mx-auto leading-relaxed">
            每一项技术都源于对睡眠科学的深入研究，为您打造真正有益于身体健康的睡眠环境
          </p>
        </div>

        {/* Feature grid:
            Mobile  (<640px):  1-col, horizontal card (icon left, text right)
            Tablet  (640–1023): 2-col, vertical card (icon top-center, text below)
            Desktop (1024px+): 4-col, vertical centered card
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex items-start gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              {/* Icon box */}
              <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-[#E2DDD6] text-[#C6A86B] group-hover:bg-[#C6A86B] group-hover:text-white group-hover:border-[#C6A86B] transition-all duration-300 sm:mx-auto sm:mb-4">
                {f.icon}
              </div>
              {/* Text */}
              <div className="flex-1 sm:flex-none">
                <h3 className="font-semibold text-[#111111] text-sm mb-1.5 sm:mb-3 tracking-wide">
                  {f.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
