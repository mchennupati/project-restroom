import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
var isTomorrow = require("dayjs/plugin/isTomorrow");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export default function EventCard({ data }) {
  console.log("Data:", data);
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <Grid sx={{ my: 1, width: "100%" }} item xs={12}>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={10} sx={{ py: 3 }}>
          <a href={`/events/${data._id}`}>
            <Card sx={{ display: "flex", p: 3, width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: 151, height: "auto" }}
                image={
                  data.imageUrl
                    ? data.imageUrl
                    : "https://www.cdacentre.com/wp-content/uploads/2017/10/event.jpg"
                }
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {`${data.eventTitle} - ${data.duration}`}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {"by " + data.adminName}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {data.eventDescription}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </a>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            py: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ my: 1 }} component="div">
            {dayjs(data.eventDateTime).isToday()
              ? "Today"
              : dayjs(data.eventDateTime).isTomorrow()
              ? "Tomorrow"
              : dayjs(data.eventDateTime).format("DD MMM YYYY")}
          </Typography>
          <Box
            sx={{
              background: "yellow",
              border: "1px solid #000",
              borderRadius: 1,
              padding: "2px 8px",
              my: 1,
            }}
          >
            <Typography variant="subtitle1">
              {dayjs(data.eventDateTime).format("hh mm A")}
            </Typography>
          </Box>
          <Box
            sx={{
              background: "yellow",
              border: "1px solid #000",
              borderRadius: 1,
              padding: "2px 8px",
              my: 1,
            }}
          >
            <Typography variant="subtitle1">
              {dayjs(data.eventDateTime).format("hh mm A")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
