import { memo } from 'react';
import { Form, DatePicker, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const LogSearchBar = memo(({ onSearch, onReset, form }) => {
  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onSearch}
      preserve={false}
      autoComplete="off"

    >
      <Form.Item
        name="keyword"
      >
        <Input
          placeholder="搜索操作类型、资源"
          style={{ width: 300 }}
          onPressEnter={onSearch}
          allowClear
        />
      </Form.Item>
      <Form.Item
        name="dateRange"
      >
        <RangePicker
          format="YYYY-MM-DD"
        ></RangePicker>
      </Form.Item>
      <Space>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => form.submit()}
        >搜索</Button>
        <Button
          onClick={onReset}
        >重置</Button>
      </Space>
    </Form>
  );
});

LogSearchBar.displayName = 'LogSearchBar';

export default LogSearchBar;