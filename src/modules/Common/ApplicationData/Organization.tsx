import { IDENTITY, ORGANIZATION } from "enums/application"
import { Label, Value } from "modules/Common/ApplicationData/Row"
import DocumentPreview from "modules/Common/Document"
import { FC } from "react"
import { OrganizationModel } from "types/application"

type OrganizationProps = {
    organization: OrganizationModel
}

const Organization: FC<OrganizationProps> = ({ organization }) => {
    const { name, phone, businessType, address, identityType, identityNumber, email, identityIssueDate } = organization

    return (
        <div className="pb-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="space-y-2">
                    <Label>Họ và Tên</Label>
                    <Value>{name}</Value>
                </div>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Value> {email} </Value>
                </div>
                <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Value> {phone} </Value>
                </div>
                <div className="space-y-2">
                    <Label> Loại giấy tờ tùy thân</Label>
                    <Value>
                        {identityType === IDENTITY.CITIZEN_ID_CARD ? "Căn cước công dân" : null}
                        {identityType === IDENTITY.IDENTITY_CARD ? "Chứ minh nhân dân" : null}
                        {identityType === IDENTITY.PASSPORT ? " Hộ chiếu" : null}
                    </Value>
                </div>
                <div className="space-y-2">
                    <Label>Số CCCD/CMND/Hộ chiếu</Label>
                    <Value> {identityNumber} </Value>
                </div>
                <div className="space-y-2">
                    <Label>Ngày Cấp </Label>
                    <Value>{identityIssueDate}</Value>
                </div>
                <div className="space-y-2">
                    <Label>Địa chỉ thường trú</Label>
                    <Value>{address}</Value>
                </div>
                <div className="space-y-2">
                    <Label>Hình thức kinh doanh</Label>
                    <Value>
                        {businessType === ORGANIZATION.PERSONAL ? "Cá nhân" : null}
                        {businessType === ORGANIZATION.HOUSEHOLD ? "Hộ kinh doanh" : null}
                        {businessType === ORGANIZATION.ENTERPRISE ? "Doanh nghiệp" : null}
                    </Value>
                </div>
            </div>
            <hr></hr>

            {
                businessType === ORGANIZATION.PERSONAL ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label>Hình ảnh mặt trước CCCD/CMND/Hộ chiếu</Label>
                            <div className="p-5 border rounded">
                                <DocumentPreview documentId={organization.identityFrontImage} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Hình ảnh mặt sau CCCD/CMND/Hộ chiếu</Label>
                            <div className="p-5 border rounded">
                                <DocumentPreview documentId={organization.identityBackImage} />
                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                businessType === ORGANIZATION.ENTERPRISE ? (
                    <>
                        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

                            <div className="space-y-2">
                                <Label>Tên công ty</Label>
                                <Value>{organization.businessName}</Value>
                            </div>
                            <div className="space-y-2">
                                <Label>Mã số hộ kinh doanh</Label>
                                <Value>{organization.businessCode}</Value>
                            </div>
                            <div className="space-y-2">
                                <Label>Mã số thuế</Label>
                                <Value>{organization.taxCode}</Value>
                            </div>
                            <div className="space-y-2">
                                <Label>Ngày cấp chứng nhận</Label>
                                <Value>{organization.businessIdentityIssueDate}</Value>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Hình ảnh đầy đủ Giấy chứng nhận đăng kí Doanh nghiệp</Label>
                            <div className="grid grid-cols-2 gap-5">
                                {
                                    organization.businessIdentityImages.map(
                                        documentId => (
                                            <DocumentPreview key={documentId} documentId={documentId} />
                                        )
                                    )
                                }

                            </div>
                        </div>
                    </>
                ) : null
            }
        </div>
    )
}

export default Organization