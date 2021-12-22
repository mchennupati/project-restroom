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
import Image from "next/image";

var isTomorrow = require("dayjs/plugin/isTomorrow");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export default function EventCard({ data }) {
  console.log("Data:", data);
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <Grid sx={{ width: "100%", my: 3 }} item xs={12}>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={10} order={{ xs: 2, md: 1 }}>
          <Link href={`/events/${data._id}`}>
            <Card
              sx={{ display: "flex", p: 3, width: "100%", cursor: "pointer" }}
            >
              <div
                style={{
                  width: "25%",
                  position: "relative",
                  height: 150,
                }}
              >
                <Image
                  src={
                    data.imageUrl
                      ? data.imageUrl
                      : require("../assets/placeholder.png")
                  }
                  alt="Event Picture"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "75%",
                  ml: 3,
                }}
              >
                {/* <CardContent sx={{ flex: "1 0 auto" }}> */}
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
                {/* </CardContent> */}
              </Box>
            </Card>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: "flex",

            flexDirection: matches && "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1" component="div">
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
              ml: !matches && 1,
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
