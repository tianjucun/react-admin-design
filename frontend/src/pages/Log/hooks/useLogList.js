import { useState, useCallback, useEffect } from 'react';
import { getLogList } from '@/api/log';
import { Form, message } from 'antd';

const useLogList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchForm] = Form.useForm();

  const fetchLogList = useCallback(async () => {
    if (!searchForm) return;
    setLoading(true);
    try {
      const { keyword, dateRange } = searchForm.getFieldsValue();
      const params = {
        page,
        pageSize,
        keyword,
      };
      if (dateRange?.length === 2) {
        params.startDate = dateRange[0].format('YYYY-MM-DD');
        params.endDate = dateRange[1].format('YYYY-MM-DD');
      }
      const result = await getLogList(params);
      setDataSource(result.list || []);
      setTotal(result.total);
    } catch (err) {
      message.error(err.message || '获取日志列表失败');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchForm]);

  const refresh = useCallback(() => {
    if (page !== 1) {
      setPage(page);
      return;
    }
    fetchLogList();
  }, [fetchLogList, page]);

  useEffect(() => {
    fetchLogList();
  }, [page, pageSize, fetchLogList]);

  const handlePageChange = useCallback((page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  const handleReset = useCallback(() => {
    searchForm.resetFields();
    refresh();
  }, [searchForm, refresh]);

  return {
    dataSource,
    searchForm,
    loading,
    pagination: {
      current: page,
      pageSize,
      total,
      onChange: handlePageChange,
    },
    refresh,
    handleReset,
    handleSearch: refresh,
  };
};

export default useLogList;
