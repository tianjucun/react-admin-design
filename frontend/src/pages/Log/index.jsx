import { useState, useEffect } from 'react';
import { Table, Input, DatePicker, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getLogList } from '@/api/log';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const Log = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 获取日志列表
  const fetchLogList = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        pageSize,
        keyword
      };

      if (dateRange && dateRange.length === 2) {
        params.startDate = dateRange[0].format('YYYY-MM-DD');
        params.endDate = dateRange[1].format('YYYY-MM-DD');
      }

      const result = await getLogList(params);
      setDataSource(result.list);
      setTotal(result.total);
    } catch (error) {
      console.error('获取日志列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogList();
  }, [page, pageSize, keyword, dateRange]);

  const handleSearch = () => {
    setPage(1);
    fetchLogList();
  };

  const handleReset = () => {
    setKeyword('');
    setDateRange(null);
    setPage(1);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: '用户',
      dataIndex: ['user', 'username'],
      key: 'user',
      render: (text, record) => record.user ? `${record.user.nickname || record.user.username}` : '-'
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action'
    },
    {
      title: '操作资源',
      dataIndex: 'resource',
      key: 'resource'
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      key: 'method',
      width: 100
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      key: 'path',
      ellipsis: true
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 150
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="搜索操作类型、资源"
            style={{ width: 300 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="YYYY-MM-DD"
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }
        }}
      />
    </div>
  );
};

export default Log;

