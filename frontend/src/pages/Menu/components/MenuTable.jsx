import { memo, useMemo } from 'react';
import { Popconfirm, Table, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { MenuTypeLabel } from '@/constance';

const MenuTable = memo(({ dataSource, loading, onEdit, onDelete }) => {
  const baseColumns = useMemo(() => [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type) => {
        return MenuTypeLabel[type] || type;
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >编辑</Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ], [onEdit, onDelete]);

  return (
    <Table
      dataSource={dataSource}
      columns={baseColumns}
      loading={loading}
      rowKey="id"
    />
  )
})

MenuTable.displayName = 'MenuTable';

export default MenuTable;