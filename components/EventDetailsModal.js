import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import dayjs from "dayjs";

const AddToCalendarDropdown = AddToCalendarHOC(CustomButton, CustomModal);

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function EventDetailsModal({ modalState, setModalState }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:992px)");
  const findOnlineLink = (link) => {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
      return link;
    } else {
      return `https://${link}`;
    }
  };

  const prepareCalendarEvent = () => {
    const startDatetime = dayjs(modalState.data?.eventDateTime)
      .utc()
      .format("YYYYMMDDTHHmmssZ");

    const endDatetime =
      modalState.data?.duration === "30 min"
        ? dayjs(modalState.data?.eventDateTime)
            .add(30, "minute")
            .utc()
            .format("YYYYMMDDTHHmmssZ")
        : dayjs(modalState.data?.eventDateTime)
            .add(1, "hour")
            .utc()
            .format("YYYYMMDDTHHmmssZ");

    const duration = modalState.data?.duration;
    return {
      description: modalState.data?.eventDescription,
      duration,
      ...(modalState.data?.eventMode !== "Online"
        ? { location: modalState.data?.eventLocation }
        : {}),
      startDatetime,
      endDatetime,
      title: modalState.data?.eventTitle,
    };
  };

  const handleClose = () => {
    setModalState({ open: false, data: null });
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      PaperProps={{ style: { overflowY: "visible" } }}
      fullScreen={fullScreen}
      fullWidth
      open={modalState.open}
      onClose={handleClose}
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle id="scroll-dialog-title">
        <div
          style={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          {modalState.data?.eventTitle + " - " + modalState.data?.duration}
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          <Image
            layout="fill"
            objectFit="cover"
            alt="Event Picture"
            src={
              modalState.data?.imageUrl
                ? modalState.data?.imageUrl
                : require("../assets/placeholder.png")
            }
          />
        </div>
        <Typography sx={{ my: 2 }} variant="body1">
          {modalState.data?.eventDescription}
        </Typography>
        <Grid container>
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
              <Typography variant="body2">
                {dayjs(modalState.data?.eventDateTime).format(
                  "MMM D, YYYY h:mm A"
                )}
              </Typography>
            </div>

            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Event Type:
              </Typography>
              <Typography variant="body2">
                {modalState.data?.eventMode}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              {modalState.data?.eventMode === "Online" ? "Link" : "Venue"}
            </Typography>
            {modalState.data?.eventMode === "Online" ? (
              <a
                href={findOnlineLink(modalState.data?.onlineLink)}
                rel="noreferrer"
                target="_blank"
              >
                {modalState.data?.onlineLink}
              </a>
            ) : (
              <Typography variant="body2">
                {modalState.data?.eventLocation}
              </Typography>
            )}
          </Grid>
          <Grid sx={{ mt: matches ? 0 : 3 }} item xs={6} md={4}>
            <Typography sx={{ fontWeight: "400", mb: 1 }} variant="h6">
              Organizer
            </Typography>

            <Typography variant="body2">
              {modalState.data?.adminName}
            </Typography>
            <div style={{ marginTop: 10 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontWeight: "500" }}
              >
                Email:
              </Typography>
              <Typography variant="body2">
                {modalState.data?.adminEmail}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <div
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <AddToCalendarDropdown
            dropdownProps={{
              anchorEl,
            }}
            event={prepareCalendarEvent()}
            linkProps={{ className: "linkStyles" }}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
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

function CustomButton(props) {
  return <Button {...props}>I&apos;m Interested</Button>;
}

export default EventDetailsModal;
