import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, bio } = req.body;

    const author = await prisma.author.create({
      data: {
        firstName,
        lastName,
        bio,
      },
    });

    res.status(201).json(author);
  } else if (req.method === "GET") {
    const { id, firstName, lastName } = req.query;

    const where = { id: parseInt(id) || undefined };
    if (firstName) where.firstName = { contains: firstName };
    if (lastName) where.lastName = { contains: lastName };

    const authors = await prisma.author.findMany({ where });

    res.status(200).json(authors);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;

