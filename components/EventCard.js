import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Typography, Card, Menu, MenuItem } from "@mui/material";

import Image from "next/image";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import dayjs from "dayjs";

const AddToCalendarDropdown = AddToCalendarHOC(CustomButton, CustomModal);

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

var isTomorrow = require("dayjs/plugin/isTomorrow");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isTomorrow);
dayjs.extend(isToday);

export default function EventCard({ data, setModalOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const matches = useMediaQuery("(min-width:992px)");

  const prepareCalendarEvent = () => {
    const startDatetime = dayjs(data?.eventDateTime)
      .utc()
      .format("YYYYMMDDTHHmmssZ");

    const endDatetime =
      data?.duration === "30 min"
        ? dayjs(data?.eventDateTime)
            .add(30, "minute")
            .utc()
            .format("YYYYMMDDTHHmmssZ")
        : dayjs(data?.eventDateTime)
            .add(1, "hour")
            .utc()
            .format("YYYYMMDDTHHmmssZ");

    const duration = data?.duration;
    return {
      description: data?.eventDescription,
      duration,
      ...(data?.eventMode !== "Online"
        ? { location: data?.eventLocation }
        : {}),
      startDatetime,
      endDatetime,
      title: data?.eventTitle,
    };
  };

  const findEventAbbr = (str) => {
    return str
      .match(/(?:\s|^)(\S)/g)
      .join("")
      .replace(/\s/g, "")
      .substring(0, 3);
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
            <Grid container spacing={!matches && 2}>
              <Grid item xs={12} md={3}>
                <div
                  style={{
                    position: "relative",
                    height: matches ? 150 : 200,
                    background: !data.imageUrl && "#c5e1a5",
                    display: !data.imageUrl && "flex",
                    justifyContent: !data.imageUrl && "center",
                    alignItems: !data.imageUrl && "center",
                  }}
                >
                  {data.imageUrl ? (
                    <Image
                      src={data.imageUrl}
                      alt="Event Picture"
                      objectFit="cover"
                      layout="fill"
                    />
                  ) : (
                    <Typography
                      sx={{ textTransform: "uppercase" }}
                      variant="h3"
                    >
                      {findEventAbbr(data.eventTitle)}
                    </Typography>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: matches && 3,
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
              </Grid>
            </Grid>
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
          <div onClick={(event) => setAnchorEl(event.currentTarget)}>
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
                title: data.eventDateTime
                  ? dayjs(data.eventDateTime).format("hh:mm A")
                  : "-",
              }}
              dropdownProps={{
                anchorEl,
              }}
              event={prepareCalendarEvent()}
              linkProps={{ className: "linkStyles" }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

function CustomButton(props) {
  return <Button {...props}>{props.title}</Button>;
}

function CustomModal({ children, anchorEl }) {
  const [isOpen, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(!isOpen);
  };
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {children.map((item, index) => (
        <MenuItem key={index} onClick={handleClose}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}
