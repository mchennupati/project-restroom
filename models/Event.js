import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    tallyEventId: String,
    tallySubmissionId: String,
    tallyRespondentId: String,
    description: String,
    imageUrl: String,
    adminName: String,
    adminEmail: { type: String, index: true },
    interests: [String],
    eventMode: String,
    eventDateTime: String,
    eventLocation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Event || mongoose.model("Event", EventSchema);
