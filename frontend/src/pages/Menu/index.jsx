import { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as menuApi from '../../api/menu';

const Menu = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [parentMenus, setParentMenus] = useState([]);
  const [form] = Form.useForm();

  // 获取菜单列表
  const fetchMenuList = async () => {
    setLoading(true);
    try {
      const menus = await menuApi.getMenuTree();
      setDataSource(menus);
      // 获取所有菜单用于父菜单选择
      const allMenus = await menuApi.getAllMenus();
      setParentMenus(allMenus);
    } catch (error) {
      message.error('获取菜单列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  // 展开表格数据
  const expandedRowRender = (record) => {
    if (!record.children || record.children.length === 0) {
      return null;
    }

    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (type) => {
          const typeMap = { 1: '目录', 2: '菜单', 3: '按钮' };
          return typeMap[type] || type;
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="link" danger icon={<DeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.children}
        rowKey="id"
        pagination={false}
        size="small"
      />
    );
  };

  // 创建/更新菜单
  const handleSubmit = async (values) => {
    try {
      if (editingMenu) {
        await menuApi.updateMenu(editingMenu.id, values);
        message.success('更新成功');
      } else {
        await menuApi.createMenu(values);
        message.success('创建成功');
      }
      setModalVisible(false);
      setEditingMenu(null);
      form.resetFields();
      fetchMenuList();
    } catch (error) {
      message.error(error.message || '操作失败');
    }
  };

  // 删除菜单
  const handleDelete = async (id) => {
    try {
      await menuApi.deleteMenu(id);
      message.success('删除成功');
      fetchMenuList();
    } catch (error) {
      message.error(error.message || '删除失败');
    }
  };

  // 打开编辑弹窗
  const handleEdit = (record) => {
    setEditingMenu(record);
    form.setFieldsValue({
      name: record.name,
      path: record.path,
      icon: record.icon,
      type: record.type,
      parentId: record.parentId,
      sort: record.sort,
      permission: record.permission
    });
    setModalVisible(true);
  };

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeMap = { 1: '目录', 2: '菜单', 3: '按钮' };
        return typeMap[type] || type;
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingMenu(null);
            form.resetFields();
            form.setFieldsValue({ type: 1, parentId: 0, sort: 0 });
            setModalVisible(true);
          }}
        >
          新增菜单
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        expandable={{
          expandedRowRender
        }}
      />

      <Modal
        title={editingMenu ? '编辑菜单' : '新增菜单'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingMenu(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item
            name="path"
            label="路由路径"
          >
            <Input placeholder="请输入路由路径" />
          </Form.Item>

          <Form.Item
            name="icon"
            label="图标"
          >
            <Input placeholder="请输入图标名称，如：UserOutlined" />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value={1}>目录</Select.Option>
              <Select.Option value={2}>菜单</Select.Option>
              <Select.Option value={3}>按钮</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="parentId"
            label="父菜单"
            initialValue={0}
          >
            <Select placeholder="请选择父菜单">
              <Select.Option value={0}>根目录</Select.Option>
              {parentMenus
                .filter(menu => menu.type === 1 && menu.id !== editingMenu?.id)
                .map(menu => (
                  <Select.Option key={menu.id} value={menu.id}>
                    {menu.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="sort"
            label="排序"
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="permission"
            label="权限标识"
          >
            <Input placeholder="请输入权限标识，如：system:user" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Menu;

