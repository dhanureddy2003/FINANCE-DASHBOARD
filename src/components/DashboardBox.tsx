import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.dark,
  borderRadius: '1rem',
  boxShadow: "0.3rem 0.1rem 2rem 0.1rem rgba(0, 0, 0, 0.8)",
}));

export default DashboardBox;
