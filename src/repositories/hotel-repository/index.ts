import { prisma } from "@/config";

const hotelRepository = {
  findEnrollmentByUserId,
  findTicketByEnrollmentId,
  findHotels,
  findHotelById,
  findRoomsForhotel
};

export default hotelRepository;

function findEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId }
  });
}

function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
}

function findHotels() {
  return prisma.hotel.findMany();
}

function findHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId }
  });
}

function findRoomsForhotel(hotelId: number) {
  return prisma.room.findMany({
    where: { hotelId }
  });
}
