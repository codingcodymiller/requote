CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"token" TEXT UNIQUE NOT NULL,
  "username" VARCHAR(20) UNIQUE NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
);
