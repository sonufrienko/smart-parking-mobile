export const createInvoice = `mutation CreateInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    parkingID
    invoiceID
    slotNumber
    dateFrom
    dateTo
    plateNumber
    price
  }
}
`;
export const closeInvoice = `mutation CloseInvoice($input: CloseInvoiceInput!) {
  closeInvoice(input: $input) {
    parkingID
    invoiceID
    slotNumber
    dateFrom
    dateTo
    plateNumber
    price
  }
}
`;