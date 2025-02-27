-- CreateTable
CREATE TABLE "simulation_input" (
    "id" SERIAL NOT NULL,
    "numChargePoints" INTEGER NOT NULL,
    "arrivalMultiplier" DOUBLE PRECISION NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "chargingPower" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "simulation_input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_result" (
    "id" SERIAL NOT NULL,
    "inputId" INTEGER NOT NULL,
    "totalEnergy" DOUBLE PRECISION NOT NULL,
    "peakPower" DOUBLE PRECISION NOT NULL,
    "concurrency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "simulation_result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "simulation_result" ADD CONSTRAINT "simulation_result_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "simulation_input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
