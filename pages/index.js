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
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <div>
      <Script async src="https://tally.so/widgets/embed.js" />
      <Head>
        <title>Events around you</title>
      </Head>
      <div>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "hidden",
              }}
            />
            <Image
              src={require("../assets/logo.png")}
              height="200px"
              width="400px"
            />
            <a href="#tally-open=31Nxgw&tally-width=500&tally-emoji-animation=none">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  height: matches ? 40 : 60,
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
          </Box>
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
