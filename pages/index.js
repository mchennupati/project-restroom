import React from "react";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import EventCard from "../components/EventCard";
import { Grid } from "@mui/material";

export default function index() {
  return (
    <div>
      <Head>
        <title>Events around you</title>
      </Head>
      <div>
        <AppHeader />
        <Grid container justifyContent={"center"}>
          {Array(5)
            .fill()
            .map((_, index) => (
              <EventCard key={index} />
            ))}
        </Grid>
      </div>
    </div>
  );
}
