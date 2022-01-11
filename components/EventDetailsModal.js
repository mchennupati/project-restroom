import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Menu,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Image from "next/image";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";

var isTomorrow = require("dayjs/plugin/isTomorrow");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isTomorrow);
dayjs.extend(isToday);

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

    const duration = modalState.data?.duration === "1 hour" ? 1 : 0.5;
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
      PaperProps={{
        sx: {
          overflowY: "visible",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          position: "relative",
        },
      }}
      fullScreen={fullScreen}
      fullWidth
      open={modalState.open}
      onClose={handleClose}
      maxWidth="md"
      scroll="paper"
    >
      <Typography variant="h4" style={{ fontWeight: "700" }} gutterBottom>
        {modalState.data?.eventTitle + " - " + modalState.data?.duration}
      </Typography>
      <Hidden mdUp>
        <IconButton
          onClick={() => {
            setModalState({ open: false, data: null });
          }}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>
      </Hidden>
      <div style={{ display: "flex" }}>
        <Typography variant="h5" style={{ fontWeight: "700" }} gutterBottom>
          {dayjs(modalState.data?.eventDateTime).isToday()
            ? "Today"
            : dayjs(modalState.data?.eventDateTime).isTomorrow()
            ? "Tomorrow"
            : dayjs(modalState.data?.eventDateTime).format("DD MMM YYYY")}{" "}
          by
        </Typography>
        &nbsp;
        <Tooltip title={modalState.data?.userDescription}>
          <Typography variant="h5" style={{ fontWeight: "700" }} gutterBottom>
            {modalState.data?.adminName}
          </Typography>
        </Tooltip>
      </div>
      <div
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <AddToCalendarDropdown
          dropdownProps={{
            anchorEl,
            handleClose,
          }}
          event={prepareCalendarEvent()}
          linkProps={{ className: "linkStyles" }}
        />
      </div>
      {modalState.data?.eventMode === "Online" ? (
        <a
          style={{
            color: "#000",
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: "500",
            fontSize: 19,
            letterSpacing: 0.5,
          }}
          className="link"
          href={findOnlineLink(modalState.data?.onlineLink)}
          rel="noreferrer"
          target="_blank"
        >
          {modalState.data?.onlineLink}
        </a>
      ) : (
        <Typography
          sx={{
            color: "#000",
            fontFamily: "'Public Sans', sans-serif",
            fontWeight: "500",
            fontSize: 19,
            letterSpacing: 0.5,
            mb: 2,
          }}
        >
          {modalState.data?.eventLocation}
        </Typography>
      )}
      <div
        style={{
          position: "relative",
          width: "50%",
          height: 200,
          margin: "10px 0",
        }}
      >
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
      <Typography sx={{ my: 2, fontWeight: "400" }} variant="h6">
        {modalState.data?.eventDescription}
      </Typography>
    </Dialog>
  );
}

function CustomModal({ children, anchorEl, handleClose }) {
  const [isOpen, setOpen] = React.useState(true);

  const handleMenuClose = () => {
    setOpen(!isOpen);
  };
  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleMenuClose();
            handleClose();
          }}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}

function CustomButton(props) {
  return (
    <Button
      sx={{
        background: "#31D3C3",
        color: "#000",
        width: 250,
        padding: "0px 0",
        fontFamily: "'Public Sans', sans-serif",
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "none",
        fontSize: 19,
        my: 2,
        ":hover": { background: "#31d3c3" },
      }}
      {...props}
    >
      Join!
    </Button>
  );
}

export default EventDetailsModal;
