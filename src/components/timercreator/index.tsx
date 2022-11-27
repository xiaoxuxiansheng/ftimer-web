import { FC } from 'react';
import { Modal, Form, Input, Button, Radio } from 'antd';
import { TimerType } from '@/services/timer/type';

const { Item, List } = Form;
const { TextArea } = Input;

interface TimerCreatorProps {
  visible: boolean;
  onSubmit: (values: TimerType) => void;
  onClose: () => void;
}

const TimerCreator: FC<TimerCreatorProps> = ({
  visible,
  onSubmit,
  onClose,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal title="创建定时器" visible={visible} footer={null} onCancel={onClose}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSubmit}
        form={form}
        autoComplete="off"
      >
        <Item
          label="定时器名称"
          name="name"
          rules={[{ required: true, message: '请输入定时器名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="cron 配置"
          name="cron"
          rules={[{ required: true, message: '请输入定时器 cron 表达式' }]}>
          <Input />
        </Item>
        <Item label="http 参数" name="notifyHTTPParam">
          <List name={'notifyHTTPParam'}>
            {() => (
              <div>
                <Item
                  name="url"
                  label="url"
                  tooltip="URL 路径"
                  rules={[{ required: true, message: '请输入 url 路径' }]}
                >
                  <Input />
                </Item>
                <Item
                  name="method"
                  label="method"
                  tooltip="GET POST 方法"
                  rules={[{ required: true, message: '请输入请求方法' }]}
                >
                  <Radio.Group>
                    <Radio value="GET"> GET </Radio>
                    <Radio value="POST"> POST </Radio>
                  </Radio.Group>
                </Item>
                <Item
                  name="header"
                  label="header"
                  tooltip="header 请求头"
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Item>
                <Item
                  name="body"
                  label="body"
                  tooltip="参数体，请输入 json 字符串"
                  rules={[
                    {
                      validator(_, value) {
                        try {
                          if (!value) {
                            return Promise.resolve();
                          }
                          JSON.parse(value);
                          return Promise.resolve();
                        } catch (err) {
                          return Promise.reject(new Error('请填入 json 字符串!'));
                        }
                      },
                    },
                  ]}
                >
                  <TextArea autoSize={{ minRows: 1 }} />
                </Item>
              </div>
            )}
          </List>
        </Item>
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default TimerCreator;
