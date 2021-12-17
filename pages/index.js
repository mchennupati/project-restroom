import React from "react";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";
import axios from "axios";
import { url } from "../config";

export default function index({ data }) {
  return (
    <div>
      <Head>
        <title>Events around you</title>
      </Head>
      <div>
        <AppHeader homePage />
        <Grid container justifyContent={"center"}>
          {data.data.map((item, index) => (
            <EventCard data={item} key={index} />
          ))}
        </Grid>
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
