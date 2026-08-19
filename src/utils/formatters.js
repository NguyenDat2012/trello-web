/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/*
Chỉ sử dụng card này để xử lý bug logic  của thư viện Dnd-kit khi column rỗng,
Phía FE sẽ tự tạo 1 card đặc biệt không liên quan đến BE
Card này sẽ được ẩn ở giao diện UI người dùng
*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}