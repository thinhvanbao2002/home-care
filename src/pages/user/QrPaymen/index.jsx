import './qrpay.css';
function QrPaymen() {
    return (
        <>
            <div className="wrapper-qrpay">
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <img src="https://qr.sepay.vn/img?acc=7888866662002&bank=MBBank&amount=100000&des=MKH32" alt="" />
                    <div className="qr-pay-brand-name">
                        <p>Ngân hàng: MB bank</p>
                    </div>
                    <div className="qr-pay-user-name">
                        <p>Chủ tài khoản: THỊNH VĂN BẢO</p>
                    </div>
                    <div className="qr-pay-price">
                        <p>
                            <span>Số tiền: </span>350,000đ
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QrPaymen;
