export * from '../../utils/rules';

export const formatCurrencyLPA = (val) => {
  if (val === undefined || val === null) return 'N/A';
  return `₹${val} LPA`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};
