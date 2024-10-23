CREATE TABLE IF NOT EXISTS "family" (
	"friend_id" text NOT NULL,
	"nick_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friend" (
	"user_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"best" boolean NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_friend_id_friend_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."friend"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend" ADD CONSTRAINT "friend_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
