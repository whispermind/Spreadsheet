declare interface IDataRequestOptions {
  page: number;
  perPage: number;
  sortingBy: string;
  sortingOrd: "asc" | "desc";
  filteringField: string;
  filteringSubject: string;
}