-- CreateTable
CREATE TABLE `HistoricoCompras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quantidade` INTEGER NOT NULL,
    `produtoNome` VARCHAR(191) NOT NULL,
    `fornecedorNome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
