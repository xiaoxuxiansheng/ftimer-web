import { FC, useState } from 'react';
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
  const [notifyType, setNotifyType] = useState<number>(0);

  const handleChange = (_changedValues: any, allValues: any) => {
    if (allValues.notify_type) {
      setNotifyType(allValues.notify_type);
    }
  };

  return (
    <Modal title="创建定时器" visible={visible} footer={null} onCancel={onClose} width={700}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onSubmit}
        form={form}
        autoComplete="off"
        onValuesChange={handleChange}
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
          rules={[{ required: true, message: '请输入定时器 cron 表达式' }]}
        >
          <Input placeholder='* */15 * * * ? *' />
        </Item>
        <Item
          label="通知类型"
          name="notify_type"
          rules={[{ required: true, message: '请选择定时任务通知类型' }]}
        >
          <Radio.Group>
            <Radio value={1}>http</Radio>
          </Radio.Group>
        </Item>
        {
          notifyType == 1 && (
            <Item label="http 回调参数" name="notifyHTTPParam">
              <List name={'notifyHTTPParam'}>
                {() => (
                  <div>
                    <br></br>
                    <br></br>
                    <Item
                      name="url"
                      label="url"
                      tooltip="URL 路径"
                      rules={[{ required: true, message: '请输入 url 路径' }]}
                    >
                      <Input placeholder='www.baidu.com' />
                    </Item>
                    <Item
                      name="method"
                      label="method"
                      tooltip="http 方法"
                      rules={[{ required: true, message: '请输入请求方法' }]}
                    >
                      <Radio.Group>
                        <Radio value="GET">  GET </Radio>
                        <Radio value="DELETE"> DELETE </Radio>
                        <Radio value="POST"> POST </Radio>
                        <Radio value="PATCH"> PATCH </Radio>
                      </Radio.Group>
                    </Item>
                    <Item
                      name="header"
                      label="header"
                      tooltip="header 请求头"
                    >
                      <TextArea autoSize={{ minRows: 1 }} placeholder='{"content-type":"application/json"}' />
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
                      <TextArea autoSize={{ minRows: 1 }} placeholder='{"word":"hello world"}' />
                    </Item>
                  </div>
                )}
              </List>
            </Item>
          )
        }

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
