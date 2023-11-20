"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAuthenticatedApi } from "@/hooks/useAuthenticatedApi";
import { PositionFilters } from "@/components/PositionFilters";
import { PositionList } from "@/components/PositionList";
import { AssetPieChart } from "@/components/AssetPieChart";
import { preparePieChartData } from "@/services/services";

export default function Positions() {
  const [filters, setFilters] = useState({
    settlement_currency: "",
    ticker: "",
    isin: "",
    currency_influence: [],
    type_asset: [],
    account: [],
  });
  const [positions, setPositions] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const api = useAuthenticatedApi();
  const { data: session, status } = useSession();
  const [viewMode, setViewMode] = useState("list");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFetchPositions = async () => {
    const params = new URLSearchParams();

    if (filters.settlement_currency.length > 0)
      params.append("settlement_currency", filters.settlement_currency);
    if (filters.ticker) params.append("ticker", filters.ticker);
    if (filters.isin) params.append("isin", filters.isin);
    filters.currency_influence.forEach((t) =>
      params.append("currency_influence", t)
    );
    filters.type_asset.forEach((t) => params.append("type_asset", t));
    filters.account.forEach((a) => params.append("account", a));

    const fetchedPositions = await api.get(
      `/api/v1/position/?${params.toString()}`
    );
    setPositions(fetchedPositions.data);
  };

  const handleViewChange = (event, newView) => {
    if (newView) {
      setViewMode(newView);
    }
  };

  const accounts = ["1", "2", "3", "4", "5", "6"];
  const settlementCurrencies = ["USD", "EUR", "RUB", "BTC"];
  const currencyInfluence = [
    ["USD", "2"],
    ["EUR", "3"],
    ["RUB", "1"],
  ];
  const pieChartData = preparePieChartData(positions);

  useEffect(() => {
    if (status !== "loading") {
      const getPositionAssetTypes = async () => {
        const types = await api.get("/api/v1/position/unique_asset_types/");
        setAssetTypes(Object.entries(types.data));
      };

      getPositionAssetTypes();
    }
  }, [status]);

  return (
    <div>
      <PositionFilters
        filters={filters}
        handleFilterChange={handleFilterChange}
        settlementCurrencies={settlementCurrencies}
        currencyInfluence={currencyInfluence}
        assetTypes={assetTypes}
        accounts={accounts}
      />

      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={handleFetchPositions}>
        Apply
      </Button>

      <Box sx={{ width: "100%", textAlign: "left", margin: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="View mode"
        >
          <ToggleButton value="list" aria-label="list view">
            List View
          </ToggleButton>
          <ToggleButton value="chart" aria-label="chart view">
            Chart View
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewMode === 'list' ? (
        <PositionList positions={positions} />
      ) : (
        <AssetPieChart data={pieChartData} />
      )}
    </div>
  );
}
