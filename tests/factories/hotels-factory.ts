import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";

export async function createTicketHotel(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export async function createRemoteTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      includesHotel: faker.datatype.boolean(),
      isRemote: true
    }
  });
}

export async function createTicketTypeWithoutHotel() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      includesHotel: false,
      isRemote: false
    }
  });
}

export async function createCorrectTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      includesHotel: true,
      isRemote: false
    }
  });
}

export async function createHotel() {
  const hotel = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.name.findName(),
    },
    include: {
      Rooms: true
    }
  });

  await prisma.room.createMany({
    data: [
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number(),
        hotelId: hotel.id
      },
      {
        name: faker.name.findName(),
        capacity: faker.datatype.number(),
        hotelId: hotel.id
      }
    ]
  });

  return hotel;
}
