import React from "react";

export interface TableColumn<T> {
  label: string;
  key: string;
  render?: (column: TableColumn<T>, item: T) => void;
  width?: string;
}

export interface TableProperties<T> {
  title: string;
  pageSize: number;
  filterFields: any;
  tableElements: T[];
  columns: TableColumn<T>[];
  tableId: string;
}

export interface TableFooterProperties {
  range: number[];
  setPage: Function;
  page: number;
  slice: any[];
  columnsCount: number;
  tableId: string;
}

export interface Filter {
  label: string;
  render: () => React.ReactElement;
}

export interface TableFiltersProperties {
  filterFields: Filter[];
}

export interface TableHeaderProperties<T> {
  columns: TableColumn<T>[];
  title: string;
  filters: Filter[];
  tableId: string;
}

export interface TableBodyProperties<T> {
  columns: TableColumn<T>[];
  slice: any[];
  tableId: string;
}
