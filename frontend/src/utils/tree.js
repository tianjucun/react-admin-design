export const buildTreeData = (data, parentId = 0) => {
  return data
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      ...item,
      children: buildTreeData(data, item.id),
    }));
};
