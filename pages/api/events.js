import dbConnect from "../../lib/dbConnect";
import Event from "../../models/Event";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({});
        res.status(200).json({ success: true, data: events });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body.data);
        const adminName = req.body.data.fields.find(
          (i) => i.label === "Your Name"
        ).value;
        const adminEmail = req.body.data.fields.find(
          (i) => i.label === "Your Email"
        ).value;
        const title = req.body.data.fields.find(
          (i) => i.label === "Event Title"
        ).value;
        const description = req.body.data.fields.find(
          (i) => i.label === "Event Description"
        ).value;
        const location = req.body.data.fields.find(
          (i) => i.label === "Location"
        ).value;
        const eventDate = req.body.data.fields.find(
          (i) => i.label === "Select Date"
        ).value;
        const eventTime = req.body.data.fields.find(
          (i) => i.label === "Choose Time"
        ).value;

        const newEevent = await Event.create({
          title,
          tallyEventId: req.body.eventId,
          tallySubmissionId: req.body.data.submissionId,
          tallyRespondentId: req.body.data.respondentId,
          description,
          imageUrl: null,
          adminName,
          adminEmail,
          // eventMode: String,
          eventDateTime: eventDate + eventTime,
          eventLocation: location,
        });
        res.status(201).json({ success: true, data: newEevent });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
