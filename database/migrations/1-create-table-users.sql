CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"token" TEXT UNIQUE NOT NULL,
  "username" VARCHAR(25) UNIQUE NOT NULL,
  "prefersPrivate" BOOLEAN DEFAULT FALSE,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
);
