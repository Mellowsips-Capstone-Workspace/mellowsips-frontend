import ROLE from 'enums/role'
import Badge from 'modules/Common/Badge'
import { FC } from 'react'

const RoleBadge: FC<{ role: string }> = ({ role }) => {

    return (
        <>
            {
                role === ROLE.OWNER ? (
                    <Badge className='text-xs px-0.5' intent="secondaryBold">Chủ của hàng</Badge>
                ) : null
            }
            {
                role === ROLE.STORE_MANAGER ? (
                    <Badge className='text-xs px-0.5' intent="redBold">Quản lý của hàng</Badge>
                ) : null
            }
            {
                role === ROLE.STAFF ? (
                    <Badge className='text-xs px-0.5' intent="greenBold">Nhân viên</Badge>
                ) : null
            }
        </>
    )
}

export default RoleBadge