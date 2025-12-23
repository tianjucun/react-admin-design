import { useState, useEffect, useCallback } from 'react';
import { Form, message } from 'antd';
import { getUserList } from '@/api/user';
import { DEFAULT_PAGINATION } from '../constants';

/**
 * 用户列表业务逻辑 Hook
 * 负责用户列表的数据获取、分页、搜索等业务逻辑
 */
const useUserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(DEFAULT_PAGINATION.current);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.pageSize);

  const [searchForm] = Form.useForm();

  // 获取用户列表
  const fetchUserList = useCallback(async () => {
    setLoading(true);
    try {
      const searchValues = searchForm.getFieldsValue();
      const result = await getUserList({
        page: current,
        pageSize,
        ...searchValues,
      });
      setDataSource(result.list || []);
      setTotal(result.total || 0);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || '获取用户列表失败';
      message.error(errorMessage);
      console.error('获取用户列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, [current, pageSize, searchForm]);

  // 当分页或搜索条件变化时，重新获取数据
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  // 更新分页
  const handlePageChange = useCallback(
    (page, size) => {
      setCurrent(page);
      if (size !== pageSize) {
        setPageSize(size);
      }
    },
    [pageSize]
  );

  // 刷新列表（保持当前分页）
  const refresh = useCallback(
    (force = false) => {
      if (force && current !== DEFAULT_PAGINATION.current) {
        setCurrent(DEFAULT_PAGINATION.current);
        return;
      }
      fetchUserList();
    },
    [current, fetchUserList]
  );

  // 搜索：重置到第一页并刷新数据
  const handleSearch = useCallback(() => {
    refresh(true);
  }, [refresh]);

  // 重置搜索条件并刷新
  const handleReset = useCallback(() => {
    searchForm.resetFields();
    refresh(true);
  }, [searchForm, refresh]);

  return {
    searchForm,
    dataSource,
    loading,
    total,
    pagination: {
      current,
      pageSize,
    },
    handlePageChange,
    handleSearch,
    handleReset,
    refresh,
  };
};

export default useUserList;
