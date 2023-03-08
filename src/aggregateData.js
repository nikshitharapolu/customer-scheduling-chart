const aggregateData = (data) => {
  const aggregatedData = {};
  const uniqueItemDate = [...new Set(data.map((item) => item.item_date))];
  for (let i = 0; i < uniqueItemDate.length; i++) {
    const filteredData = data.filter(
      (elem) => elem.item_date === uniqueItemDate[i]
    );
    aggregatedData[uniqueItemDate[i]] = filteredData;
  }
  return aggregatedData;
};

export default aggregateData;
