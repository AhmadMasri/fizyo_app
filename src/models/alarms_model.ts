import { Schema, model } from "mongoose";
import { type } from "os";

import { IAlarms } from "../types/interfaces";

const AlarmsSchema = new Schema<IAlarms>({
  name: { type: String, required: true },
  referenceType: {
    type: String,
    enum: ["agreements", "sessions", "disputes", "services providers"],
    default: "sessions",
    required: true,
  },
  referenceID: { type: String, required: true },
  frequencyUnit: {
    type: String,
    enum: ["Days", "Hours"],
    default: "Hours",
    required: true,
  },
  frequency: { type: Number, required: true },
  active: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
AlarmsSchema.virtual("url").get(function () {
  return "alarms/" + this._id;
});
module.exports = model<IAlarms>("Alarm", AlarmsSchema);