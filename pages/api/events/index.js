import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find(
          { eventDateTime: { $gte: dayjs().tz("Europe/Berlin") } },
          "eventTitle eventDescription userDescription imageUrl adminName adminEmail eventMode eventDateTime eventLocation similarLink duration onlineLink"
        );
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const adminName = req.body.data.fields.find(
          (i) => i.key === "question_wQMXy8"
        )?.value;

        const adminEmail = req.body.data.fields.find(
          (i) => i.key === "question_mYRgy5"
        )?.value;

        const eventTitle = req.body.data.fields.find(
          (i) => i.key === "question_nPDNXd"
        )?.value;

        const userDescription = req.body.data.fields.find(
          (i) => i.key === "question_w54QQ6"
        )?.value;

        const eventModeValue = req.body.data.fields.find(
          (i) => i.key === "question_wLzjYO"
        );

        const eventMode = eventModeValue.options.find(
          (i) => i.id === eventModeValue?.value
        )?.text;

        const location = req.body.data.fields.find(
          (i) => i.key === "question_31kYvO"
        )?.value;

        const onlineLink = req.body.data.fields.find(
          (i) => i.key === "question_wzNAJ8"
        )?.value;

        const eventDate = req.body.data.fields.find(
          (i) => i.key === "question_mDKYyq"
        )?.value;

        const eventTime = req.body.data.fields.find(
          (i) => i.key === "question_3lq5ZB"
        )?.value;

        const eventDescription = req.body.data.fields.find(
          (i) => i.key === "question_wdNpVq"
        )?.value;

        const similarLink = req.body.data.fields.find(
          (i) => i.key === "question_3Xr7Yd"
        )?.value;

        const durationValue = req.body.data.fields.find(
          (i) => i.key === "question_mRdgld"
        );

        const duration = durationValue.options.find(
          (i) => i.id === durationValue?.value
        )?.text;

        const image = req.body.data.fields.find(
          (i) => i.key === "question_wvr6vg"
        )?.value;

        const imageUrl = image !== null ? image[0].url : null;

        const formattedTime = `${dayjs(`${eventDate} ${eventTime}`).format(
          "MMM D, YYYY HH:mm"
        )} GMT+0100`;

        const eventDateTime = new Date(formattedTime);

        const newEevent = await Event.create({
          tallyEventId: req.body.eventId,
          tallySubmissionId: req.body.data.submissionId,
          tallyRespondentId: req.body.data.respondentId,
          eventTitle,
          eventDescription,
          userDescription,
          imageUrl,
          adminName,
          adminEmail,
          eventMode,
          eventDateTime,
          eventLocation: location,
          similarLink,
          duration,
          onlineLink,
        });
        res.status(201).json({ success: true, data: newEevent });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
