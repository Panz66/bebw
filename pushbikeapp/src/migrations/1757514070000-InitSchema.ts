/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1757514070000 implements MigrationInterface {
    name = 'InitSchema1757514070000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_sesi\` DROP FOREIGN KEY \`FK_510c1e5584153de291f83f81ca8\``);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`finish\` \`finish\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`match_name\` \`match_name\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`pesertaIdPendaftaran\` \`pesertaIdPendaftaran\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`peserta\` CHANGE \`batch\` \`batch\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`peserta\` CHANGE \`statusPembayaran\` \`statusPembayaran\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` ADD CONSTRAINT \`FK_510c1e5584153de291f83f81ca8\` FOREIGN KEY (\`pesertaIdPendaftaran\`) REFERENCES \`peserta\`(\`id_pendaftaran\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`point_sesi\` DROP FOREIGN KEY \`FK_510c1e5584153de291f83f81ca8\``);
        await queryRunner.query(`ALTER TABLE \`peserta\` CHANGE \`statusPembayaran\` \`statusPembayaran\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`peserta\` CHANGE \`batch\` \`batch\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`pesertaIdPendaftaran\` \`pesertaIdPendaftaran\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`match_name\` \`match_name\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` CHANGE \`finish\` \`finish\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`point_sesi\` ADD CONSTRAINT \`FK_510c1e5584153de291f83f81ca8\` FOREIGN KEY (\`pesertaIdPendaftaran\`) REFERENCES \`peserta\`(\`id_pendaftaran\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
