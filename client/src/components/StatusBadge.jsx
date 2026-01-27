/**
 * StatusBadge Component
 * Displays stock status with color coding based on stock levels
 */
const StatusBadge = ({ stock, minStock }) => {
  const getStatus = () => {
    if (stock === 0) {
      return { text: 'Out of Stock', className: 'status-badge out-of-stock' };
    } else if (stock <= minStock) {
      return { text: 'Low Stock', className: 'status-badge low-stock' };
    } else {
      return { text: 'In Stock', className: 'status-badge in-stock' };
    }
  };

  const status = getStatus();

  return <span className={status.className}>{status.text}</span>;
};

export default StatusBadge;
