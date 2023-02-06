import hotelRepository from "@/repositories/hotel-repository";
import hotelErrors from "./error";

async function validateUserId(userId: number) {
  const enrollment = await hotelRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw hotelErrors.notFound("Enrollment not found.");
  return enrollment.id;
}

async function validateEnrollment(enrollmentId: number) {
  const ticket = await hotelRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket) throw hotelErrors.notFound("Ticket not found.");
  if (ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw hotelErrors.paymentRequired();
  return;
}

async function findHotel(hotelId: number) {
  const hotel = await hotelRepository.findHotelById(hotelId);
  if (!hotel) throw hotelErrors.notFound("Hotel not found.");
  return hotel;
}

async function findHotels() {
  const hotels = await hotelRepository.findHotels();
  if (hotels.length === 0) throw hotelErrors.notFound("Not found any hotels.");
  return hotels;
}

async function get(userId: number) {
  const enrollmentId = await validateUserId(userId);
  await validateEnrollment(enrollmentId);
  const hotels = await findHotels();
  return hotels;
}

async function getWithId(userId: number, hotelId: number) {
  const enrollmentId = await validateUserId(userId);
  await validateEnrollment(enrollmentId);
  
  const hotel = await findHotel(hotelId);
  const rooms = await hotelRepository.findRoomsForhotel(hotelId);
  return { ...hotel, rooms };
}

const hotelService = {
  get,
  getWithId
};

export default hotelService;
