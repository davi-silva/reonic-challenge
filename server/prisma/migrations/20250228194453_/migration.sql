-- CreateTable
CREATE TABLE "simulations" (
    "id" SERIAL NOT NULL,
    "numChargePoints" INTEGER NOT NULL,
    "arrivalMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 100.0,
    "consumption" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "chargingPower" DOUBLE PRECISION NOT NULL DEFAULT 11.0,
    "totalEnergy" DOUBLE PRECISION,
    "maxPower" DOUBLE PRECISION,
    "theoreticalMaxPower" DOUBLE PRECISION,
    "concurrencyFactor" DOUBLE PRECISION,
    "chargingEvents" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulations_pkey" PRIMARY KEY ("id")
);
