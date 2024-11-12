import { priceTables, casePrice, serviceNameMap } from "./parts.mjs";

// 计算价格的函数
function calculatePrices(priceTables) {
  const results = {};

  // 遍历各个价格表
  for (const [serviceName, priceTable] of Object.entries(priceTables)) {
    const prices = [];
    let currentBasePrice = null; // 记录当前的首重价格

    // 遍历每个服务的价格表定义
    priceTable.forEach((priceInfo) => {
      let { weightRange, basePrice, additionalPrice, unit, type } = priceInfo;
      if (
        !weightRange ||
        !Array.isArray(weightRange) ||
        weightRange.length !== 2
      ) {
        weightRange = [0, 30];
      }
      let [minWeight, maxWeight] = weightRange;

      // 将最小重量和最大重量调整为整数
      minWeight = Math.floor(minWeight);
      maxWeight = Math.floor(maxWeight);

      // 更新当前的首重价格
      if (basePrice !== undefined && basePrice !== null) {
        currentBasePrice = basePrice;
      }

      // 从最小重量到最大重量，按续重单位计算价格
      for (let weight = minWeight; weight <= maxWeight; weight += 0.5) {
        // 修改为每次递增 0.5
        let price;
        if (weight <= unit) {
          // 计算首重价格，使用当前的首重价格
          price = currentBasePrice;
        } else {
          // 计算续重价格
          const additionalUnits = Math.ceil((weight - unit) / unit);
          price = currentBasePrice + additionalUnits * additionalPrice;
        }
        prices.push({ weight, price, type }); // 在价格信息中加入 type 属性，表明是空运还是海运
      }
    });

    // 将计算结果存储在对应的服务名称中
    results[serviceName] = prices;
  }

  return results;
}

// 计算价格
const calculatedPrices = calculatePrices(priceTables);

export { calculatedPrices, casePrice, serviceNameMap };
