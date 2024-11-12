import { calculatedPrices } from "./index.mjs";
import { serviceNameMap } from "./parts.mjs";

// 将数据转换为 ECharts 所需的格式
function formatDataForChart(data) {
  const services = Object.keys(data);
  const seriesData = [];
  const weightsSet = new Set();

  services.forEach((service) => {
    const serviceData = data[service];
    const prices = [];

    serviceData.forEach((entry) => {
      weightsSet.add(entry.weight);
      prices.push(entry.price);
    });

    seriesData.push({
      name: serviceNameMap[service],
      type: "line",
      data: prices,
    });
  });

  return {
    seriesData,
    weights: Array.from(weightsSet).sort((a, b) => a - b),
  };
}

// 格式化数据
const { seriesData, weights } = formatDataForChart(calculatedPrices);

// 初始化图表
const chartDom = document.getElementById("main");
const myChart = echarts.init(chartDom);
const option = {
  title: {
    text: "不同服务类型的价格趋势",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: Object.keys(calculatedPrices).map((key) => serviceNameMap[key]), // 使用中文映射名称
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: weights,
    name: "重量 (kg)",
  },
  yAxis: {
    type: "value",
    name: "价格 (¥)",
  },
  series: seriesData,
};

// 使用配置项和数据显示图表
myChart.setOption(option);
