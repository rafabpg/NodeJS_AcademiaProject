-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academias" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "academias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkIns" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "academia_id" TEXT NOT NULL,

    CONSTRAINT "checkIns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "checkIns" ADD CONSTRAINT "checkIns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkIns" ADD CONSTRAINT "checkIns_academia_id_fkey" FOREIGN KEY ("academia_id") REFERENCES "academias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
