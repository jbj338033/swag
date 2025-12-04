-- CreateTable
CREATE TABLE "Spec" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "spec" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);
