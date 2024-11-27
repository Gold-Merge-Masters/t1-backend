import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'fast-csv';
import { Readable } from 'node:stream';
import { GoldRecordMeta, IClient } from 'src/schema/clients/client.interface';
import { Client } from 'src/schema/clients/clients.entity';
import { toCamelCase } from 'src/utilities';
import { In, Repository } from 'typeorm';
import { Heap } from './heap/heap';
import { Source } from 'src/schema/source/source.entity';
import { Response } from 'express';

@Injectable()
export class DemoService {

  @InjectRepository(Client)
  private readonly clientRep: Repository<Client>;

  @InjectRepository(Source)
  private readonly sourceRep: Repository<Source>;

  public async uploadCsv(file: Express.Multer.File, res: Response): Promise<boolean> {
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Transfer-Encoding', 'chunked');

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

    const newClients = rows.map((row, index) => {
      const rowClient = toCamelCase<IClient>(row);
      const { clientId, clientFioFull, sourceCd, createDate, updateDate, ...etc } = rowClient;
      const dbSource = sourcesMap.get(sourceCd);
      const dbClient = clientsMap.get(rowClient.clientFioFull) || this.clientRep.create({
        clientFioFull: clientFioFull
      });

      if (!dbSource) {
        return;
      }
      for (const [row, value] of Object.entries(etc)) {
        const pq = new Heap<GoldRecordMeta<any>>((a, b) => {
          if (a.rate !== b.rate) {
            return a.rate > b.rate;
          }
          const aCreated_at = new Date(a.created_at);
          const bCreated_at = new Date(b.created_at);

          if (aCreated_at !== bCreated_at) {
            return aCreated_at > bCreated_at;
          }
          const aUpdated_at = new Date(a.updated_at);
          const bUpdated_at = new Date(b.updated_at);

          if (aUpdated_at !== bUpdated_at) {
            return aUpdated_at > bUpdated_at;
          }
        });
        if (value === 'Рейтинг!') {
          console.log()
        }
        const item: GoldRecordMeta<any> = {
          data: value,
          source_id: dbSource.id,
          rate: dbSource.rate,
          created_at: new Date,
          updated_at: new Date,
        }

        if (dbClient[row] && dbClient[row].length > 0) {
          const goldRecordMetas = dbClient[row] as GoldRecordMeta<any>[];

          const check = goldRecordMetas.find(meta => meta.data === item.data);

          if (check) {
            continue;
          }
          for (const it of goldRecordMetas) {
            pq.push(it);
          }
          pq.push(item);
        }
        if (pq['data'].length > 0) {
          dbClient[row] = pq['data'];
        } else {
          dbClient[row] = [item];
        }
        res.write(JSON.stringify({
          total: rows.length,
          current: index + 1
        }, null, 2))
      }
      return dbClient;
    });

    // for (const [idx, _] of newClients.entries()) {
    //   await new Promise(res => setTimeout(res, 1000));
    //   res.write(JSON.stringify({
    //     total: newClients.length,
    //     current: idx + 1
    //   }, null, 2))
    // }

    if (newClients.length > 0) {
      const res = await this.clientRep.save(newClients)
    }
    res.end();
    return true;
  }

  public async getClients() {
    const clients = await this.clientRep.find();

    const resClients = clients.map(client => {
      const { id, clientFioFull, ...etc } = client;

      for (const [key, value] of Object.entries(etc)) {
        client[key] = client[key][0].data;
      }
      client['id'] = id;
      client['clientFioFull'] = clientFioFull
      return client;
    })
    return resClients;
  }
}
