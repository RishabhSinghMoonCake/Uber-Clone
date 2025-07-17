import captainModel from "../models/captain.model.js";


export default async function createCaptain({ fullname, email, password, vehicle }) {
  if (
    !fullname?.firstname ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
    throw new Error("All fields are required");
  }

  try {
    const newCaptain = await captainModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      }
    });
    return newCaptain;
  } catch (error) {
    throw new Error(`Error creating captain: ${error.message}`);
  }
  
}