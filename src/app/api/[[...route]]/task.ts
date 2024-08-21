import { db } from "@/db/drizzle";
import { card, list } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";


const app = new Hono()
    .delete("/deletecard",
        verifyAuth(),
        zValidator("json",
            z.object({
                listId: z.string(),
                id: z.string()
            })),
        async (c) => {
            const auth = c.get("authUser");
            const { id, listId } = c.req.valid("json");

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            await db.delete(card).where(
                and(eq(card.id, id),
                    eq(card.listId, listId))
            )

            return c.json(null, 200);

        }
    )
    .post("/editcard",
        verifyAuth(),
        zValidator("json",
            z.object({
                listId: z.string(),
                id: z.string(),
                title: z.string()
            })),
        async (c) => {
            const auth = c.get("authUser");
            const { title, id, listId } = c.req.valid("json");

            console.log(title, id);

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .update(card)
                .set({
                    title
                }).where(
                    and(eq(card.id, id),
                        eq(card.listId, listId)
                    )
                ).returning()

            return c.json({ data });

        }
    )
    .get("/card/:id",
        zValidator("param",
            z.object({
                id: z.string()
            })),
        verifyAuth(),
        async (c) => {
            const auth = c.get("authUser");
            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.valid("param");

            const data = await db.select()
                .from(card)
                .where(eq(card.listId, id));

            return c.json({ data });
        }
    )
    .post("/addcard",
        verifyAuth(),
        zValidator("json",
            z.object({
                id: z.string(),
                title: z.string()
            })),
        async (c) => {
            const auth = c.get("authUser");
            const { id, title } = c.req.valid("json");

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db.insert(card).values({
                title,
                listId: id,
            }).returning()

            return c.json({ data });

        }
    )
    .delete("/deletelist",
        verifyAuth(),
        zValidator("json",
            z.object({
                id: z.string()
            })),
        async (c) => {
            const auth = c.get("authUser");
            const { id } = c.req.valid("json");

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            await db.delete(list).where(
                and(eq(list.id, id),
                    eq(list.userId, auth.token?.id as string))
            )

            return c.json(null, 200);

        }
    )
    .post("/editlist",
        verifyAuth(),
        zValidator("json",
            z.object({
                id: z.string(),
                title: z.string()
            })),
        async (c) => {
            const auth = c.get("authUser");
            const { title, id } = c.req.valid("json");

            console.log(title, id);

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .update(list)
                .set({
                    title
                }).where(
                    and(eq(list.id, id),
                        eq(list.userId, auth.token?.id as string)
                    )
                ).returning()

            return c.json({ data });

        }
    )
    .post("/addlist",
        verifyAuth(),
        zValidator("json", z.object({ title: z.string() })),
        async (c) => {
            const auth = c.get("authUser");
            const { title } = c.req.valid("json");

            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db.insert(list).values({
                title,
                userId: auth.token?.id,
            }).returning()

            return c.json({ data });

        }
    )
    .get("/list",
        verifyAuth(),
        async (c) => {
            const auth = c.get("authUser");
            if (!auth.token?.id) {
                c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db.select()
                .from(list)
                .where(eq(list.userId, auth.token?.id as string));

            return c.json({ data });
        }
    )

export default app;