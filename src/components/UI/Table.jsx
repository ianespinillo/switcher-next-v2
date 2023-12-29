// components/Table.js

import React from 'react'
import styles from '@/Styles/table.module.css'

const Table = ({ children }) => {
  return <table className={styles.table}>{children}</table>
}

const TableHeader = ({ children }) => {
  return <thead className={styles.tableHeader}>{children}</thead>
}

const TableRow = ({ children }) => {
  return <tr className={styles.tableRow}>{children}</tr>
}

const TableHead = ({ children }) => {
  return <th className={styles.tableHead}>{children}</th>
}

const TableBody = ({ children }) => {
  return <tbody className={styles.tableBody}>{children}</tbody>
}

const TableCell = ({ children }) => {
  return <td className={styles.tableCell}>{children}</td>
}

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell}
