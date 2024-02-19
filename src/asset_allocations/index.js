import { google } from 'googleapis';
import dayjs from 'dayjs';

const sheets = google.sheets('v4');
const credentials = require(`${process.env.PWD}/resources/zoonol-google-spreadsheet-google-service.json`);

async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  google.options({ auth: authClient });
}

async function getSheetRows(spreadsheetId, sheetName) {
  const ALL_RANGE = 'A1:ZZ';

  const sheets = google.sheets('v4');
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${ALL_RANGE}`,
  });

  return data.values;
}

async function searchValueFromRows(rows, target) {
  const { rowName, columnName } = target;
  let totalSumRow = -1;
  let assetSumColumn = -1;

  rows.forEach((row, rowIndex) => {
    if (row.includes(rowName)) {
      totalSumRow = rowIndex;
    }
  });

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      if (row[columnIndex] === columnName) {
        assetSumColumn = columnIndex;
        break;
      }
    }
    if (assetSumColumn !== -1) {
      break;
    }
  }

  if (totalSumRow !== -1 && assetSumColumn !== -1) {
    const value = rows[totalSumRow][assetSumColumn];

    return { label: target.label, value };
  } else {
    console.log('총 합계 또는 자산별 합계를 찾을 수 없습니다.');
    return null;
  }
}

async function searchValuesFromRows(rows, targets) {
  const results = [];

  for (const target of targets) {
    const result = await searchValueFromRows(rows, target);
    results.push(result);
  }

  return results;
}

async function getWeeklyIndividualAssetsSnapshot(spreadsheetId) {
  console.log('개별 자산 데이터 검색중...');

  const rows = await getSheetRows(spreadsheetId, '개별자산');
  const targets = [
    { label: '평가금액', rowName: '총 합계', columnName: '자산별 합계' },
    { label: '안전자산', rowName: '안전자산', columnName: '자산별 비율' },
    { label: '배당자산', rowName: '배당자산', columnName: '자산별 비율' },
    { label: '투자자산', rowName: '투자자산', columnName: '자산별 비율' },
  ];

  return await searchValuesFromRows(rows, targets);
}

async function getInitialInvestment(spreadsheetId) {
  const rows = await getSheetRows(spreadsheetId, '투자일지');
  const target = { label: '투자원금', rowName: '투자원금', columnName: '합계' };

  return await searchValueFromRows(rows, target);
}

async function insertIndividualAssets({ spreadsheetId, individualAssets, initialInvestment }) {
  const convertCurrencyStringToNumber = (currencyString) => {
    // 통화 기호와 쉼표를 제거하고 숫자로 변환
    const numberString = currencyString.replace(/[^0-9]/g, '');
    return parseInt(numberString, 10);
  };

  const insertToSheet = async (label, value) => {
    let targetCell;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].includes(label)) {
        let lastNonEmptyCellIndex = -1;
        for (let j = 0; j < rows[i].length; j++) {
          if (rows[i][j]) {
            lastNonEmptyCellIndex = j;
          }
        }

        if (lastNonEmptyCellIndex !== -1) {
          const nextCellIndex = lastNonEmptyCellIndex + 1;
          const columnLetter = String.fromCharCode('A'.charCodeAt(0) + nextCellIndex);
          targetCell = `분석(2024)!${columnLetter}${i + 1}`;
          break;
        }
      }
    }

    if (targetCell) {
      console.log(`값을 입력할 셀: ${targetCell}`);
    } else {
      console.log(`${label} 행을 찾을 수 없거나, 적절한 셀을 찾을 수 없습니다.`);
    }

    if (targetCell) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: targetCell,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[value]],
        },
      });
      console.log(`Value ${value} written to ${label}`);
    } else {
      console.log('No empty cell found.');
    }
  };

  const rows = await getSheetRows(spreadsheetId, '분석(2024)');
  const today = dayjs().format('YYYY/MM/DD');

  const valuation = convertCurrencyStringToNumber(
    individualAssets.find(({ label }) => label === '평가금액').value
  );
  const initialInvestmentValue = convertCurrencyStringToNumber(initialInvestment.value);

  const roi = (valuation - initialInvestmentValue) / initialInvestmentValue;
  const roiPercentage = (roi * 100).toFixed(2) + '%';

  const insertValues = [
    ...individualAssets,
    initialInvestment,
    { label: '날짜', value: today },
    { label: '수익률', value: roiPercentage },
  ];

  for (const insertValue of insertValues) {
    const { label, value } = insertValue;
    await insertToSheet(label, value);
  }
}

async function weeklyAssetAllocation() {
  await authenticate();
  console.log('----------------------------');
  const spreadsheetId = '1Gp-HspzJ969rwImrNhLNyiNf2dceBTs4qtDeQ8ZUvmA';

  const individualAssets = await getWeeklyIndividualAssetsSnapshot(spreadsheetId);
  const initialInvestment = await getInitialInvestment(spreadsheetId);
  await insertIndividualAssets({ spreadsheetId, individualAssets, initialInvestment });
}

export default weeklyAssetAllocation;
