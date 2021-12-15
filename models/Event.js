import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventTitle: String,
    eventDescription: String,
    tallyEventId: String,
    tallySubmissionId: String,
    tallyRespondentId: String,
    userDescription: String,
    imageUrl: String,
    adminName: String,
    adminEmail: { type: String, index: true },
    interests: [String],
    eventMode: String,
    eventDateTime: String,
    eventLocation: String,
    similarLink: String,
    duration: String,
    onlineLink: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
