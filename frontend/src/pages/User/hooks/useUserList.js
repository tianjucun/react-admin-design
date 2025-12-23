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
      message.error('获取用户列表失败');
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

  // 更新搜索关键词
  const handleSearch = useCallback(() => {
    if (current !== DEFAULT_PAGINATION.current) {
      setCurrent(DEFAULT_PAGINATION.current);
      return;
    }
    fetchUserList();
  }, [fetchUserList, current]);

  // 刷新列表
  const refresh = useCallback(() => {
    fetchUserList();
  }, [fetchUserList]);

  const handleReset = useCallback(() => {
    searchForm.resetFields();
    if (current !== DEFAULT_PAGINATION.current) {
      setCurrent(DEFAULT_PAGINATION.current);
      return;
    }
    fetchUserList();
  }, [searchForm, current, fetchUserList]);

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
