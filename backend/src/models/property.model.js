import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "villa", "land"],
      required: true,
    },
    images: [{ type: String }],
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
