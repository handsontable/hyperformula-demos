import { setupUI, getInputValues, displayResults } from './ui';
import { setupHF, setHFData, readResultsFromHF } from './hf';

const { hf, sheetId } = setupHF();
setupUI();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  setHFData(hf, sheetId, getInputValues());
  displayResults(readResultsFromHF(hf, sheetId));
});
