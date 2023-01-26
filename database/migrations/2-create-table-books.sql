CREATE TABLE "public"."books" (
	"bookId" serial NOT NULL,
  "pubBookId" UUID NOT NULL,
	"title" TEXT NOT NULL,
  "authors" TEXT[],
  "image" TEXT NOT NULL,
  "description" TEXT NOT NULL,
	"isbn" TEXT UNIQUE NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("bookId")
);
