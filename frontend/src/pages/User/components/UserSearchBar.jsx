import { Form, Input, Select, Button, Space } from 'antd';
import { memo, useCallback } from 'react';
import { WITH_ALL_USER_STATUS, USER_STATUS_TEXT } from '../constants';

/**
 * 用户搜索栏组件
 * 负责用户搜索功能的 UI 展示
 */
const UserSearchBar = memo(({ onSearch, onReset, form, roles = [], rolesLoading = false }) => {
  const renderRoleOptions = useCallback(() => {
    return [{ id: -1, name: '全部' }, ...roles].map(({ id, name }) => (
      <Select.Option
        key={id}
        value={id}
      >{name}</Select.Option>
    ));
  }, [roles]);

  const renderUserStatusOptions = useCallback(() => {
    return Object.values(WITH_ALL_USER_STATUS).map(status => (
      <Select.Option key={status} value={status}>
        {USER_STATUS_TEXT[status]}
      </Select.Option>
    ));
  }, []);

  return (
    <Form
      form={form}
      layout="inline"
      // 输入框回车时会触发 onFinish
      onFinish={onSearch}
    >
      <Form.Item
        name="keyword"
      >
        <Input.Search
          placeholder="搜索用户名、昵称、邮箱"
          style={{ width: 300 }}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="status"
      >
        <Select
          placeholder="选择状态"
          style={{ width: 200 }}
          allowClear
        >
          {renderUserStatusOptions()}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
      >
        <Select
          placeholder="选择角色"
          loading={rolesLoading}
          style={{ width: 200 }}
          allowClear
        >
          {renderRoleOptions()}
        </Select>
      </Form.Item>
      <Form.Item
      >
        <Space>
          <Button
            type="primary"
            htmlType="submit"
          >搜索</Button>
          <Button
            type="default"
            onClick={onReset}
          >重置</Button>
        </Space>
      </Form.Item>
    </Form>
  )
});

UserSearchBar.displayName = 'UserSearchBar';

export default UserSearchBar;

