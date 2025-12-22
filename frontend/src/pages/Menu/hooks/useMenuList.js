import { useState, useCallback, useEffect } from 'react';
import { getMenuTree, getAllMenus } from '@/api/menu';
import { message } from 'antd';
import { filterDirectoryMenu } from '@/utils/menu';

const useMenuList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentMenus, setParentMenus] = useState([]);

  const fetchMenuList = useCallback(async () => {
    setLoading(true);
    try {
      const menus = await getMenuTree();
      setDataSource(menus);
      const allMenus = await getAllMenus();
      // 目录菜单
      const directoryMenus = filterDirectoryMenu(allMenus);
      setParentMenus(directoryMenus);
    } catch (err) {
      message.error(err.message || '获取菜单列表失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  const refresh = useCallback(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  return {
    dataSource,
    loading,
    parentMenus,
    refresh,
  };
};

export default useMenuList;
