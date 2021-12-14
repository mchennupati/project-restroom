import { Box, Typography } from "@mui/material";
import React from "react";

export default function AppHeader() {
  return (
    <Box sx={{ background: "#3865a8", p: 3, color: "#fff" }}>
      <Typography variant="h6" className="header-title">
        Keep your kids busy!
      </Typography>
      <Typography
        sx={{ color: "#e0e0e0" }}
        variant="caption"
        className="header-title"
      >
        Upcoming Events
      </Typography>
    </Box>
  );
}
