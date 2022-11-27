import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { message as Message } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getTimer, getTasks } from '@/services/timer/service';
import { TimerType, TimerStatusType, TableListPagination, GetTasksResp, TaskType, TaskStatusType } from '@/services/timer/type';

const { Item } = ProDescriptions;

const timerEnableText = "已激活"
const timerUnableText = "未激活"

const TimerDetail: FC = () => {
    const [params] = useSearchParams();
    const actionRef = useRef<ActionType>();

    const [timer, setTimer] = useState<TimerType>({
        name: "",
        id: Number(params.getAll('id')[0]),
        status: 0,
        cron: "* * * * * * *",
        app:"",
    });

    const [tasks, setTasks] = useState<TaskType[]>([])

    const getValidTimerID = () => {
        const ids = params.getAll('id');
        if (ids.length == 0) {
            Message.error("缺少定时器 id 参数");
            return -1
        }

        const id = Number(ids[0]);
        if (id <= 0 || isNaN(id)) {
            Message.error("非法的定时器 id 参数");
            return -1
        }

        return id
    }

    useEffect(() => {
        const _timerID = getValidTimerID();
        if (_timerID <= 0) {
            return
        }

        const getTimerAndTasks = async ()=>{
            try {
                const {code,msg,data} = await getTimer(_timerID);
                if (code != 0) {
                    Message.error(msg);
                    return
                }
                setTimer(data);
            } catch (err) {
                console.error(err)
            }
    
            try {
                const {code,msg,data} = await getTasks(_timerID);
                if (code != 0) {
                    Message.error(msg);
                    return
                }
                setTasks(data);
            } catch (err) {
                console.error(err)
            }
        }
        getTimerAndTasks();
    }, []);

    const columns: ProColumns[] = [
        {
            title: '运行时间',
            dataIndex: 'runTimer',
            hideInSearch: true,
        },
        {
            title: '耗时',
            dataIndex: 'costTime',
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInSearch: true,
            render: (_: any, record: TaskType) => {
                if (record.status == TaskStatusType.failed) {
                    return "失败";
                }
                if (record.status == TaskStatusType.successed) {
                    return "成功";
                }
                if (record.status == TaskStatusType.running) {
                    return "执行中";
                }
                return "未执行";
            }
        },
        {
            title: '输出',
            dataIndex: 'output',
            hideInSearch: true,
        },

    ];

    return (
        <>
            <ProCard>
                <ProDescriptions column={3} bordered={true} title="定时器详情">
                    <Item label="定时器 ID">{timer.id}</Item>
                    <Item label="定时器名称">{timer.name}</Item>
                    <Item label="定时器状态">{timer.status == TimerStatusType.enabled ? timerEnableText : timerUnableText}</Item>
                    <Item label="cron 表达式">{timer.cron}</Item>
                    <Item label="http 方法">{timer.notifyHTTPParam?.method}</Item>
                    <Item label="http url">{timer.notifyHTTPParam?.url}</Item>
                    <Item label="http 请求头">{timer.notifyHTTPParam?.header}</Item>
                    <Item label="http 请求体">{timer.notifyHTTPParam?.body}</Item>
                </ProDescriptions>
            </ProCard>
            <br></br>
            <br></br>
            <ProTable<TaskType, TableListPagination>
                headerTitle="执行历史"
                columns={columns}
                dataSource={tasks}
                size="large"
                actionRef={actionRef}
                search={false}
            />
        </>
    );
};

export default TimerDetail;
