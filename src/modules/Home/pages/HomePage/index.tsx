import React from "react";

import Banner from "modules/Home/components/Banner";
import CustomerFeedbacks from "modules/Home/components/CustomerFeedbacks";
import FAQ from "modules/Home/components/FAQ";
import ImportantNotice from "modules/Home/components/ImportantNotice";
import ProcessSteps from "modules/Home/components/ProcessSteps";
import ReasonSection from "modules/Home/components/ReasonSection";

const HomePage: React.FC = () => {
    return (
        <>
            <Banner />
            <div className="space-y-20 py-14">
                <div className="py-14">
                    <ProcessSteps />
                </div>
                <div className="py-14">
                    <ReasonSection />
                </div>
                <div className="py-14">
                    <ImportantNotice />
                </div>
                <div className="py-14">
                    <CustomerFeedbacks />
                </div>
                <div className="py-14">
                    <FAQ />
                </div>
            </div>
        </>
    );
};

export default HomePage;
