import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";

export default function EventCard({ data }) {
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <Grid sx={{ my: 1 }} item xs={12} md={11}>
      <Box sx={{ py: 3, borderBottom: "1px solid #e0e0e0" }}>
        <Grid justifyContent={"center"} container spacing={3}>
          <Grid
            sx={{
              display: !matches && "flex",
              justifyContent: !matches && "center",
            }}
            item
            xs={12}
            md={3}
          >
            <img
              src={
                data.imageUrl
                  ? data.imageUrl
                  : "https://www.cdacentre.com/wp-content/uploads/2017/10/event.jpg"
              }
              style={{ width: "90%", height: 200 }}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
            md={9}
          >
            <Typography
              align={!matches ? "center" : "justify"}
              gutterBottom
              sx={{ fontWeight: "400" }}
              variant="h6"
            >
              {data.eventTitle ? data.eventTitle : ""}
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: 14, mb: 2 }}
              variant="body2"
              align={!matches ? "center" : "justify"}
            >
              {data.eventDescription ? data.eventDescription : ""}
            </Typography>
            <Grid
              container
              justifyContent={data.eventMode !== "Online" && "center"}
              spacing={3}
            >
              <Grid item xs={6} md={4}>
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: 35,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 12,
                    }}
                  >
                    {dayjs(data.eventDateTime).format("DD MMMM YYYY ") +
                      "at " +
                      dayjs(data.eventDateTime).format("h:mm A")}
                  </Typography>
                </div>
              </Grid>
              {data.eventMode !== "Online" && (
                <Grid item xs={6} md={4}>
                  <div
                    style={{
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0px 10px",
                      height: 35,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 12,
                      }}
                    >
                      {data.eventLocation ? data.eventLocation : ""}
                    </Typography>
                  </div>
                </Grid>
              )}
              <Grid item xs={6} md={4}>
                <Link href={`/events/${data._id}`} passHref>
                  <Button
                    fullWidth
                    disableElevation
                    sx={{
                      background: "#3865a8",
                      color: "#fff",
                      fontSize: 12,
                      fontFamily: '"Rubik", sans-serif',
                      borderRadius: 0,
                      fontWeight: "400",
                      height: 35,
                    }}
                  >
                    Read More
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
