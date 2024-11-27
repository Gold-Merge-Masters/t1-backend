export interface GoldRecordMeta<T> {
  index: number;
  data: T;
  source_id: number;
  rate: number;
  created_at: Date;
  updated_at: Date;
}

export interface IClient {
  clientId: number;
  clientFirstName: string;
  clientMiddleName: string | null;
  clientLastName: string;
  clientFioFull: string;
  clientBday: string | null;
  clientBplace: string | null;
  clientCityzen: string | null;
  clientResidentCd: string | null;
  clientGender: string | null;
  clientMaritalCd: string | null;
  clientGraduate: string | null;
  clientChildCnt: number | null;
  clientMilCd: string | null;
  clientZagranCd: string | null;
  clientInn: string | null;
  clientSnils: string | null;
  clientVipCd: string | null;
  contactVc: string | null;
  contactTg: string | null;
  contactOther: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  addrRegion: string | null;
  addrCountry: string | null;
  addrZip: string | null;
  addrStreet: string | null;
  addrHouse: string | null;
  addrBody: string | null;
  addrFlat: string | null;
  addrArea: string | null;
  addrLoc: string | null;
  addrCity: string | null;
  addrRegDt: string | null;
  addrStr: string | null;
  finRating: number | null;
  finLoanLimit: number | null;
  finLoanValue: number | null;
  finLoanDebt: number | null;
  finLoanPercent: number | null;
  finLoanBeginDt: string | null;
  finLoanEndDt: string | null;
  streamFavoriteShow: string | null;
  streamDuration: number | null;
  createDate: string;
  updateDate: string;
  sourceCd: string;
}
