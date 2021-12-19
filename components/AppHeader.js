import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function AppHeader({ sx, homePage = false }) {
  return (
    <Box
      sx={[
        {
          background: "#3865a8",
          px: 3,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "13vh",
        },
      ]}
    >
      <Link href="/">
        <div style={{ cursor: "pointer" }}>
          <Typography variant="h6" className="header-title">
            Keep the kids busy!
          </Typography>
          {homePage && (
            <Typography
              sx={{ color: "#e0e0e0" }}
              variant="caption"
              className="header-title"
            >
              Upcoming Events
            </Typography>
          )}
        </div>
      </Link>
      {homePage && (
        <a href="#tally-open=31Nxgw&tally-width=500&tally-emoji-animation=none">
          <Button
            sx={{
              color: "#fff",
              fontFamily: '"Rubik", sans-serif',
              fontWeight: "400",
            }}
            disableElevation
          >
            Create an event
          </Button>
        </a>
      )}
    </Box>
  );
}
