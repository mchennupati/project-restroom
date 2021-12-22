import React from "react";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import EventCard from "../components/EventCard";
import { Container, Grid, Box, Button } from "@mui/material";
import axios from "axios";
import { url } from "../config";
import Script from "next/script";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

export default function index({ data }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <div>
      <Script async src="https://tally.so/widgets/embed.js" />
      <Head>
        <title>Events around you</title>
      </Head>
      <div>
        <Container>
          <Grid container>
            <Grid
              item
              xs={12}
              md={3}
              style={{
                display: "hidden",
              }}
            />
            <Grid
              sx={{ display: "flex", justifyContent: "center" }}
              item
              xs={12}
              md={6}
            >
              <div
                style={{
                  height: 175,
                  width: 175,
                  position: "relative",
                  margin: "20px 0",
                }}
              >
                <Image
                  src={require("../assets/logo.png")}
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: matches ? "flex-end" : "center",
                alignItems: "center",
              }}
              item
              xs={12}
              md={3}
            >
              <a href="#tally-open=31Nxgw&tally-width=500&tally-emoji-animation=none">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    height: 40,
                    background: "rgb(96,221,208)",
                    color: "#000",
                    ":hover": {
                      background: "#2dd2c2",
                    },
                  }}
                  disableElevation
                >
                  Create an event...
                </Button>
              </a>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            {data.data.map((item, index) => (
              <EventCard data={item} key={index} />
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${url}/api/events`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return { props: { data: res.data } };
}
