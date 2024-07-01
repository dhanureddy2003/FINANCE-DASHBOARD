import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// type Props = {}

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800],palette.primary[500]]
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionsData } = useGetTransactionsQuery();


  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  const transactionsColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          subtitle={`${productData?.length} products`}
          sideText={""}
        />
        <ResponsiveContainer height="80%" width="100%">
          <Box
            mt="0.5rem"
            padding="0 0.5rem"
            height="75%"
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[200],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]}`,
                border: "none",
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              "& .MuiDataGrid-footerContainer": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-root": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-selectLabel": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-displayedRows": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-select": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-actions": {
                color: palette.grey[200],
              },
              "& .MuiSvgIcon-root": {
                color: palette.grey[200], // Icons such as menu, up arrow, down arrow
              },
              "& .MuiIconButton-root": {
                color: palette.grey[200], // Icon buttons
              },

              "& .MuiDataGrid-sortIcon": {
                color: palette.grey[200], // Sort icons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={productData || []}
              columns={productColumns}
            />
          </Box>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          subtitle={`${transactionsData?.length} latest transactions`}
          sideText={""}
        />
        <ResponsiveContainer height="80%" width="100%">
          <Box
            mt="1rem"
            padding="0 0.5rem"
            height="80%"
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[200],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]}`,
                border: "none",
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              "& .MuiDataGrid-footerContainer": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-root": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-selectLabel": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-displayedRows": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-select": {
                color: palette.grey[200],
              },
              "& .MuiTablePagination-actions": {
                color: palette.grey[200],
              },
              "& .MuiSvgIcon-root": {
                color: palette.grey[200], // Icons such as menu, up arrow, down arrow
              },
              "& .MuiIconButton-root": {
                color: palette.grey[200], // Icon buttons
              },

              "& .MuiDataGrid-sortIcon": {
                color: palette.grey[200], // Sort icons
              },
            }}
          >
            <DataGrid
              columnHeaderHeight={25}
              rowHeight={35}
              hideFooter={true}
              rows={transactionsData || []}
              columns={transactionsColumns}
            />
          </Box>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="i">
  <BoxHeader title="Expense BreakDown by Category" sideText="" />
  <ResponsiveContainer height="80%" width="100%">
    <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
      {pieChartData?.map((data, i) => (
        <Box key={`${data[0].name}-${i}`}>
          <PieChart width={110} height={100}>
            <Pie
              stroke="none"
              data={data}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="h5">{data[0].name}</Typography>
        </Box>
      ))}
    </FlexBetween>
  </ResponsiveContainer>
</DashboardBox>


<DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="60%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
        The application utilizes React with Material-UI for displaying product lists and recent transaction data using dynamic DataGrid components. It also visualizes expense breakdowns through Recharts' pie charts, providing clear insights into categorized expenses.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
