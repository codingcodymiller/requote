set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."quotes" (
	"created" TIMESTAMP NOT NULL DEFAULT NOW(),
	"quoteText" TEXT NOT NULL,
  "quoteVector" TSVECTOR NOT NULL,
	"page" integer DEFAULT NULL,
	"bookId" integer NOT NULL,
	"quoteId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "quotes_pk" PRIMARY KEY ("quoteId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."books" (
	"bookId" serial NOT NULL,
	"title" TEXT NOT NULL,
  "authors" TEXT[],
  "image" TEXT NOT NULL,
  "synopsis" TEXT NOT NULL,
	"isbn" TEXT UNIQUE NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("bookId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk0" FOREIGN KEY ("bookId") REFERENCES "books"("bookId");
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
