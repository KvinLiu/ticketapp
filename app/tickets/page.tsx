import prisma from "@/prisma/db";
const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  console.log("tickets? ", tickets);

  return <div>Tickets</div>;
};

export default Tickets;
