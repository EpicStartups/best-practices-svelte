CREATE TABLE IF NOT EXISTS "dice_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"value" integer NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "family";--> statement-breakpoint
DROP TABLE "friend";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dice_entries" ADD CONSTRAINT "dice_entries_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;