import { APPLICATION_STATUS, APPLICATION_TYPE } from 'enums/application';
import { isEmpty } from 'lodash';
import Loading from 'modules/Common/Loading';
import NoResult from 'modules/Common/NoResult';
import WidgetCard from 'modules/Common/WidgetCard';
import { FC, useEffect, useState } from 'react';
import AdminApplicationService from 'services/AdminApplicationService';

type ApplicationSummaryProps = {
    className?: string
}

const ApplicationSummary: FC<ApplicationSummaryProps> = ({ className }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<{ approved: number, pending: number }>()

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const data = {
                    approved: 0,
                    pending: 0
                }
                const [partnerRequest, storeRequest] = await Promise.all(
                    [
                        AdminApplicationService.search({ pagination: { page: 1, offset: 1000 } }, APPLICATION_TYPE.ADD_STORE),
                        AdminApplicationService.search({ pagination: { page: 1, offset: 1000 } }, APPLICATION_TYPE.CREATE_ORGANIZATION)
                    ]
                )

                if (partnerRequest.status === 200 && !isEmpty(partnerRequest.body) && partnerRequest.body.statusCode === 200) {
                    const { results } = partnerRequest.body.data
                    data.approved = results.filter(({ status }) => APPLICATION_STATUS.APPROVED === status).length
                    data.pending = results.filter(({ status }) => APPLICATION_STATUS.WAITING === status || APPLICATION_STATUS.PROCESSING === status).length
                }

                if (storeRequest.status === 200 && !isEmpty(storeRequest.body) && storeRequest.body.statusCode === 200) {
                    const { results } = storeRequest.body.data
                    data.approved = data.approved + results.filter(({ status }) => APPLICATION_STATUS.APPROVED === status).length
                    data.pending = data.pending + results.filter(({ status }) => APPLICATION_STATUS.WAITING === status || APPLICATION_STATUS.PROCESSING === status).length
                }

                setData(data)
                setLoading(false)
            }
        )()
    }, [])

    return (

        <WidgetCard
            title={
                (
                    <h2 className="font-medium text-main-primary text-lg">Trạng thái đơn</h2>
                )
            }
            className={className}
        >
            {
                loading ? (
                    <div className="h-64 mx-auto w-fit flex justify-center items-center space-x-1 p-2 text-xs">
                        <Loading.Circle className="text-main-primary" size={14} />
                        <span className="text-gray-400">Đang tải dữ liệu</span>
                    </div>
                ) : data ? (
                    <div className='py-5 space-y-5'>
                        <div className="grid grid-cols-2 gap-5">
                            <div className='p-5 bg-white border rounded shadow'>
                                <div className='flex space-x-5'>
                                    <div className='h-14 w-14'>
                                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="10" cy="10" r="10" fill="#D7E3FE" fillOpacity="0.7"></circle>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.3075 4.79743C11.3807 4.83818 11.4381 4.90227 11.4707 4.97948C11.5032 5.05669 11.5089 5.14258 11.487 5.22343L10.491 8.87493H14.125C14.1981 8.87493 14.2695 8.89629 14.3306 8.93638C14.3918 8.97646 14.4398 9.03353 14.4689 9.10057C14.498 9.1676 14.5069 9.24168 14.4945 9.31369C14.4821 9.38571 14.4489 9.45253 14.399 9.50593L9.14898 15.1309C9.09179 15.1923 9.01567 15.2328 8.93279 15.2458C8.84991 15.2588 8.76505 15.2437 8.69178 15.2028C8.61852 15.1619 8.56109 15.0976 8.52867 15.0202C8.49626 14.9428 8.49073 14.8568 8.51298 14.7759L9.50898 11.1249H5.87498C5.8019 11.1249 5.73041 11.1036 5.6693 11.0635C5.6082 11.0234 5.56014 10.9663 5.53103 10.8993C5.50192 10.8323 5.49303 10.7582 5.50546 10.6862C5.51789 10.6141 5.55109 10.5473 5.60098 10.4939L10.851 4.86893C10.9082 4.80775 10.9842 4.76748 11.0669 4.75452C11.1496 4.74156 11.2343 4.75667 11.3075 4.79743Z" fill="#3872FA"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='font-medium'>Đã duyệt</p>
                                        <span className='text-xl font-medium'>{data.approved}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='p-5 bg-white border rounded shadow'>
                                <div className='flex space-x-5'>
                                    <div className='h-14 w-14'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                            <path fill="#FFAB61" d="m9.117 10.594-8.03 3.318c-.575.226-.63 1.14-.062 1.39l7.869 3.242c.742.276 1.525.276 2.213 0l7.869-3.241c.568-.25.513-1.165-.063-1.391l-8.03-3.318c-.675-.275-1.07-.278-1.766 0Z"></path>
                                            <path fill="#FF8F64" d="M14.759 12.195c-1.177.5-2.363.993-3.535 1.497-.765.288-1.268.435-2.198.095l-2.598-1.112c-.781-.367-1.296.837-.491 1.149l2.567 1.098c1.056.461 2.045.412 3.283-.113l4.595-1.943-1.623-.67Z"></path>
                                            <path fill="#FFC861" d="m9.117 6.028-8.03 3.318c-.575.226-.63 1.14-.062 1.39l7.869 3.242c.742.276 1.525.276 2.213 0l7.869-3.241c.568-.251.513-1.165-.063-1.391l-8.03-3.318c-.675-.275-1.07-.278-1.766 0Z"></path><path fill="#FFAB61" d="M14.788 7.64c-1.178.501-2.367.995-3.54 1.5-.766.289-1.27.436-2.202.094L6.444 8.121c-.782-.368-1.298.839-.492 1.15l2.572 1.1c1.057.463 2.048.413 3.287-.113l4.603-1.946-1.626-.671Z"></path>
                                            <path fill="#55A1FF" d="m9.117 1.457-8.03 3.318c-.575.227-.63 1.14-.062 1.391l7.869 3.242c.742.275 1.525.276 2.213 0l7.869-3.242c.568-.25.513-1.164-.063-1.39l-8.03-3.319c-.675-.275-1.07-.278-1.766 0Z"></path><path fill="#00003A" d="M9.016 1.17.976 4.493C.137 4.823.067 6.097.9 6.463 3.656 7.586 6.44 8.759 8.798 9.718c.81.301 1.677.304 2.442-.002 1.293-.531 2.585-1.065 3.878-1.598l3.71 1.533c.316.124.357.68.051.815l-7.872 3.245c-.613.245-1.316.246-1.991-.005l-7.863-3.24c-.316-.15-.259-.697.056-.818l2.305-.951c.419-.145.16-.77-.238-.578l-2.3.95C.137 9.396.067 10.67.9 11.037l3.192 1.316-3.118 1.288c-.837.33-.907 1.604-.074 1.971 2.75 1.137 5.541 2.285 7.897 3.254.81.3 1.677.304 2.442-.003 2.75-1.13 5.539-2.28 7.891-3.25.834-.368.763-1.642-.074-1.972l-2.685-1.108c-.4-.197-.66.435-.238.577.899.37 1.795.747 2.694 1.113.316.125.357.681.051.816l-7.872 3.244c-.61.245-1.311.246-1.985-.002L1.153 15.04c-.306-.135-.265-.691.05-.816 1.237-.507 2.475-1.02 3.71-1.532 1.296.532 2.59 1.07 3.885 1.6.81.3 1.677.304 2.442-.003 2.75-1.126 5.537-2.286 7.891-3.25.834-.368.763-1.642-.074-1.972L15.938 7.78c1.064-.438 2.129-.878 3.193-1.315.834-.367.763-1.642-.074-1.971-2.675-1.118-5.367-2.2-8.038-3.323-.736-.305-1.293-.284-2.003 0Zm1.764.58c2.802 1.16 5.65 2.333 8.048 3.325.316.124.357.681.051.816l-7.872 3.244c-.613.245-1.316.246-1.991-.005L1.153 5.89c-.318-.138-.256-.703.056-.818l8.038-3.32c.659-.269.955-.234 1.534-.002Z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='font-medium'>Đang xử lý</p>
                                        <span className='text-xl font-medium'>{data.pending}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <NoResult />
            }
        </WidgetCard>
    )
}

export default ApplicationSummary