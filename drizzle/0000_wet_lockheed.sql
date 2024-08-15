CREATE TABLE IF NOT EXISTS "shadcn_students" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"email_address" varchar(128),
	"phone_number" varchar(30) NOT NULL,
	"instance" varchar(128) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "shadcn_students_name_unique" UNIQUE("name")
);
