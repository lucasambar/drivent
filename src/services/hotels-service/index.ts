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

async function get(userId: number) {
  const enrollmentId = await validateUserId(userId);
  await validateEnrollment(enrollmentId);
  const hotels = await hotelRepository.findHotels();
  return hotels;
}

const hotelService = {
  get,
};

export default hotelService;
