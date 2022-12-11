import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm, message as Message, Input, Switch, Space, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  PlusOutlined,
} from '@ant-design/icons';

import TimerCreator from '@/components/timercreator';
import {
  TableListPagination,
  TimerType,
  TimerStatusType,
} from '@/services/timer/type';
import {
  getAppTimers,
  enableTimer,
  unableTimer,
  deleteTimer,
  createTimer,
  getTimersByName,
} from '@/services/timer/service';

import styles from './index.module.scss';

const { Search } = Input;

const EnableText = "确认激活定时器？"
const UnableText = "确认去激活定时器？"

const TimerList: FC = () => {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [timers, setTimers] = useState<TimerType[]>([]);
  const navigator = useNavigate()

  const onSearch = (name: string) => {
    if (name == "") {
      actionRef.current?.reload();
      return
    }

    const searchTimers = async()=>{
      const { code,msg, data, total } = await getTimersByName({
        app: sessionStorage.getItem("app") as string,
        name: name,
      });
      if (code != 0){
         Message.error(msg);
      }
      setTimers(data);
    }

    searchTimers();
  };

  const onCreate = () => {
    setIsModalVisible(true);
  };

  const onSubmit = (timer: TimerType) => {
    timer.app = sessionStorage.getItem("app") as string;
    timer.creator = timer.app;
    setIsModalVisible(false);
    const submit = async()=>{
      const{code,msg} = await createTimer(timer);
      if (code == 0){
        Message.success("创建成功");
      }else{
        Message.error(msg);
      }
      actionRef.current?.reload();
    }
    submit();
  }

  const onStatusChange = (timer: TimerType) => () => {
    const app = sessionStorage.getItem("app") as string
    const changeStatus = async ()=>{
      if (timer.status == TimerStatusType.enabled){
        const{code,msg} = await unableTimer(app,timer.id);
        if (code != 0){
          Message.error(msg);
        }else{
          Message.success("去激活成功!");
        }
      } else{
        const{code,msg} = await enableTimer(app,timer.id);
        if (code != 0){
          Message.error(msg);
        }else{
          Message.success("激活成功!");
        }
      }
      actionRef.current?.reload();
    }

    changeStatus();
  }

  const onReadTimer = (id: number) => () => {
    navigator("/timer/detail?id="+id);
  }

  const onDeleteTimer = (id: number) => async () => {
    const app = sessionStorage.getItem("app") as string
    const {code,msg} = await deleteTimer(app,id);
    if (code == 0){
      Message.success("操作成功!");
    }else{
      Message.error(msg);
    }

    actionRef.current?.reload();
  }


  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: 'Cron 表达式',
      dataIndex: 'cron',
      hideInSearch: true,
    },
    {
      title: '定时器状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_: any, record: TimerType) => {
        const enabled = record.status == TimerStatusType.enabled;
        return (
          <Popconfirm placement="leftTop" title={enabled ? UnableText : EnableText} onConfirm={onStatusChange(record)} okText="是" cancelText="否">
            <Switch checkedChildren="已激活" unCheckedChildren="未激活" checked={enabled} />
          </Popconfirm>
        )
      }
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_: any, record: TimerType) => {
        return (
          <Space size="middle">
            <a onClick={onReadTimer(record.id)}>详情</a>
            <Popconfirm placement="leftTop" title='确认删除定时器？' onConfirm={() => onDeleteTimer(record.id)()} okText="是" cancelText="否">
              <a>删除</a>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];


  return (
    <PageContainer title="XTimer 定时器" className={styles['timers']}>
      <br></br>
      <br></br>
      <div>
        <Search
          placeholder="请输入定时器名称"
          allowClear
          enterButton="查询"
          size="middle"
          onSearch={onSearch}
          style={{ width: '300px', marginLeft: '30px' }}
        />

        <Button type="primary" onClick={onCreate} style={{ marginLeft: '720px' }}>
          <PlusOutlined /> 创建
        </Button>

      </div>
      <div>
        <>
          <ProTable<TimerType, TableListPagination>
            columns={columns}
            dataSource={timers}
            size="large"
            actionRef={actionRef}
            search={false}
            request={async (params: any = {}) => {
              const { code,msg, data, total } = await getAppTimers({
                pageIndex: params.current,
                pageSize: params.pageSize,
                app: sessionStorage.getItem("app") as string,
                name: params.name,
              });
              if (code != 0){
                 message.error(msg);
              }
              setTimers(data);
              return {
                data,
                total,
                page: params.current,
                success: true,
              }
            }}
          />
          <TimerCreator
            visible={isModalVisible}
            onSubmit={onSubmit}
            onClose={() => setIsModalVisible(false)}
          />
        </>
      </div>
    </PageContainer>
  );
};

export default TimerList;
