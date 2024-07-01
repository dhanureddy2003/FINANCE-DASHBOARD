/* eslint-disable @typescript-eslint/no-unused-vars */
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "@/components/FlexBetween";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

type Props = object;

const NavBar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween sx={{ color: palette.grey[300], paddingBottom:"0.5rem" }}>
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Dhanush's FINANCE DASHBOARD
        </Typography>
      </FlexBetween>
      <FlexBetween gap={"1rem"}>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboards
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default NavBar;
