import dbConnect from "../../../lib/dbConnect";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const event = await Event.findById(
          req.query.eventId,
          "eventTitle eventDescription userDescription imageUrl adminName adminEmail eventMode eventDateTime eventLocation similarLink duration onlineLink"
        );
        res.status(200).json({ success: true, event });
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
