set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."quotes" (
	"created" TIMESTAMP NOT NULL,
	"quoteText" TEXT NOT NULL,
	"page" integer NOT NULL DEFAULT 0,
	"gBooksId" integer NOT NULL,
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "quotes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."books" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL,
	"gBooksId" TEXT NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"id" serial NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk0" FOREIGN KEY ("gBooksId") REFERENCES "books"("id");
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");
