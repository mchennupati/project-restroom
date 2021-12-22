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
import AddToCalendar from "@culturehq/add-to-calendar";
import "@culturehq/add-to-calendar/dist/styles.css";
import Image from "next/image";
import { url } from "../../config";
import axios from "axios";
import dayjs from "dayjs";

export default function EventDetails({ data }) {
  const { event } = data;
  // console.log(event);

  const findOnlineLink = (link) => {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
      return link;
    } else {
      return `https://${link}`;
    }
  };

  // const someEvent = {
  //   title: event.eventTitle,
  //   description: event.eventDescription,
  //   ...(event.eventMode !== "Online" && { location: event.eventLocation }),
  //   startTime: "2021-12-20T20:15:00-04:00",
  //   endTime: "2021-12-20T21:45:00-04:00",
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMediaQuery("(min-width:992px)");
  return (
    <div>
      <Head>
        <title>Event Details</title>
      </Head>
      <AppHeader />
      <Container maxWidth={matches && "xl"} sx={{ my: 3 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div
              style={{
                position: "relative",
                height: 400,
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <Image
                style={{ borderRadius: 10 }}
                layout="fill"
                objectFit="cover"
                src={
                  event.imageUrl
                    ? event.imageUrl
                    : require("../../assets/placeholder.png")
                }
              />
            </div>
          </Grid>

          <Grid sx={{ pl: matches && 3, py: 2, pr: 1 }} item xs={12} md={6}>
            <Typography sx={{ mb: 2 }} variant="h4">
              {event.eventTitle}
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: "400" }} variant="h6">
              {event.eventDateTime}
            </Typography>
            <Typography
              align="justify"
              sx={{ mt: 2, fontWeight: "400", fontSize: 16 }}
              variant="body2"
            >
              {event.eventDescription}
            </Typography>
            <div style={{ margin: "20px 0" }}>
              <AddToCalendar
                filename={event.eventTitle}
                event={{
                  name: event.eventTitle,
                  details: event.eventDescription,
                  ...(event.eventMode !== "Online" && {
                    location: event.eventLocation,
                  }),
                  startsAt: dayjs(event.eventDateTime).toISOString(),
                  // TODO Event Duration
                  endsAt: dayjs(event.eventDateTime).add(30, "m"),
                }}
              />
            </div>
          </Grid>
        </Grid>

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
                Date & Time:
              </Typography>
              <Typography variant="body2">{event.eventDateTime}</Typography>
            </div>

            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Event Type:
              </Typography>
              <Typography variant="body2">{event.eventMode}</Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              {event.eventMode === "Online" ? "Link" : "Venue"}
            </Typography>
            {event.eventMode === "Online" ? (
              <a
                href={findOnlineLink(event.onlineLink)}
                rel="noreferrer"
                target="_blank"
              >
                {event.onlineLink}
              </a>
            ) : (
              <Typography variant="body2">{event.eventLocation}</Typography>
            )}
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              Organizer
            </Typography>

            <Typography variant="body2">{event.adminName}</Typography>
            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Email:
              </Typography>
              <Typography variant="body2">{event.adminEmail}</Typography>
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

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await axios.get(`${url}/api/events/${params.event}`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return { props: { data: res.data } };
}
