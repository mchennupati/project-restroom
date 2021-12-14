import {
  Typography,
  Container,
  Grid,
  Button,
  Divider,
  Hidden,
  Box,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import AppHeader from "../../components/AppHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add } from "@mui/icons-material";

export default function EventDetails() {
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <div>
      <Head>
        <title>Event Details</title>
      </Head>
      <AppHeader />
      <Container maxWidth={matches && "xl"} sx={{ my: 3 }}>
        <Typography sx={{ mb: 2 }} variant="h4">
          Football Match
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: "400" }} variant="h6">
          07th January 2022 at 6:00 am - 7:30 am
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <img
              src="https://images.indianexpress.com/2020/04/aiff-football-1200.jpg"
              style={{ width: "100%", borderRadius: 10, margin: "20px 0" }}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6}>
              <Container sx={{ my: 2 }}>
                <Typography sx={{ mb: 2 }} variant="h6">
                  Are you intersted?
                </Typography>{" "}
                <iframe
                  src="https://tally.so/embed/31pVgm?alignLeft=1&hideTitle=1&transparentBackground=1"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Join an Event"
                ></iframe>
              </Container>
            </Grid>
          </Hidden>
        </Grid>
        <Typography
          align="justify"
          sx={{ mt: 2, fontWeight: "400", fontSize: 16 }}
          variant="body2"
        >
          Incididunt esse sunt commodo aliqua aute ullamco exercitation ullamco.
          Dolore deserunt ad reprehenderit sit velit consequat pariatur.
          Incididunt consequat sit eiusmod elit. Do anim commodo reprehenderit
          reprehenderit esse eiusmod non. Do ut veniam dolore voluptate dolor
          nostrud deserunt consequat. Nisi in dolor magna labore dolore laboris
          sit elit laboris. Minim mollit est nulla labore dolor tempor sint ut.
          Dolor irure ut exercitation ex incididunt ullamco pariatur pariatur
          officia pariatur adipisicing enim. Pariatur culpa nostrud dolore magna
          duis veniam mollit do. Mollit qui eu proident ad et pariatur ea labore
          minim laborum eu voluptate voluptate. Qui do cillum est ex veniam qui
          laboris eiusmod.
        </Typography>
        <Button
          variant="text"
          sx={{ fontFamily: '"Rubik", sans-serif', fontSize: 13, mt: 3 }}
        >
          + &nbsp; Google Calender
        </Button>
        <Button
          variant="text"
          sx={{ fontFamily: '"Rubik", sans-serif', fontSize: 13, mt: 3 }}
        >
          + &nbsp; iCal Export
        </Button>
        <Hidden mdUp>
          <div style={{ margin: "15px 0" }}>
            <Typography sx={{ mb: 2 }} variant="h6">
              Are you intersted?
            </Typography>{" "}
            <iframe
              src="https://tally.so/embed/31pVgm?alignLeft=1&hideTitle=1&transparentBackground=1"
              width="100%"
              height="250"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Join an Event"
            ></iframe>
          </div>
        </Hidden>
        <Grid justifyContent={"center"} container sx={{ mt: 3 }}>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              Details
            </Typography>
            <div>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Date:
              </Typography>
              <Typography variant="body2">07th January 2022</Typography>
            </div>
            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Time:
              </Typography>
              <Typography variant="body2">06:00 am - 07:30 am</Typography>
            </div>
            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Event Type:
              </Typography>
              <Typography variant="body2">Offline</Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              Venue
            </Typography>

            <Typography variant="body2">
              Minim cillum aute,
              <br /> nostrud et consequat,
              <br /> elit fugiat,
              <br />
              Sunt aliquip.
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              Organizer
            </Typography>

            <Typography variant="body2">Shahal KP</Typography>
            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Email:
              </Typography>
              <Typography variant="body2">shahalkp@cabin4.pro</Typography>
            </div>
          </Grid>
        </Grid>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Divider sx={{ width: "95%", background: "#e0e0e0", mt: 5 }} />
        </div>
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            sx={{ fontFamily: '"Rubik", sans-serif', fontSize: 13 }}
          >
            &lt;&lt; Some other Event
          </Button>
          <Button
            variant="text"
            sx={{ fontFamily: '"Rubik", sans-serif', fontSize: 13 }}
          >
            Some other Event &gt;&gt;
          </Button>
        </Box>
      </Container>
    </div>
  );
}
