import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography, Card, Modal } from "@mui/material";

import Image from "next/image";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import dayjs from "dayjs";

const AddToCalendarDropdown = AddToCalendarHOC(Button, CustomModal);

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

var isTomorrow = require("dayjs/plugin/isTomorrow");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export default function EventCard({ data, setModalOpen }) {
  const matches = useMediaQuery("(min-width:992px)");
  const prepareCalendarEvent = () => {
    const startDatetime = dayjs(data.eventDateTime)
      .utc()
      .format("YYYYMMDDTHHmmssZ");

    const duration = data.duration;
    return {
      description: data.eventDescription,
      duration,
      location: data.eventLocation,
      startDatetime,
      title: data.eventTitle,
    };
  };
  return (
    <Grid sx={{ width: "100%", my: 3 }} item xs={12}>
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={10} order={{ xs: 2, md: 1 }}>
          <Card
            onClick={() => {
              setModalOpen({ open: true, data });
            }}
            sx={{ display: "flex", p: 3, width: "100%", cursor: "pointer" }}
          >
            <div
              style={{
                width: "25%",
                position: "relative",
                height: 150,
              }}
            >
              <Image
                src={
                  data.imageUrl
                    ? data.imageUrl
                    : require("../assets/placeholder.png")
                }
                alt="Event Picture"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "75%",
                ml: 3,
              }}
            >
              {/* <CardContent sx={{ flex: "1 0 auto" }}> */}
              <Typography
                sx={{ fontWeight: "700" }}
                component="div"
                variant="h6"
              >
                {`${data.eventTitle} - ${data.duration}`}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {"by " + data.adminName}
              </Typography>
              <Typography variant="body2" component="div">
                {data.eventDescription}
              </Typography>
              {/* </CardContent> */}
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: "flex",

            flexDirection: matches && "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle1" component="div">
            {dayjs(data.eventDateTime).isToday()
              ? "Today"
              : dayjs(data.eventDateTime).isTomorrow()
              ? "Tomorrow"
              : dayjs(data.eventDateTime).format("DD MMM YYYY")}
          </Typography>
          {/* <Button
            sx={{
              background: "yellow",
              border: "1px solid #000",
              borderRadius: 1,
              padding: "2px 8px",
              ml: !matches && 1,
              ":hover": {
                background: "yellow",
              },
            }}
          >
            <Typography style={{ color: "#000" }} variant="subtitle1">
              {dayjs(data.eventDateTime).format("hh mm A")}
            </Typography>
          </Button> */}
          <AddToCalendarDropdown
            buttonProps={{
              sx: {
                background: "yellow",
                border: "1px solid #000",
                borderRadius: 1,
                padding: "2px 8px",
                color: "#000",
                ml: !matches && 1,
                ":hover": {
                  background: "yellow",
                },
              },
            }}
            event={prepareCalendarEvent()}
            linkProps={{ className: "linkStyles" }}
            buttonText={
              data.eventDateTime && dayjs(data.eventDateTime).format("hh mm A")
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

function CustomModal({ children }) {
  const [isOpen, setOpen] = React.useState(true);
  return (
    <Modal open={isOpen} onBackdropClick={() => setOpen(false)}>
      <div>{children}</div>
    </Modal>
  );
}
