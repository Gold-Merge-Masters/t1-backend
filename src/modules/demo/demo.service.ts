import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'fast-csv';
import { Readable } from 'node:stream';
import { GoldRecordMeta, IClient } from 'src/schema/clients/client.interface';
import { Client } from 'src/schema/clients/clients.entity';
import { toCamelCase } from 'src/utilities';
import { In, Repository, UsingJoinTableOnlyOnOneSideAllowedError } from 'typeorm';
import { Heap } from './heap/heap';
import { Source } from 'src/schema/source/source.entity';

@Injectable()
export class DemoService {

  @InjectRepository(Client)
  private readonly clientRep: Repository<Client>;

  @InjectRepository(Source)
  private readonly sourceRep: Repository<Source>;

  public async uploadCsv(file: Express.Multer.File): Promise<boolean> {
    const columnClientFioName = 'client_fio_full'
    const columnSourceName = 'source_cd'

    const rowSources: string[] = [];
    const rows: any[] = [];


    const constUniques = await new Promise<string[]>((resolve, reject) => {
      const columnData: string[] = [];

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      bufferStream
        .pipe(parse({ headers: true }))
        .on('data', (row) => {
          if (row[columnClientFioName] !== undefined) {
            rows.push(row);
            columnData.push(row[columnClientFioName]);
          }
          if (row[columnSourceName] !== undefined) {
            rowSources.push(row[columnSourceName]);
          }
        })
        .on('end', () => {
          resolve(columnData);
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    const sources = await this.sourceRep.find({
      where: {
        source: In(rowSources)
      }
    })
    const clients = await this.clientRep.find({
      where: {
        clientFioFull: In(constUniques)
      }
    });
    const sourcesMap = new Map<string, Source>(sources.map(
      source => [source.source, source]
    ));
    const clientsMap = new Map<string, Client>(clients.map(
      client => [client.clientFioFull, client]
    ));

    const newClients = rows.map(row => {
      const rowClient = toCamelCase<IClient>(row);
      const { clientId, clientFioFull, sourceCd, createDate, updateDate, ...etc } = rowClient;
      const dbSource = sourcesMap.get(sourceCd);
      const dbClient = clientsMap
        .get(rowClient.clientFioFull) || this.clientRep.create({
          clientFioFull: clientFioFull
        });
      if (!dbSource) {
        return;
      }
      for (const [row, value] of Object.entries(etc)) {
        const pq = new Heap<GoldRecordMeta<any>>(
          (a, b) => a.rate > b.rate
        )

        const item: GoldRecordMeta<any> = {
          index: 0,
          data: value,
          source_id: dbSource.id,
          rate: dbSource.rate,
          created_at: new Date,
          updated_at: new Date,
        }

        if (dbClient[row] && dbClient[row].length > 0) {
          for (const it of dbClient[row]) {
            pq.push(it);
          }
        }
        pq.push(item);
        dbClient[row] = pq['data'];
      }
      return dbClient;
    });
    const res = await this.clientRep.save(newClients)
    return true;
    // const raws = new Array(Math.ceil(length / limit)).fill(null).map(
    //   (_, index) => new Array<Entity>(
    //     (length / (index + 1)) > limit ? limit : length - (limit * index)
    //   )
    // );
  }
}
