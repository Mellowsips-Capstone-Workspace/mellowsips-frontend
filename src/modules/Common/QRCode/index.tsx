import { DownloadIcon } from '@radix-ui/react-icons';
import QRCodeHelper from 'helpers/qr';
import { isEmpty, isUndefined } from 'lodash';
import Button from 'modules/Common/Button';
import { nanoid } from 'nanoid';
import { FC, memo, useCallback, useEffect, useId, useState } from 'react';
import { Link } from 'react-router-dom';

type QRCodeProps = {
    data?: string
    showAction?: boolean
}

const QRCode: FC<QRCodeProps> = ({ data, showAction = true }) => {
    const id = useId()
    const [qr, setQr] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (isEmpty(data) || isUndefined(data)) {
            setQr(undefined)
            return
        }

        QRCodeHelper.toDataURL(
            {
                data,
                options: {
                    margin: 0.5,
                    width: 200
                },
                onSuccess: setQr
            }
        )

    }, [data, id])


    const handlePrint = useCallback(() => {
        if (isUndefined(qr)) {
            return
        }
        const { origin } = location
        const id = nanoid()
        const url = origin.concat("/print/qr?id=", id)
        localStorage.setItem(id, qr)

        window.open(
            url,
            'popup',
            'width=+width+'
        )
    }, [qr])


    if (isUndefined(qr)) {
        return (
            <div className='w-full aspect-square grid place-content-center bg-white rounded'>
                <p className='italic text-xs'>QR chưa sẵn sàng</p>
            </div>
        )
    }

    return (

        <div className='space-y-5'>
            <img
                src={qr}
                alt='QR'
                id={id}
                className='w-full aspect-square rounded overflow-hidden'
            />
            {
                showAction ? (
                    <div className='grid grid-cols-2 gap-5'>
                        <Button
                            variant="primary"
                            type="button"
                            className="w-full space-x-2"
                            onClick={handlePrint}
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                            </svg>

                            <span>
                                In
                            </span>
                        </Button>
                        <Button
                            variant="indigo"
                            type="button"
                            className="w-full space-x-2"
                            asChild
                        >
                            <Link
                                to={qr}
                                download="qr.png"
                            >
                                <DownloadIcon />
                                <span>
                                    Tải xuống
                                </span>
                            </Link>
                        </Button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default memo(QRCode)