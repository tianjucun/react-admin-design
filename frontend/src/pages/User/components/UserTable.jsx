import { memo, useMemo } from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { formatUserStatus, toggleUserStatus } from '../utils/formatters';
import { USER_STATUS, TABLE_COLUMNS_CONFIG } from '../constants';

/**
 * 用户表格组件
 * 负责用户列表的展示和操作
 */
const UserTable = memo(({
  dataSource,
  loading,
  pagination,
  total,
  onPageChange,
  onEdit,
  onView,
  onDelete,
  onStatusChange
}) => {
  // 使用 useMemo 优化 columns 定义，避免每次渲染都重新创建
  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: TABLE_COLUMNS_CONFIG.id.width
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '角色',
      dataIndex: ['role', 'name'],
      key: 'role',
      render: (text) => text || '-'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const { text, color } = formatUserStatus(status);
        return <span style={{ color }}>{text}</span>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      fixed: TABLE_COLUMNS_CONFIG.action.fixed,
      render: (_, record) => {
        const { text, color } = formatUserStatus(record.status);
        const newStatus = toggleUserStatus(record.status);

        return (
          <Space>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              aria-label="查看用户详情"
            >
              查看
            </Button>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              aria-label="编辑用户"
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => onStatusChange(record.id, newStatus)}
              aria-label={`${record.status === USER_STATUS.ENABLED ? '禁用' : '启用'}用户`}
            >
              {record.status === USER_STATUS.ENABLED ? '禁用' : '启用'}
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => onDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                aria-label="删除用户"
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ], [onEdit, onView, onDelete, onStatusChange]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onPageChange
      }}
      scroll={{ x: 'max-content' }}
      locale={{
        emptyText: '暂无数据'
      }}
    />
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;

