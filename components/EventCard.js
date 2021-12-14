import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function EventCard() {
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
              src="https://media.istockphoto.com/photos/close-up-of-legs-and-feet-of-football-player-in-blue-socks-and-shoes-picture-id1150952747?k=20&m=1150952747&s=612x612&w=0&h=vreccM0RO2rNp4aLN-mLyBwTfN7sfwvkdkwegzYPrXo="
              style={{ width: "90%" }}
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
              Football Match
            </Typography>
            <Typography
              sx={{ fontWeight: "400", fontSize: 14, mb: 2 }}
              variant="body2"
              align={!matches ? "center" : "justify"}
            >
              Velit veniam non commodo et est. Magna enim officia do pariatur
              est dolore eu dolore adipisicing proident magna. Culpa ut veniam
              ipsum pariatur elit aliquip labore occaecat in enim. Qui irure ad
              dolor id magna. Labore non ut aute labore reprehenderit sit ad
              irure magna do. Nostrud voluptate qui consequat consequat.
            </Typography>
            <Grid container justifyContent={"center"} spacing={3}>
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
                    07th January 2022 at 6:00 am
                  </Typography>
                </div>
              </Grid>
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
                    Barclays Centre, Brooklyn
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6} md={4}>
                <Link href="/events/1">
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
