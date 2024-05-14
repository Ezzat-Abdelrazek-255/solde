import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

const DataTable = ({
  caption,
  headers,
  cells,
}: {
  caption?: string;
  headers: any[];
  cells: any[][];
}) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow className="border-brand-accent/20   hover:bg-primary-400">
          {headers.map((header, i) => (
            <TableHead key={i} className="p-2 text-brand-accent/70">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cells.map((cell, i) => (
          <TableRow
            key={cell[0]}
            className="border-brand-accent/20 font-bold hover:bg-primary-400"
          >
            {cell.map((cell, i) => (
              <TableCell key={i}>
                {typeof cell === "object" && cell instanceof Date
                  ? cell.toISOString().slice(0, 10)
                  : cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
