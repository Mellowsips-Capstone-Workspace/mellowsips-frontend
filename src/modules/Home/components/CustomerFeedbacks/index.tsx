import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';

const CustomerFeedbacks: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-5">
            <Swiper
                pagination={
                    { clickable: true }
                }
                autoplay={
                    {
                        delay: 2000,
                        disableOnInteraction: true
                    }
                }
                modules={[Pagination, Autoplay]}
            >
                <SwiperSlide>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="py-5">
                            <h3 className="text-main-secondary font-extrabold text-2xl text-center py-5">
                                TRẢI NGHIỆM CỦA ĐỐI <br />TÁC VỚI MELLOW SIPS
                            </h3>
                            <div className="flex px-5">
                                <div className="w-32">
                                    <img src="/images/double-quotes.svg" alt="Double quotes" />
                                </div>
                                <div className="grow text-main-secondary ps-4 pe-5">
                                    <p>"Tôi thực sự hài lòng với ứng dụng này. Không chỉ giúp tôi tiết kiệm thời gian trong việc quản lý đơn hàng mà còn tạo ra trải nghiệm tiện lợi và dễ dàng cho khách hàng. Cảm ơn đội ngũ phát triển đã mang đến một giải pháp hiệu quả cho doanh nghiệp của tôi." </p>
                                    <p><b>Chủ nhà hàng A</b></p>
                                </div>
                            </div>
                        </div>

                        <img src="/images/feedback-img.svg" loading="lazy" alt="Feedback" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="py-5">
                            <h3 className="text-main-secondary font-extrabold text-2xl text-center py-5">
                                TRẢI NGHIỆM CỦA ĐỐI <br />TÁC VỚI MELLOW SIPS
                            </h3>
                            <div className="flex px-5">
                                <div className="w-32">
                                    <img src="/images/double-quotes.svg" alt="Double quotes" />
                                </div>
                                <div className="grow text-main-secondary ps-4 pe-5">
                                    <p>"Tôi thực sự hài lòng với ứng dụng này. Không chỉ giúp tôi tiết kiệm thời gian trong việc quản lý đơn hàng mà còn tạo ra trải nghiệm tiện lợi và dễ dàng cho khách hàng. Cảm ơn đội ngũ phát triển đã mang đến một giải pháp hiệu quả cho doanh nghiệp của tôi." </p>
                                    <p><b>Chủ nhà hàng A</b></p>
                                </div>
                            </div>
                        </div>

                        <img src="/images/feedback-img.svg" loading="lazy" alt="Feedback" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="py-5">
                            <h3 className="text-main-secondary font-extrabold text-2xl text-center py-5">
                                TRẢI NGHIỆM CỦA ĐỐI <br />TÁC VỚI MELLOW SIPS
                            </h3>
                            <div className="flex px-5">
                                <div className="w-32">
                                    <img src="/images/double-quotes.svg" alt="Double quotes" />
                                </div>
                                <div className="grow text-main-secondary ps-4 pe-5">
                                    <p>"Tôi thực sự hài lòng với ứng dụng này. Không chỉ giúp tôi tiết kiệm thời gian trong việc quản lý đơn hàng mà còn tạo ra trải nghiệm tiện lợi và dễ dàng cho khách hàng. Cảm ơn đội ngũ phát triển đã mang đến một giải pháp hiệu quả cho doanh nghiệp của tôi." </p>
                                    <p><b>Chủ nhà hàng A</b></p>
                                </div>
                            </div>
                        </div>

                        <img src="/images/feedback-img.svg" loading="lazy" alt="Feedback" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div >
    )

}

export default CustomerFeedbacks;