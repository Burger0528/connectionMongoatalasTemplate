import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI no está definida en las variables de entorno");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("DB online");
  } catch (err) {
    console.error("Error conectando a la base de datos:", err);
    throw err;
  }
};


