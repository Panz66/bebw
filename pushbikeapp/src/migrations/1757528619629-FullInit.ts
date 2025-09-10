import { MigrationInterface, QueryRunner } from "typeorm";

export class FullInit1757528619629 implements MigrationInterface {
    name = 'FullInit1757528619629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lomba\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(200) NOT NULL, \`tanggal\` date NOT NULL, \`jumlahPeserta\` int NOT NULL, \`jumlahBatch\` int NOT NULL DEFAULT '1', \`biaya\` int NOT NULL, \`kategori\` enum ('boy', 'girl') NOT NULL DEFAULT 'boy', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`point_sesi\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sesi\` int NOT NULL, \`finish\` int NULL, \`point\` int NOT NULL DEFAULT '0', \`penalty_point\` int NOT NULL DEFAULT '0', \`match_name\` varchar(100) NULL, \`pesertaIdPendaftaran\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`peserta\` (\`id_pendaftaran\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(200) NOT NULL, \`plat_number\` varchar(50) NOT NULL, \`community\` varchar(100) NOT NULL, \`no_hp\` varchar(255) NOT NULL, \`point1\` int NOT NULL DEFAULT '0', \`point2\` int NOT NULL DEFAULT '0', \`penaltyPoint\` int NULL DEFAULT '0', \`batch\` int NULL, \`kategori\` enum ('boy', 'girl') NOT NULL, \`metode_pembayaran\` enum ('transfer', 'midtrans', 'cod') NOT NULL DEFAULT 'transfer', \`statusPembayaran\` tinyint NOT NULL DEFAULT 0, \`lomba_id\` int NOT NULL, PRIMARY KEY (\`id_pendaftaran\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id_pendaftaran\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(255) NOT NULL, \`plat_number\` varchar(255) NOT NULL, \`community\` varchar(255) NOT NULL, \`point1\` int NOT NULL, \`point2\` int NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_95519f39da57b708e7450efb19\` (\`nama\`), PRIMARY KEY (\`id_pendaftaran\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pesan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nama\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`pesan\` text NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` ADD CONSTRAINT \`FK_510c1e5584153de291f83f81ca8\` FOREIGN KEY (\`pesertaIdPendaftaran\`) REFERENCES \`peserta\`(\`id_pendaftaran\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peserta\` ADD CONSTRAINT \`FK_952900f4a5894511f5b3cb8b412\` FOREIGN KEY (\`lomba_id\`) REFERENCES \`lomba\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`peserta\` DROP FOREIGN KEY \`FK_952900f4a5894511f5b3cb8b412\``);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` DROP FOREIGN KEY \`FK_510c1e5584153de291f83f81ca8\``);
        await queryRunner.query(`DROP TABLE \`pesan\``);
        await queryRunner.query(`DROP INDEX \`IDX_95519f39da57b708e7450efb19\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`peserta\``);
        await queryRunner.query(`DROP TABLE \`point_sesi\``);
        await queryRunner.query(`DROP TABLE \`lomba\``);
    }

}
