-- CreateEnum
CREATE TYPE "public"."Teamstatus" AS ENUM ('Active', 'Closed');

-- CreateEnum
CREATE TYPE "public"."categoryName" AS ENUM ('ML', 'Dev', 'Web_3');

-- CreateEnum
CREATE TYPE "public"."requestType" AS ENUM ('leader_to_User', 'user_to_Leader');

-- CreateEnum
CREATE TYPE "public"."reqStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Helper', 'ML_eng', 'Frontend_dev', 'Backend_dev', 'Design');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'Helper',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bio" TEXT,
    "maxteamlimit" INTEGER NOT NULL DEFAULT 3,
    "linkedin" TEXT,
    "profileurl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamMembers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "teamname" TEXT NOT NULL,
    "maxteamsize" INTEGER NOT NULL DEFAULT 5,
    "category" "public"."categoryName" NOT NULL DEFAULT 'Dev',
    "leaderid" TEXT NOT NULL,
    "leadername" TEXT NOT NULL,
    "projectname" TEXT NOT NULL,
    "projectdesc" TEXT NOT NULL,
    "hackathonname" TEXT NOT NULL,
    "hackathonlink" TEXT,
    "hackathondesc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "teamstatus" "public"."Teamstatus" NOT NULL DEFAULT 'Active',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."userReqtojointeam" (
    "id" TEXT NOT NULL,
    "teamid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "leaderid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "status" "public"."reqStatus" NOT NULL DEFAULT 'PENDING',
    "requesttype" "public"."requestType" NOT NULL DEFAULT 'user_to_Leader',
    "rejectionmsg" TEXT,

    CONSTRAINT "userReqtojointeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LeaderReqUserToJoinThereTeam" (
    "id" TEXT NOT NULL,
    "leaderid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "teamid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "status" "public"."reqStatus" NOT NULL DEFAULT 'PENDING',
    "requesttype" "public"."requestType" NOT NULL DEFAULT 'leader_to_User',
    "rejectionmsg" TEXT,

    CONSTRAINT "LeaderReqUserToJoinThereTeam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMembers_id_key" ON "public"."TeamMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "public"."Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamname_key" ON "public"."Team"("teamname");

-- AddForeignKey
ALTER TABLE "public"."TeamMembers" ADD CONSTRAINT "TeamMembers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TeamMembers" ADD CONSTRAINT "TeamMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_leaderid_fkey" FOREIGN KEY ("leaderid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userReqtojointeam" ADD CONSTRAINT "userReqtojointeam_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userReqtojointeam" ADD CONSTRAINT "userReqtojointeam_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userReqtojointeam" ADD CONSTRAINT "userReqtojointeam_leaderid_fkey" FOREIGN KEY ("leaderid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaderReqUserToJoinThereTeam" ADD CONSTRAINT "LeaderReqUserToJoinThereTeam_leaderid_fkey" FOREIGN KEY ("leaderid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaderReqUserToJoinThereTeam" ADD CONSTRAINT "LeaderReqUserToJoinThereTeam_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaderReqUserToJoinThereTeam" ADD CONSTRAINT "LeaderReqUserToJoinThereTeam_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
