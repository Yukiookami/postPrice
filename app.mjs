import { calculatedPrices } from "./index.mjs";
import { serviceNameMap } from "./parts.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // 选择要插入结果的 HTML 元素
  const resultsContainer = document.getElementById("results");

  // 创建空运和海运的合并表格
  if (Object.keys(calculatedPrices).length > 0) {
    const combinedTable = createCombinedPriceTable(
      calculatedPrices,
      "空运与海运价格比较表"
    );
    resultsContainer.appendChild(combinedTable);
  }

  // 在右上角追加一个开关按钮
  const toggleButton = document.createElement("button");
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "10px";
  toggleButton.id = "toggleButton";
  toggleButton.style.right = "10px";
  document.body.appendChild(toggleButton);

  // 添加开关按钮的点击事件
  let isMarked = false;
  toggleButton.addEventListener("click", () => {
    if (isMarked) {
      unmarkSpecialPrices();
      toggleButton.classList.remove("active");
    } else {
      markSpecialPrices();
      toggleButton.classList.add("active");
    }
    isMarked = !isMarked;
  });
});

// 创建合并价格表的函数
function createCombinedPriceTable(services, title) {
  // 获取所有服务的重量范围，以便找到最大重量
  let maxWeight = 0;
  for (const prices of Object.values(services)) {
    const weights = prices.map((price) => price.weight);
    maxWeight = Math.max(maxWeight, ...weights);
  }

  // 创建表格容器
  const container = document.createElement("div");
  const heading = document.createElement("h2");
  heading.textContent = title;
  container.appendChild(heading);

  // 创建表格元素
  const table = document.createElement("table");
  table.classList.add("price-table"); // 添加 CSS 类
  table.id = "combined-price-table"; // 为表格添加一个 ID，方便后续操作

  // 创建表头
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // 添加第一个表头单元格为“重量”
  const weightHeader = document.createElement("th");
  weightHeader.textContent = "重量 (kg)";
  headerRow.appendChild(weightHeader);

  // 添加各个服务的表头
  for (const serviceName of Object.keys(services)) {
    const serviceHeader = document.createElement("th");
    serviceHeader.textContent = serviceNameMap[serviceName];
    headerRow.appendChild(serviceHeader);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 创建表格主体
  const tbody = document.createElement("tbody");

  // 遍历所有可能的重量（从0开始，步长为0.5），构造每一行
  for (
    let weight = 0;
    weight <= maxWeight;
    weight = parseFloat((weight + 0.5).toFixed(1))
  ) {
    const row = document.createElement("tr");

    // 创建重量单元格
    const weightCell = document.createElement("td");
    weightCell.textContent = weight;
    row.appendChild(weightCell);

    // 创建各个服务的价格单元格
    const priceCells = [];
    for (const prices of Object.values(services)) {
      // 获取当前服务的最大重量
      const maxServiceWeight = Math.max(...prices.map((price) => price.weight));

      let priceCell = document.createElement("td");

      // 如果当前重量超过最大重量，则显示 '-'
      if (weight > maxServiceWeight) {
        priceCell.textContent = "-";
      } else {
        let priceInfo = prices.find((price) => price.weight === weight);

        // 如果当前重量没有价格信息，则使用上一个重量的价格
        if (!priceInfo) {
          let previousWeight = weight - 0.5;
          while (previousWeight > 0 && !priceInfo) {
            priceInfo = prices.find((price) => price.weight === previousWeight);
            previousWeight -= 0.5;
          }
        }

        priceCell.textContent = priceInfo ? `${priceInfo.price} 元` : "-";
      }

      priceCells.push(priceCell);
      row.appendChild(priceCell);
    }

    // 标记当前行中最便宜的价格
    let minPrice = Infinity;
    let minPriceCell = null;
    priceCells.forEach((cell) => {
      const price = parseFloat(cell.textContent);
      if (!isNaN(price) && price < minPrice) {
        minPrice = price;
        minPriceCell = cell;
      }
    });

    if (minPriceCell) {
      minPriceCell.classList.add("cheapest-price"); // 添加 CSS 类以标记最便宜的价格
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);

  return container;
}

// 标记特殊价格的函数
function markSpecialPrices() {
  const table = document.getElementById("combined-price-table");
  if (!table) return;

  const rows = table.getElementsByTagName("tr");

  // 遍历所有行，跳过表头
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");

    // 遍历当前行的每个服务价格单元格
    for (let k = 1; k < cells.length; k++) {
      const currentPrice = parseFloat(cells[k].textContent);

      // 比较当前价格与前一个重量的价格，仅在当前价格更低的情况下进行标记
      if (i > 1) {
        const previousRowCells = rows[i - 1].getElementsByTagName("td");
        const previousPrice = parseFloat(previousRowCells[k].textContent);

        if (
          !isNaN(currentPrice) &&
          !isNaN(previousPrice) &&
          currentPrice < previousPrice
        ) {
          if (!cells[k].textContent.includes("🍟")) {
            cells[k].textContent += " 🍟";
          }
          cells[k].classList.add("marked-price-new");
        }
      }

      // 比较与自己一半重量的2倍价格比，是否划算
      const halfWeight = parseFloat(
        (parseFloat(cells[0].textContent) / 2).toFixed(1)
      );
      let halfWeightRow = null;

      for (let j = 1; j < rows.length; j++) {
        const currentWeight = parseFloat(
          rows[j].getElementsByTagName("td")[0].textContent
        );
        if (currentWeight === halfWeight) {
          halfWeightRow = rows[j];
          break;
        }
      }

      if (halfWeightRow) {
        const halfPrice = parseFloat(
          halfWeightRow.getElementsByTagName("td")[k].textContent
        );
        if (
          !isNaN(currentPrice) &&
          !isNaN(halfPrice) &&
          currentPrice > halfPrice * 2
        ) {
          if (!cells[k].textContent.includes("⭐")) {
            cells[k].textContent += " ⭐";
          }
          cells[k].classList.add("marked-price");
        }
      }
    }
  }
}

// 取消标记特殊价格的函数
function unmarkSpecialPrices() {
  const table = document.getElementById("combined-price-table");
  if (!table) return;

  const markedCells = [
    ...table.getElementsByClassName("marked-price-new"),
    ...table.getElementsByClassName("marked-price"),
  ];

  while (markedCells.length > 0) {
    const cell = markedCells[0];
    cell.textContent = cell.textContent.replace(" ⭐", "").replace(" 🍟", "");
    cell.classList.remove("marked-price-new");
    cell.classList.remove("marked-price");
  }
}
