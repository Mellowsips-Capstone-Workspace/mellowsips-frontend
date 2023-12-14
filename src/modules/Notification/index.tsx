import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons"
import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { format, parseISO } from "date-fns"
import { isEmpty } from "lodash"
import Loading from "modules/Common/Loading"
import showToast from "modules/Common/Toast"
import NotificationApplicationApprove from "modules/Notification/components/NotificationApplicationApprove"
import { FC, MouseEvent, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import NotificationService from "services/NotificationService"
import StompClientService, { StompMessage } from "services/StompClientService"

const Notification: FC = () => {
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState<StompMessage[]>([])

    const fetchNotification = useCallback(async () => {
        setLoading(true)
        const { status, body } = await NotificationService.getAll()
        if (status !== 200 || isEmpty(body)) {
            setNotifications([])
        } else {
            setNotifications(body.data.results)
        }
        setLoading(false)
    }, [])

    const markAllAsRead = useCallback(async () => {
        const { status, body } = await NotificationService.markAllAsRead()

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            return
        }
        fetchNotification()
    }, [fetchNotification])

    const markAsRead = useCallback(async (event: MouseEvent<HTMLSpanElement>) => {
        const id = event.currentTarget.dataset.id!
        const { status, body } = await NotificationService.markAsRead(id)

        if (status !== 200 || isEmpty(body) || body.statusCode !== 200) {
            return
        }

        setNotifications(
            notifications => notifications.map(
                notification => {
                    if (notification.id === id) {
                        return {
                            ...notification,
                            isSeen: true
                        }
                    }
                    return notification
                }
            )
        )
    }, [])

    useEffect(() => {
        fetchNotification()
        StompClientService.connect()

        const subscribeNotification = (message: StompMessage) => {
            if (isEmpty(message)) {
                return
            }

            if (message.key === "HAVING_NEW_ORDER") {
                showToast(
                    {
                        type: "info",
                        title: message.subject,
                        message: format(parseISO(message.createdAt), 'HH:mm:ss dd-MM-yyyy ')
                    }
                )
                return
            }

            if (message.key === "ORDER_CANCELED") {
                showToast(
                    {
                        type: "warning",
                        title: message.subject,
                        message: format(parseISO(message.createdAt), 'HH:mm:ss dd-MM-yyyy ')
                    }
                )
                return
            }
        }

        StompClientService.subscribe(
            StompClientService.PRIVATE_CHANNEL,
            fetchNotification
        )
        StompClientService.subscribe(
            StompClientService.PRIVATE_CHANNEL,
            subscribeNotification
        )

        return () => {
            StompClientService.unsubscribe(
                StompClientService.PRIVATE_CHANNEL,
                fetchNotification
            )

            StompClientService.unsubscribe(
                StompClientService.PRIVATE_CHANNEL,
                subscribeNotification
            )
        }

    }, [fetchNotification])

    const unread = notifications.filter(notification => !notification.isSeen).length

    return (
        <Root>
            <Trigger>
                <div
                    className="h-fit w-fit relative"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        < path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {
                        unread ? (
                            <span className="text-xs rounded-full text-white absolute px-1 bg-red-500 top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                {unread}
                            </span>
                        ) : null
                    }
                </div>
            </Trigger>

            <Portal>
                <Content
                    align="end"
                    className="w-80 py-2 rounded bg-white border mt-4 shadow"
                >
                    <div className="px-2 pb-2 flex items-center justify-between border-b">
                        <h2 className="font-medium">Thông báo</h2>
                        <Root>
                            <Trigger>
                                <DotsHorizontalIcon />
                            </Trigger>

                            <Portal>
                                <Content
                                    align="end"
                                    className="mt-2 mr-2"
                                >
                                    <ul className="w-max py-2 rounded bg-white border shadow">
                                        <li
                                            className="min-w-full flex hover:bg-slate-200 cursor-pointer px-2 py-1 items-center space-x-2"
                                            onClick={loading ? undefined : fetchNotification}
                                        >
                                            <ReloadIcon />
                                            <p>Làm mới thông báo</p>
                                        </li>
                                        <li
                                            className="min-w-full flex hover:bg-slate-200 cursor-pointer px-2 py-1 items-center space-x-2"
                                            onClick={markAllAsRead}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            <p>Đánh dấu tất cả là đã đọc</p>
                                        </li>

                                    </ul>

                                </Content>
                            </Portal>
                        </Root>

                    </div>
                    <div className="p-2 max-h-40 overflow-y-auto space-y-2">
                        {
                            loading ? (
                                <div className="w-fit py-10 mx-auto">
                                    <Loading.Circle className="text-main-primary" />
                                </div>
                            ) : notifications.length ? notifications.map(
                                (notification) => (
                                    <div className="flex" key={notification.id}>
                                        <div className="grow">
                                            {
                                                notification.key.includes("ORDER") ? (
                                                    <Link
                                                        className="truncate text-sm font-medium hover:text-main-primary transition-colors"
                                                        to="/orders"
                                                    >
                                                        {notification.subject}
                                                    </Link>
                                                ) : notification.key.includes("APPLICATION") ? (
                                                    <Link
                                                        to="/applications"
                                                        className="truncate text-sm font-medium hover:text-main-primary transition-colors"
                                                    >
                                                        {notification.subject}
                                                    </Link>
                                                ) : (
                                                    <p className="text-sm font-medium truncate">{notification.subject}</p>
                                                )
                                            }
                                            <p className="text-gray-500 text-sm italic">{format(parseISO(notification.createdAt), 'HH:mm:ss dd-MM-yyyy ')}</p>
                                        </div>
                                        <div className="flex-none">
                                            <div className="ml-auto h-5 px-0.5 flex items-center">
                                                {
                                                    notification.isSeen ? (
                                                        <div className="h-2.5 w-2.5 bg-transparent rounded-full"></div>
                                                    ) : (
                                                        <div className="h-2.5 w-2.5 bg-indigo-500 rounded-full"></div>
                                                    )
                                                }
                                            </div>
                                            {
                                                notification.isSeen ? null : (
                                                    <span
                                                        data-id={notification.id}
                                                        onClick={markAsRead}
                                                        className="cursor-pointer hover:text-main-primary"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            ) : (
                                <p className="text-center">Hiện tại chưa có thông báo</p>
                            )
                        }
                    </div>
                </Content>
            </Portal>
            <NotificationApplicationApprove />
        </Root>
    )
}

export default Notification