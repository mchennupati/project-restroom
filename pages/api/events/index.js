import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find(
          null,
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
          (i) => i.label === "What is your name ?"
        )?.value;

        const adminEmail = req.body.data.fields.find(
          (i) => i.label === "What is your email address ?"
        )?.value;

        const eventTitle = req.body.data.fields.find(
          (i) =>
            i.label ===
            "Give us a short title for what you would like to do..  e.g Read a Story."
        )?.value;

        const userDescription = req.body.data.fields.find(
          (i) => i.label === "Tell us about yourself"
        )?.value;

        const eventModeValue = req.body.data.fields.find(
          (i) => i.label === "Where would you like to do it ?"
        );

        const eventMode = eventModeValue.options.find(
          (i) => i.id === eventModeValue.value
        )?.text;

        const location = req.body.data.fields.find(
          (i) => i.label === "Location"
        )?.value;

        const onlineLink = req.body.data.fields.find(
          (i) => i.label === "Zoom or Meet Link"
        )?.value;

        const eventDate = req.body.data.fields.find(
          (i) => i.label === "When would you like to do it ?"
        )?.value;

        const eventTime = req.body.data.fields.find(
          (i) => i.label === "What time works for you ?"
        )?.value;

        const eventDescription = req.body.data.fields.find(
          (i) => i.label === "Tell us about your activity"
        )?.value;

        const similarLink = req.body.data.fields.find(
          (i) => i.label === "Share a link if you have done this before..."
        )?.value;

        const duration = req.body.data.fields.find(
          (i) => i.label === "How long would you like to do it  for ?"
        )?.value;

        const newEevent = await Event.create({
          tallyEventId: req.body.eventId,
          tallySubmissionId: req.body.data.submissionId,
          tallyRespondentId: req.body.data.respondentId,
          eventTitle,
          eventDescription,
          userDescription,
          imageUrl: null,
          adminName,
          adminEmail,
          eventMode,
          eventDateTime: eventDate + " " + eventTime,
          eventLocation: location,
          similarLink,
          duration,
          onlineLink,
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
