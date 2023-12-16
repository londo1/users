import { useState, useEffect } from "react";

const calculateRange = (data: unknown[], pageSize: number) => {
  const range = [];
  const num = Math.ceil(data.length / pageSize);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data: any[], currentPage: number, pageSize: number) =>
  data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

export function useTable<T>(data: T[], currentPage: number, pageSize: number) {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<T[]>([]);

  useEffect(() => {
    const range = calculateRange(data, pageSize);
    setTableRange([...range]);

    const slice = sliceData(data, currentPage, pageSize);
    setSlice([...slice]);
  }, [data, setTableRange, currentPage, setSlice, pageSize]);

  return { slice, range: tableRange };
}
