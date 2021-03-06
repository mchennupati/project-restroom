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
import EventDetailsModal from "../components/EventDetailsModal";

export default function index({ data }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modalOpen, setModalOpen] = React.useState({
    open: false,
    data: null,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <div>
      <Script async src="https://tally.so/widgets/embed.js" />
      <Head>
        <title>Paid for Clean Toilets </title>
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
                  alt="logo"
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
              <a href="#tally-open=wbAlo3&tally-width=500&tally-emoji-animation=none">
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    height: 40,
                    fontFamily: "'Public Sans', sans-serif",
                    fontWeight: "700",
                    background: "rgb(96,221,208)",
                    color: "#000",
                    ":hover": {
                      background: "#2dd2c2",
                    },
                  }}
                  disableElevation
                >
                  List your Clean Toilet !!
                </Button>
              </a>
            </Grid>
          </Grid><br/>
          <Grid container justifyContent={"center"}>  
            
            <h1> The Toilets go here ... </h1>
            

            {/* {data.data.map((item, index) => (
              <EventCard setModalOpen={setModalOpen} data={item} key={index} />
            ))} */}
          </Grid>
            <h4>Toilet 1 </h4>
            
            <h4>Toilet 2 </h4>
        </Container>
        <EventDetailsModal
          modalState={modalOpen}
          setModalState={setModalOpen}
        />
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
