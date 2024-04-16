import { getComparator, stableSort } from "@/utils/sort";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useMemo, useState } from "react";

interface Data {
  label: string;
  data: number[];
}
type Props = {
  tableTitle: string;
  tableHeadData: string[];
  datas: Data[];
};

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export const TableBasic: React.FC<Props> = ({ tableTitle, tableHeadData, datas }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(tableHeadData[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = useMemo(() => {
    return datas;
  }, [datas]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //   const visibleRows = useMemo(
  //     () =>
  //       stableSort(rows, getComparator(order, orderBy)).slice(
  //         page * rowsPerPage,
  //         page * rowsPerPage + rowsPerPage,
  //       ),
  //     [order, orderBy, page, rowsPerPage],
  //   );

  interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  const headCells: HeadCell[] = useMemo(() => {
    return tableHeadData.map((item) => {
      return {
        id: item,
        label: item,
        numeric: true,
        disablePadding: true,
      };
    });
  }, [tableHeadData]);

  const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { onRequestSort, order, orderBy, rowCount } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell>지역</TableCell>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align={headCell.numeric ? "right" : "left"} padding={headCell.disablePadding ? "none" : "normal"} sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const EnhancedTableToolbar = ({ tableTitle }: { tableTitle: string }) => {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {tableTitle}
        </Typography>
      </Toolbar>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar tableTitle={tableTitle} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
            <TableBody>
              {datas &&
                datas.length > 0 &&
                datas.map((item, index) => {
                  const { data, label } = item;
                  return (
                    <TableRow>
                      <TableCell>{label}</TableCell>
                      {data.length > 0 &&
                        data.map((children, childrenItem) => {
                          return <TableCell>{children}</TableCell>;
                        })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
TableBasic.displayName = "TableBasic";
