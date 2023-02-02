CREATE TABLE "public"."quotes" (
	"created" TIMESTAMP NOT NULL DEFAULT NOW(),
	"quoteText" TEXT NOT NULL,
  "quoteVector" TSVECTOR NOT NULL,
	"page" integer DEFAULT NULL,
  "isDeleted" BOOLEAN DEFAULT FALSE,
  "isPrivate" BOOLEAN DEFAULT FALSE,
	"bookId" integer NOT NULL,
	"quoteId" serial NOT NULL,
  "pubQuoteId" UUID NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "quotes_pk" PRIMARY KEY ("quoteId")
);

ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk0" FOREIGN KEY ("bookId") REFERENCES "books"("bookId");
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
