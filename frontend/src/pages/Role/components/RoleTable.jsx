import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Space, Popconfirm } from "antd";
import { memo, useMemo } from "react";

const RoleTable = memo(({
  dataSource,
  loading,
  pagination,
  total,
  onPageChange,
  onEdit,
  onAssignPermissions,
  onDelete
}) => {

  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => onAssignPermissions(record)}
          >
            分配权限
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => onDelete(record.id)}
          >

            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ], [onEdit, onAssignPermissions, onDelete])


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

RoleTable.displayName = 'RoleTable';

export default RoleTable;
