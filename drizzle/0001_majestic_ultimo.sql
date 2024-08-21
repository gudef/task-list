CREATE TABLE IF NOT EXISTS "card" (
	"id" text PRIMARY KEY NOT NULL,
	"listId" text,
	"title" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text,
	"title" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "card" ADD CONSTRAINT "card_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "list" ADD CONSTRAINT "list_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
