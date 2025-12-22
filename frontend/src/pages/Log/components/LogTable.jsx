import { Table } from 'antd';
import { memo } from 'react';
import dayjs from 'dayjs';

const LogTable = memo(({ dataSource, pagination, total, loading = false, onChange }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户',
      dataIndex: ['user', 'username'],
      key: 'user',
      render: (text, record) => record.user ? `${record.user.nickname || text}` : '-'
    },
    {
      title: '操作资源',
      dataIndex: 'resource',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
    },
    {
      title: '请求路径',
      dataIndex: 'path',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      render: (text) => text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
      }}
    />
  );
});

LogTable.displayName = 'LogTable';

export default LogTable;