"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAuthenticatedApi } from "@/hooks/useAuthenticatedApi";
import { PositionFilters } from "@/components/PositionFilters";
import { PositionList } from "@/components/PositionList";
import { UniversalTable } from "@/components/UniversalTable";
import { AssetPieChart } from "@/components/AssetPieChart";
import { preparePieChartData } from "@/services/services";

export default function Positions() {
  const [filters, setFilters] = useState({
    settlement_currency: "2",
    ticker: "",
    isin: "",
    structure: "1",
    currency_influence: [],
    type_asset: [],
    account: [],
  });
  const [positions, setPositions] = useState([]);
  const [structureData, setStructureData] = useState(null);
  const [assetTypes, setAssetTypes] = useState([]);
  const [structures, setStructures] = useState([]);
  const api = useAuthenticatedApi();
  const { data: session, status } = useSession();
  const [viewMode, setViewMode] = useState("chart");
  const [positonsTotalValue, setPositonsTotalValue] = useState(0);
  const [totalValueCurrency, setTotalValueCurrency] = useState("USD");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFetchPositions = async () => {
    const params = new URLSearchParams();

    if (filters.ticker) params.append("ticker", filters.ticker);
    if (filters.isin) params.append("isin", filters.isin);
    if (filters.settlement_currency)
      params.append("settlement_currency", filters.settlement_currency);
    if (filters.structure) params.append("structure", filters.structure);
    filters.currency_influence.forEach((t) =>
      params.append("currency_influence", t)
    );
    filters.type_asset.forEach((t) => params.append("type_asset", t));
    filters.account.forEach((a) => params.append("account", a));

    setTotalValueCurrency(
      currencySettlement.find(
        (c) => c[1] === filters.settlement_currency
      )?.[0] ?? "Unknown"
    );

    if (viewMode === "list") {
      const fetchedPositions = await api.get(
        `/api/v1/position/?${params.toString()}`
      );

      const totalValue = fetchedPositions.data.reduce(
        (acc, position) => acc + position.position_value,
        0
      );
      setPositonsTotalValue(totalValue);
      setPositions(fetchedPositions.data);
    } else if (viewMode === "chart") {
      const fetchedStructureData = await api.get(
        `/api/v1/position/structure/?${params.toString()}`
      );

      setPositonsTotalValue(fetchedStructureData.data.total_positions.value);
      setStructureData(fetchedStructureData.data);
    }
  };

  const handleViewChange = (event, newView) => {
    if (newView) {
      setViewMode(newView);
    }
  };

  const accounts = ["1", "2", "3", "4", "5", "6"];
  const currencySettlement = [
    ["USD", "2"],
    ["EUR", "3"],
    ["RUB", "1"],
  ];
  // const structures = [
  //   ["first", "1"],
  //   ["second", "2"],
  //   ["third", "3"],
  // ];
  const currencyInfluence = [
    ["USD", "2"],
    ["EUR", "3"],
    ["RUB", "1"],
  ];

  const targetWeightPieChartData = structureData
    ? structureData.groups.map((group) => ({
        name: group.group_name,
        value: group.target_weight,
      }))
    : [];

  const weightPieChartData = structureData
    ? structureData.groups.map((group) => ({
        name: group.group_name,
        value: group.weight,
      }))
    : [];

  const overlappingPositions = structureData
    ? structureData.overlapping_positions.map((pos) => ({
        Exchange: pos.exchange.name,
        Asset: pos.asset.ticker,
        "Asset price": pos.asset.asset_price,
        "Asset price currency": pos.asset.asset_price_currency,
        "Position quantity": pos.quantity_position,
        "Position value": pos.position_value,
        "Position value currency": pos.position_value_currency,
        Groups: pos.groups.map((group) => group.group_name).join(", "),
      }))
    : [];

  const positionsList = positions.map((position) => ({
    Ticker: position.asset.ticker,
    Account: position.account,
    Quantity: position.quantity_position,
    Price: position.price,
    Currency: position.price_currency,
    "Total Value": position.position_value,
    "Total Value currency": position.position_value_currency,
    ISIN: position.asset.isin,
    "Asset Name": position.asset.name_asset
      ? position.asset.name_asset
      : position.asset.full_name_asset,
    "Asset Type": position.asset.type_asset_display,
    "Currency Influence": position.asset.currency_influence,
  }));

  useEffect(() => {
    if (status !== "loading") {
      const getPositionAssetTypes = async () => {
        const types = await api.get("/api/v1/position/unique_asset_types/");
        setAssetTypes(Object.entries(types.data));
      };

      const getStructures = async () => {
        try {
          const response = await api.get("/api/v1/structure/");
          const formattedStructures = response.data.map(structure => [structure.name, structure.id.toString()]);
          setStructures(formattedStructures);
        } catch (error) {
          console.error("Ошибка при получении структур:", error);
        }
      };

      getPositionAssetTypes();
      getStructures();
    }
  }, [status]);

  return (
    <div>
      <PositionFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        currencySettlement={currencySettlement}
        currencyInfluence={currencyInfluence}
        assetTypes={assetTypes}
        accounts={accounts}
        structures={structures}
      />

      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={handleFetchPositions}
      >
        Apply
      </Button>

      <Box sx={{ width: "100%", textAlign: "left", margin: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="View mode"
        >
          <ToggleButton value="chart" aria-label="chart view">
            Chart View
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            List View
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <h3>
        Positions total value:{" "}
        {positonsTotalValue.toLocaleString("en-EN") + " " + totalValueCurrency}
      </h3>

      {viewMode === "list" ? (
        <UniversalTable data={positionsList} />
      ) : (
        <>
          {weightPieChartData.length > 0 && (
            <>
              <h2>Current weight</h2>
              <AssetPieChart data={weightPieChartData} />
            </>
          )}
          {targetWeightPieChartData.length > 0 && (
            <>
              <h2>Target weight</h2>
              <AssetPieChart data={targetWeightPieChartData} />
            </>
          )}
          {overlappingPositions.length > 0 && (
            <>
              <h2>Overlapping positions</h2>
              <UniversalTable data={overlappingPositions} />
            </>
          )}
        </>
      )}
    </div>
  );
}
