const getDateRange = startYear => {
  const currentYear = new Date().getFullYear();
  let dateRange = startYear;
  if (currentYear > startYear) {
    // En dash unicode: \u2013
    dateRange += `\u2013${currentYear}`;
  }
  return dateRange;
};

export default getDateRange;
