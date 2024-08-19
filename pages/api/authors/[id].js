import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(req, res) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const { firstName, lastName, bio } = req.body;

        const author = await prisma.author.update({
            where: { id: parseInt(id) },
            data: {
                firstName,
                lastName,
                bio,
            },
        });

        res.status(200).json(author);
    } else if (req.method === "DELETE") {
        const { id } = req.query;

        await prisma.author.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({
            message: "Author and their books deleted successfully",
        });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;

