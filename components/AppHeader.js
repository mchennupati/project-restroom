import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function AppHeader({ sx, hideCreateEvent = false }) {
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
      <a href="/">
        <Typography variant="h6" className="header-title">
          Keep the kids busy!
        </Typography>
        <Typography
          sx={{ color: "#e0e0e0" }}
          variant="caption"
          className="header-title"
        >
          Upcoming Events
        </Typography>
      </a>
      {!hideCreateEvent && (
        <a href="/events/create">
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
