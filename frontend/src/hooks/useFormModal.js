import { Form } from 'antd';
import { useMemo, useEffect, useCallback } from 'react';

/**
 * 表单模态框通用 hook
 * 主要用来处理表单回显和重置
 * @param { Object } options - 配置
 * @param { boolean } options.open - 模态框是否打开
 * @param { boolean } options.form - 外部表单实例
 * @param { Object }  options.editingData - 编辑数据
 * @param { Function } options.adaptData - 适配数据函数
 * @param { defaultValues } options.defaultValues - 默认值
 *
 * @returns { Object } 返回表单实例和配置
 * @returns { FormInstance } form - 表单实例
 * @returns { Object } initialValues - 初始值
 * @returns { Function } resetForm - 重置表单的方法
 */
const useFormModal = ({
  open,
  form: externalForm,
  editingData,
  adaptData,
  defaultValues,
}) => {
  const [internalForm] = Form.useForm();
  const form = externalForm || internalForm;

  const initialValues = useMemo(() => {
    if (editingData) {
      return adaptData?.(editingData) ?? editingData;
    }
    return defaultValues;
  }, [editingData, defaultValues, adaptData]);

  useEffect(() => {
    if (open && form) {
      // 先重置表单(清除验证状态和字段值)
      form.resetFields();

      // 然后设置表单值
      if (initialValues && Object.keys(initialValues).length > 0) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [open, form, initialValues]);

  const resetForm = useCallback(() => {
    form?.resetFields();
  }, [form]);

  return {
    form,
    initialValues,
    resetForm,
  };
};

export default useFormModal;
