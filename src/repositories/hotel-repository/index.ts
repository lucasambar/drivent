import { prisma } from "@/config";

const hotelRepository = {
  findEnrollmentByUserId,
  findTicketByEnrollmentId,
  findHotels
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
