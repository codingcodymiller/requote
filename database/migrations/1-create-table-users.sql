CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"token" TEXT UNIQUE NOT NULL,
  "username" TEXT UNIQUE NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
);
