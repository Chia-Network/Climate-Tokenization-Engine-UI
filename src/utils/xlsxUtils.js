import xlsx from 'json-as-xlsx';
import _ from 'lodash';

let settings = {
  fileName: 'Spreadsheet',
  extraLength: 3,
  writeMode: 'writeFile',
  writeOptions: {},
};

export const downloadXlsxFromDataAndHeadings = (unformattedData, headings) => {
  const formattedDataForXlsx = [
    {
      sheet: 'Tokens',
      columns: headings.map(heading => ({ label: heading, value: heading })),
      content: unformattedData.map(item => _.pick(item, headings)),
    },
  ];

  xlsx(formattedDataForXlsx, settings); // Will download the excel file
};
