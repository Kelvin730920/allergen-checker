function calculate() {
  const fragrancePercent = parseFloat(document.getElementById('fragrancePercent').value);
  const productType = document.getElementById('productType').value;
  const inputText = document.getElementById('ingredientInput').value.trim();
  const outputDiv = document.getElementById('output');

  const lines = inputText.split('\n');
  const result = [];

  const threshold = productType === 'rinse' ? 0.01 : 0.001;

  for (let line of lines) {
    const [name, percentStr] = line.split(',');
    const ingPercent = parseFloat(percentStr);
    if (isNaN(ingPercent)) continue;

    const finalConc = (fragrancePercent * ingPercent) / 100;

    result.push(`${name.trim()}：${(finalConc * 100).toFixed(4)}% → ${
      finalConc >= threshold ? '需標示 ⚠️' : '可免標示 ✅'
    }`);
  }

  outputDiv.innerHTML = result.join('<br>');
}
