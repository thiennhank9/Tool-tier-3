export function resetScrollInsideTable(indexTable) {
  try {
    let tableBody = document.getElementsByClassName('rt-tbody')[indexTable];
    tableBody.scrollTop = 0;
  } catch (error) {
    console.log(error);
  }
}
