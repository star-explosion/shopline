export interface Review {
  id: number;
  name: string;
  city: string;
  purchaseDate: string;
  rating: number;
  comment: string;
  product: string;
  verified: boolean;
}

export const mockReviews: Review[] = [
  {
    id: 1,
    name: "王先生",
    city: "上海",
    purchaseDate: "3天前购买",
    rating: 5,
    comment:
      "睡了两周，腰不酸了。之前用的普通弹簧床垫，每天早上腰都很不舒服。换了这款之后，背部的支撑感完全不一样，翻身也不会吵到旁边的人，非常满意。",
    product: "云感乳胶弹簧床垫",
    verified: true,
  },
  {
    id: 2,
    name: "李女士",
    city: "深圳",
    purchaseDate: "1周前购买",
    rating: 5,
    comment:
      "和五星级酒店里睡的一模一样！出差住西安万豪的时候特别喜欢那种睡感，后来查到原来就是皇室百兰供货的。买回家之后完全没有失望，入睡速度明显变快了。两个月了，依然保持原来的支撑感，没有任何塌陷迹象。",
    product: "酒店专供硬感床垫（R-888）",
    verified: true,
  },
  {
    id: 3,
    name: "张先生",
    city: "北京",
    purchaseDate: "2周前购买",
    rating: 5,
    comment:
      "比利时乳胶层的包裹感很好，侧睡完全不压肩。我是肩颈不好的人，之前试过几款床垫都不理想。皇室百兰这款侧睡时肩膀自然沉下去，颈椎不再僵硬，睡眠质量提升了很多。",
    product: "豪华旗舰乳胶床垫（R-999）",
    verified: true,
  },
  {
    id: 4,
    name: "陈女士",
    city: "成都",
    purchaseDate: "1个月前购买",
    rating: 4,
    comment:
      "配送和安装服务很好，师傅很专业，把旧床垫也一起搬走了。床垫本身透气性确实比以前好很多，夏天睡不再满身汗。唯一希望能再软一点点，不过整体非常值得。",
    product: "双面可翻转弹簧床垫",
    verified: true,
  },
  {
    id: 5,
    name: "赵先生",
    city: "杭州",
    purchaseDate: "3周前购买",
    rating: 5,
    comment:
      "给父母买的，老人家用了两个月反馈比以前睡得踏实多了。材质天然，没有任何异味，这点对老年人特别重要。30天试睡政策也让我们买得很放心。强烈推荐！",
    product: "椰棕护脊床垫",
    verified: true,
  },
  {
    id: 6,
    name: "刘女士",
    city: "广州",
    purchaseDate: "5天前购买",
    rating: 5,
    comment:
      "我买过三张床垫，这是第一张让我觉得真正值得的。从发现这个品牌到下单，我研究了将近一个月。最终让我下决心的是工厂实拍视频和那份ISO认证资质。收到货之后完全超出预期，做工细腻，没有任何廉价感。",
    product: "豪华旗舰乳胶床垫（R-999）",
    verified: true,
  },
];
