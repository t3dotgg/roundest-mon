-- CreateIndex
CREATE INDEX `Vote_votedForId_idx` ON `Vote`(`votedForId`);

-- CreateIndex
CREATE INDEX `Vote_votedAgainstId_idx` ON `Vote`(`votedAgainstId`);
