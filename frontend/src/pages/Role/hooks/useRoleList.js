import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { getRoleList } from '@/api/role';

export const useRoleList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchRoleList = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getRoleList({
        page: current,
        pageSize,
      });
      setDataSource(result.list || []);
      setTotal(result.total || 0);
    } catch (err) {
      message.error('获取角色列表失败');
      console.error('获取角色列表失败:', err);
    } finally {
      setLoading(false);
    }
  }, [current, pageSize]);

  useEffect(() => {
    fetchRoleList();
  }, [fetchRoleList]);

  const handlePageChange = useCallback(
    (page, size) => {
      setCurrent(page);
      if (size !== pageSize) {
        setPageSize(size);
      }
    },
    [pageSize]
  );

  const refresh = useCallback(() => {
    fetchRoleList();
  }, [fetchRoleList]);

  return {
    dataSource,
    loading,
    pagination: {
      current,
      pageSize,
      total,
    },
    handlePageChange,
    refresh,
  };
};
