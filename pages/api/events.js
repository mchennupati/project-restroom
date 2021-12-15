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
        const adminName = req.body.data.fields.find(
          (i) => i.label === "Your Name"
        );
        const adminEmail = req.body.data.fields.find(
          (i) => i.label === "Your Email"
        );
        const title = req.body.data.fields.find(
          (i) => i.label === "Event Title"
        );
        console.log("adminName", adminName);
        console.log("adminEmail", adminEmail);
        console.log("title", title);
        const newEevent = await Event.create({
          title,
          adminName,
          adminEmail,
        });
        // const newEevent = await Event.create({
        //   title: String,
        //   tallyEventId: req.body.eventId,
        //   tallySubmissionId: req.body.data.submissionId,
        //   tallyRespondentId: req.body.data.respondentId,
        //   description: String,
        //   imageUrl: String,
        //   adminName,
        //   adminEmail: { type: String, index: true },
        //   interests: [String],
        //   eventMode: String,
        //   eventDateTime: String,
        //   eventLocation: String,
        // });
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
