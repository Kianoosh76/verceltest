import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(req, res) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const { title, isbn, publishedDate, available } = req.body;

        if (isbn) {
            const existingBook = await prisma.book.findUnique({
                where: {
                    isbn,
                },
            });
            if (existingBook.id !== parseInt(id)) {
                return res
                    .status(400)
                    .json({ message: "Book with this ISBN already exists" });
            }
        }

        const book = await prisma.book.update({
            where: { id: parseInt(id) },
            data: {
                title,
                isbn,
                publishedDate: publishedDate
                    ? new Date(publishedDate)
                    : undefined,
                available,
            },
        });

        res.status(200).json(book);
    } else if (req.method === "DELETE") {
        const { id } = req.query;

        await prisma.book.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: "Book deleted successfully" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;

