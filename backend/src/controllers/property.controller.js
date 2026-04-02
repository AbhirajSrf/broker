import Property from "../models/property.model.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      images,
      bedrooms,
      bathrooms,
      propertyType,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !bedrooms ||
      !bathrooms ||
      !propertyType
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images: images || [],
      bedrooms,
      bathrooms,
      propertyType,
    });

    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in createProperty: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error in getProperties: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const userId = req.user._id;
    const properties = await Property.find({ favourites: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error in getFavourites: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const alreadyLiked = property.likes.some(
      (uid) => uid.toString() === userId.toString()
    );

    if (alreadyLiked) {
      property.likes = property.likes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      property.likes.push(userId);
    }

    await property.save();
    res
      .status(200)
      .json({ likes: property.likes.length, liked: !alreadyLiked });
  } catch (error) {
    console.error("Error in toggleLike: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const alreadyFavourited = property.favourites.some(
      (uid) => uid.toString() === userId.toString()
    );

    if (alreadyFavourited) {
      property.favourites = property.favourites.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      property.favourites.push(userId);
    }

    await property.save();
    res.status(200).json({ favourited: !alreadyFavourited });
  } catch (error) {
    console.error("Error in toggleFavourite: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
