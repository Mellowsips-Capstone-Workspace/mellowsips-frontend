import { ClockIcon, StopwatchIcon } from "@radix-ui/react-icons";

import { FC, memo } from "react";

type TimeProps = {
    time?: string
    start?: true
}

const Time: FC<TimeProps> = ({ start, time }) => {
    return (
        <div className='flex items-center space-x-1 hover:bg-slate-200 cursor-pointer border p-2 rounded bg-white'>
            <span className='text-gray-500'>
                {start ? <ClockIcon height={20} width={20} /> : <StopwatchIcon height={20} width={20} />}
            </span>
            {
                time ? (
                    <p className="font-medium">{time}</p>
                ) : (
                    <p className="font-medium text-gray-500">-- :--</p>
                )
            }
        </div>
    )
}

export default memo(Time)