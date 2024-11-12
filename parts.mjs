// 定义各个价格表数据
const priceTables = {
  // ----------------- 海运 -----------------
  // ----------------- 大发 -----------------
  // 日本海运专线
  // 日本海运专线的价格表
  seaShipping: [
    {
      type: "sea", // 标注为海运
      warehouse: "深圳", // 仓库：深圳
      basePrice: 110, // 基础价格：110元/1kg
      additionalPrice: 14, // 续重价格：每增加1kg，价格增加14元
      unit: 1, // 续重单位：1kg
    },
    {
      type: "sea", // 标注为海运
      warehouse: "上海", // 仓库：上海
      basePrice: 90, // 基础价格：90元/1kg
      additionalPrice: 11, // 续重价格：每增加1kg，价格增加11元
      unit: 1, // 续重单位：1kg
    },
  ],
  // ----------------- 大发end -----------------

  // ----------------- 日速达 -----------------
  // 邮政海运价格表
  postalSeaShipping: [
    {
      type: "sea", // 标注为海运
      weightRange: [0, 30], // 重量范围：0kg - 30kg
      basePrice: 90, // 首重价格：90元/1kg
      additionalPrice: 13, // 续重价格：13元/1kg
      unit: 1, // 续重单位：1kg
      estimatedTime: "20-30天左右", // 预计时效：20-30天左右
    },
  ],
  // ----------------- 日速达end -----------------
  // ----------------- 海运end -----------------

  // ----------------- 空运 -----------------
  // ----------------- 大发 -----------------
  // 日本标准小包黑猫空运
  // 上海至日本的空运价格表
  airShanghaiToJapan: [
    {
      type: "air", // 标注为空运
      weightRange: [0.01, 2], // 重量范围：0.01kg - 2kg
      basePrice: 38, // 首重价格：38元/0.5kg
      additionalPrice: 6, // 续重价格：每增加0.5kg，价格增加6元
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [2.01, 5], // 重量范围：2.01kg - 5kg
      basePrice: 39, // 首重价格：39元/0.5kg
      additionalPrice: 7, // 续重价格：每增加0.5kg，价格增加7元
      unit: 0.5, // 续重单位：0.5kg
    },
  ],

  // 日本特货小包佐川
  // 日本特货小包佐川的价格表
  specialPackage: [
    {
      type: "air", // 标注为空运
      weightRange: [0.01, 5], // 重量范围：0.01kg - 5kg
      basePrice: 44, // 首重价格：44元/0.5kg
      additionalPrice: 11, // 续重价格：每增加0.5kg，价格增加11元
      unit: 0.5, // 续重单位：0.5kg
    },
  ],

  // 深圳EMS空运
  // 深圳EMS空运价格表
  shenzhenEMS: [
    {
      type: "air", // 标注为空运
      weightRange: [0.01, 2], // 重量范围：0.01kg - 2kg
      basePrice: 80, // 首重价格：80元/0.5kg
      additionalPrice: 20, // 续重价格：每增加0.5kg，价格增加20元
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [2.01, 10], // 重量范围：2.01kg - 10kg
      basePrice: 70, // 首重价格：70元/0.5kg
      additionalPrice: 18, // 续重价格：每增加0.5kg，价格增加18元
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [10.01, 22], // 重量范围：10.01kg - 22kg
      basePrice: 0, // 无首重价格
      additionalPrice: 24, // 续重价格：每增加1kg，价格增加24元
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [22.01, 30], // 重量范围：22.01kg - 30kg
      basePrice: 0, // 无首重价格
      additionalPrice: 23, // 续重价格：每增加1kg，价格增加23元
      unit: 1, // 续重单位：1kg
    },
  ],

  // 天津EMS空运价格表
  tianjinEMS: [
    {
      type: "air", // 标注为空运
      weightRange: [0.01, 10], // 重量范围：0.01kg - 10kg
      basePrice: 80, // 首重价格：80元/0.5kg
      additionalPrice: 25, // 续重价格：25元/0.5kg
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [10.01, 16], // 重量范围：10.01kg - 16kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 18, // 续重价格：18元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [16.01, 22], // 重量范围：16.01kg - 22kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 17, // 续重价格：17元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [22.01, 30], // 重量范围：22.01kg - 30kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 16, // 续重价格：16元/1kg
      unit: 1, // 续重单位：1kg
    },
  ],

  // 上海直飞EMS空运价格表
  shanghaiEMS: [
    {
      type: "air", // 标注为空运
      weightRange: [0.01, 2], // 重量范围：0.01kg - 2kg
      basePrice: 80, // 首重价格：80元/0.5kg
      additionalPrice: 20, // 续重价格：20元/0.5kg
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [2.01, 10], // 重量范围：2.01kg - 10kg
      basePrice: 70, // 首重价格：70元/0.5kg
      additionalPrice: 18, // 续重价格：18元/0.5kg
      unit: 0.5, // 续重单位：0.5kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [10.01, 16], // 重量范围：10.01kg - 16kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 24, // 续重价格：24元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [16.01, 22], // 重量范围：16.01kg - 22kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 23, // 续重价格：23元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [22.01, 30], // 重量范围：22.01kg - 30kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 21.5, // 续重价格：21.5元/1kg
      unit: 1, // 续重单位：1kg
    },
  ],

  // ----------------- 日速达 -----------------
  // 空运EMS价格表
  airEMS: [
    {
      type: "air", // 标注为空运
      weightRange: [0, 10], // 重量范围：0kg - 10kg
      basePrice: 80, // 首重价格：80元/1kg
      additionalPrice: 20, // 续重价格：20元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [10.1, 21], // 重量范围：10.1kg - 21kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 21, // 续重价格：21元/1kg
      unit: 1, // 续重单位：1kg
    },
    {
      type: "air", // 标注为空运
      weightRange: [21.1, 30], // 重量范围：21.1kg - 30kg
      basePrice: 0, // 首重价格：免费
      additionalPrice: 18, // 续重价格：18元/1kg
      unit: 1, // 续重单位：1kg
    },
  ],
  // ----------------- 日速达end -----------------
  // ----------------- 空运end -----------------
};

const casePrice = {
  airEMSCasePrice: 4, // 日速达 空运EMS箱子价格：4元/个
  seaShippingCasePrice: 10, // 海运 箱子价格：10元/个
};

// 定义服务名称的中文映射
const serviceNameMap = {
  airShanghaiToJapan: "大发-日本标准小包黑猫空运", // 大发公司 - 上海至日本的空运服务
  seaShipping: "大发-日本海运专线", // 大发公司 - 日本海运专线
  postalSeaShipping: "日速达-邮政海运", // 日速达公司 - 邮政海运服务
  specialPackage: "大发-日本特货小包佐川", // 大发公司 - 日本特货小包佐川
  shenzhenEMS: "大发-深圳EMS空运", // 大发公司 - 深圳EMS空运服务
  tianjinEMS: "大发-天津EMS空运", // 大发公司 - 天津EMS空运服务
  shanghaiEMS: "大发-上海直飞EMS空运", // 大发公司 - 上海直飞EMS空运服务
  airEMS: "日速达-空运EMS", // 日速达公司 - 空运EMS（综合服务）
};

export { priceTables, casePrice, serviceNameMap };
