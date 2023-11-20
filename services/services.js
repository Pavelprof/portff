export function preparePieChartData(positions) {
  const assetTypeAggregation = {};

  positions.forEach(position => {
    const type = position.asset.type_asset_display;
    const value = position.total_value;

    if (assetTypeAggregation[type]) {
      assetTypeAggregation[type] += value;
    } else {
      assetTypeAggregation[type] = value;
    }
  });

  return Object.entries(assetTypeAggregation).map(([name, value]) => ({
    name,
    value
  }));
}
