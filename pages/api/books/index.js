import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(req, res) {
    if (req.method === "POST") {
        const { title, isbn, publishedDate, available, authorId } = req.body;

        const author = await prisma.author.findUnique({
            where: { id: parseInt(authorId) },
        });

        if (!author) {
            return res.status(400).json({ message: "Author not found" });
        }

        const book = await prisma.book.create({
            data: {
                title,
                isbn,
                publishedDate: new Date(publishedDate),
                available,
                authorId,
            },
        });

        res.status(201).json(book);
    }
    if (req.method === "GET") {
        const { authorId, title, available } = req.query;

        const where = {};
        if (authorId) where.authorId = parseInt(authorId);
        if (title) where.title = { contains: title };
        if (available !== undefined) where.available = available === "true";

        const books = await prisma.book.findMany({
            where,
            include: { author: true },
        });

        res.status(200).json(books);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;

