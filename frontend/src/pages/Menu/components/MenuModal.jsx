import { memo, useCallback } from 'react';
import { Form, Input, Select, Modal, InputNumber } from 'antd';
import { MenuType, MenuTypeLabel } from '@/constance';
import useFormModal from '@/hooks/useFormModal';

const RootMenuId = 0;
const DefaultSort = 0;

const MenuModal = memo(({ form: externalForm, editingMenu, parentMenus = [], onCancel, onSubmit, open, loading = false }) => {
  const { form } = useFormModal({
    open,
    externalForm,
    editingData: editingMenu,
    defaultValues: {
      type: MenuType.DIRECTORY,
      parentId: RootMenuId,
      rort: DefaultSort,
    }
  })

  const renderSelectTypeOptions = useCallback(() => {
    return Object.values(MenuType).map(type => (
      <Select.Option key={type} value={type}>{MenuTypeLabel[type]}</Select.Option>
    ))
  }, []);

  const renderSelectParentMenuOptions = useCallback(() => {
    return (
      <>
        <Select.Option value={RootMenuId}>根目录</Select.Option>
        {parentMenus
          .filter(menu => menu.id !== editingMenu?.id)
          .map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
      </>
    );
  }, [editingMenu, parentMenus]);

  return (
    <Modal
      title={editingMenu ? '编辑菜单' : '新增菜单'}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
      width={600}
      destroyOnHidden
      style={{ top: 40 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
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
          <Input placeholder="请输入图标名称, 如 UserOutlined" />
        </Form.Item>
        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Select placeholder="请选择类型">
            {renderSelectTypeOptions()}
          </Select>
        </Form.Item>
        <Form.Item
          name="parentId"
          label="父菜单"
        >
          <Select placeholder="请选择父菜单">
            {renderSelectParentMenuOptions()}
          </Select>
        </Form.Item>
        <Form.Item
          name="sort"
          label="排序"
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="permission"
          label="权限标识"
        >
          <Input placeholder='请输入权限标识, 如: system:user' />
        </Form.Item>
      </Form>
    </Modal>
  );
})

MenuModal.displayName = 'MenuModal';

export default MenuModal;