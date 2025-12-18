import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import * as userApi from '../../../api/user';
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
  const [keyword, setKeyword] = useState('');

  // 获取用户列表
  const fetchUserList = useCallback(async () => {
    setLoading(true);
    try {
      const result = await userApi.getUserList({
        page: current,
        pageSize,
        keyword
      });
      setDataSource(result.list || []);
      setTotal(result.total || 0);
    } catch (error) {
      message.error('获取用户列表失败');
      console.error('获取用户列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, [current, pageSize, keyword]);

  // 当分页或搜索条件变化时，重新获取数据
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  // 更新分页
  const handlePageChange = useCallback((page, size) => {
    setCurrent(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
  }, [pageSize]);

  // 更新搜索关键词
  const handleSearch = useCallback((value) => {
    setKeyword(value);
    setCurrent(1); // 搜索时重置到第一页
  }, []);

  // 刷新列表
  const refresh = useCallback(() => {
    fetchUserList();
  }, [fetchUserList]);

  return {
    dataSource,
    loading,
    total,
    pagination: {
      current,
      pageSize
    },
    keyword,
    handlePageChange,
    handleSearch,
    refresh
  };
};

export default useUserList;

