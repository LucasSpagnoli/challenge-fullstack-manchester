import { Prisma } from "@prisma/client"

export interface News extends Prisma.JsonObject {
    title: string
    source: string
    url: string
    summary: string
    imageUrl: string
}