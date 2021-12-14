import React from "react";
import Head from "next/head";
import CreateEvent from "../../components/CreateEvent";
import AppHeader from "../../components/AppHeader";
import { Container, Typography } from "@mui/material";

export default function create() {
  return (
    <div>
      <Head>
        <title>Create an event</title>
      </Head>
      <AppHeader />
      <Container sx={{ mt: 4 }}>
        <CreateEvent />
      </Container>
    </div>
  );
}
