import React, { useState, useRef } from 'react';
import './productDetail.css'; // Đảm bảo rằng bạn đã tạo và liên kết tệp CSS
import './grid.css';
import parse from 'html-react-parser';

const data = `
    <h2>Galaxy Z Fold6 - Bứt phá mọi giới hạn, dẫn đầu xu hướng</h2>
<p class="ql-align-justify">
  <a href="https://clickbuy.com.vn/samsung" rel="noopener noreferrer" target="_blank" style="color: rgb(39, 138, 236);">Samsung</a>&nbsp;<a href="https://clickbuy.com.vn/galaxy-z-fold-6" rel="noopener noreferrer" target="_blank" style="color: rgb(39, 138, 236);">Galaxy Z Fold6</a>&nbsp;mang đến trải nghiệm di động đột phá với thiết kế gập tiên tiến và hiện đại. Sự kết hợp giữa màn hình chính 7.6 inch và màn hình phụ 6.4 inch sẽ cung cấp không gian rộng rãi cho công việc và giải trí. Với bộ vi xử lý Snapdragon 8 Gen 3 For Galaxy, thiết bị này đảm bảo hiệu suất mạnh mẽ cùng khả năng xử lý đa nhiệm vượt trội. Đây là sự lựa chọn lý tưởng cho những ai yêu thích sự sáng tạo và công nghệ hiện đại.
</p>
<p class="ql-align-justify">
  <img src="https://clickbuy.com.vn/uploads/images/tin%20tuc/Quanh/galaxy-z-fold6-1_1.jpg" alt="Tìm hiểu về Galaxy Z Fold6">
</p>
<h3>Vì sao nên mua Galaxy Z Fold6 tại Clickbuy?</h3>
<p class="ql-align-justify">
  Clickbuy là một trong những nhà cung cấp thiết bị điện tử hàng đầu tại Việt Nam, với hơn 13 năm kinh nghiệm trong ngành. Chúng tôi tự hào sở hữu một mạng lưới gần 20 cơ sở trên toàn quốc, mang đến cho khách hàng những sản phẩm công nghệ chất lượng cao và dịch vụ chăm sóc tận tâm.
</p>
<h4>Cam kết sản phẩm chính hãng, chất lượng vượt trội</h4>
<p class="ql-align-justify">
  Tại Clickbuy, chúng tôi cam kết cung cấp sản phẩm chính hãng với chất lượng vượt trội. Mỗi sản phẩm của chúng tôi đều được lựa chọn kỹ lưỡng từ các thương hiệu uy tín hàng đầu, đảm bảo đáp ứng các tiêu chuẩn chất lượng cao nhất.
</p>
<p class="ql-align-justify">
  Chúng tôi hiểu rằng sự tin cậy của khách hàng là tài sản quý giá nhất, vì vậy tất cả sản phẩm đều có chứng nhận nguồn gốc rõ ràng và bảo hành đầy đủ. Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ và tư vấn để giúp bạn chọn lựa những sản phẩm phù hợp nhất. Với Clickbuy, bạn có thể hoàn toàn yên tâm về sự chính hãng và chất lượng của mọi mặt hàng mà bạn mua sắm.
</p>
<h4>Lựa chọn đa dạng về màu sắc và dung lượng</h4>
<p class="ql-align-justify">
  Chúng tôi tự hào mang đến cho khách hàng sự lựa chọn đa dạng về màu sắc và các phiên bản dung lượng. Với nhiều tùy chọn phong phú từ các thương hiệu hàng đầu, khách hàng có thể dễ dàng tìm thấy sản phẩm phù hợp với sở thích cá nhân và nhu cầu sử dụng của mình.
</p>
<p class="ql-align-justify">
  Mỗi khách hàng sẽ có những yêu cầu riêng biệt, vì vậy chúng tôi luôn cập nhật các mẫu mã mới nhất và đầy đủ nhất để đáp ứng mọi nhu cầu. Cho dù bạn đang tìm kiếm một thiết bị với màu sắc thời trang hay dung lượng lớn để lưu trữ dữ liệu, chúng tôi đều có giải pháp hoàn hảo cho bạn.
</p>
<h4>Giá thành hợp lý và cạnh tranh</h4>
<p class="ql-align-justify">
  Đặc biệt, chúng tôi luôn nỗ lực để mang đến cho khách hàng những ưu đãi tốt nhất, từ các chương trình giảm giá hấp dẫn đến các gói khuyến mãi đặc biệt. Đội ngũ chuyên gia của chúng tôi thường xuyên theo dõi và điều chỉnh giá cả để đảm bảo rằng bạn nhận được sự cân bằng hoàn hảo giữa chất lượng và giá trị. Với Clickbuy, người dùng không chỉ mua được sản phẩm chính hãng và chất lượng cao mà còn yên tâm về giá cả hợp lý.
</p>
<h4>Dịch vụ hậu mãi và bảo hành linh hoạt, tận tâm</h4>
<p class="ql-align-justify">
  Đến với Clickbuy, chúng tôi đặt dịch vụ hậu mãi và bảo hành lên hàng đầu để đảm bảo sự hài lòng của khách hàng. Tại đây cung cấp dịch vụ bảo hành linh hoạt với các chính sách đổi trả và sửa chữa dễ dàng. Giúp người mua có thể yên tâm trong suốt quá trình sử dụng sản phẩm.
</p>
<p class="ql-align-justify">
  Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc. Đồng thời cũng cung cấp sự hỗ trợ tận tâm để giải quyết nhanh chóng các vấn đề phát sinh. Chúng tôi cam kết sẽ luôn đồng hành cùng khách hàng sau khi mua hàng, đảm bảo rằng mọi người sẽ luôn nhận được sự chăm sóc chu đáo và dịch vụ chất lượng nhất.
</p>
<h4>Giao hàng nhanh chóng và tiện lợi</h4>
<p class="ql-align-justify">
  Song song với đó, chúng tôi còn mang đến dịch vụ giao hàng nhanh chóng và tiện lợi để đáp ứng nhu cầu của người tiêu dùng. Với mạng lưới logistics rộng khắp và đội ngũ giao hàng chuyên nghiệp, chúng tôi đảm bảo mọi đơn hàng được xử lý và vận chuyển nhanh nhất có thể.
</p>
<p class="ql-align-justify">
  Chúng tôi cũng cung cấp nhiều tùy chọn giao hàng linh hoạt, từ giao hàng trong ngày đến giao hàng tận nơi theo yêu cầu. Với Clickbuy, bạn có thể hoàn toàn yên tâm về sự nhanh chóng và tiện lợi của dịch vụ giao hàng, để khách hàng tập trung vào việc tận hưởng những sản phẩm công nghệ tuyệt vời của chúng tôi.
</p>
<h4>Hỗ trợ nhiều hình thức thanh toán linh hoạt</h4>
<p class="ql-align-justify">
  Tại Clickbuy, chúng tôi cung cấp nhiều hình thức thanh toán linh hoạt để người mua có thể dễ dàng hoàn tất giao dịch theo cách tiện lợi nhất. Khách hàng có thể chọn thanh toán bằng thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng, hoặc các ví điện tử phổ biến như Momo, ZaloPay.
</p>
<p class="ql-align-justify">
  Chúng tôi cũng hỗ trợ thanh toán khi nhận hàng (COD) để bạn yên tâm hơn trong quá trình mua sắm. Với các phương thức thanh toán đa dạng, khách hàng có thể dễ dàng lựa chọn hình thức phù hợp với mình, giúp việc mua sắm trở nên thuận tiện và nhanh chóng hơn bao giờ hết.
</p>
<h3>Vì sao nên mua Galaxy Z Fold6?</h3>
<p class="ql-align-justify">
  Nếu bạn đang tìm kiếm một chiếc điện thoại kết hợp giữa sự đổi mới công nghệ và trải nghiệm người dùng tuyệt vời, Galaxy Z Fold6 chính là lựa chọn lý tưởng. Dòng máy này là sự kết hợp của thiết kế gập mở ấn tượng, hiệu suất mạnh mẽ và hàng loạt tính năng đa nhiệm đột phá.
</p>
<h4>Thiết kế gập mở đột phá và bền bỉ</h4>
<p class="ql-align-justify">
  Galaxy Z Fold6 mang đến một thiết kế gập mở đột phá, kết hợp sự linh hoạt và phong cách để nâng cao trải nghiệm người dùng. Màn hình chính 7.6 inch khi mở ra tạo không gian rộng lớn cho công việc và giải trí, trong khi khi gập lại, thiết bị trở nên gọn nhẹ và dễ mang theo.
</p>
<p class="ql-align-justify">
  Thiết kế này không chỉ tiện lợi mà còn cực kỳ bền bỉ, nhờ vào việc sử dụng các vật liệu cao cấp và chất lượng. Điều này đảm bảo rằng thiết bị có thể chịu đựng các yếu tố môi trường và sử dụng hàng ngày, mang đến sự bảo vệ tối ưu cho thiết bị. Với sự kết hợp giữa thiết kế sáng tạo và độ bền lâu dài, đây thực sự là một sự lựa chọn đáng giá cho những ai yêu thích công nghệ tiên tiến.
</p>
<h4>Màn hình chính 7.6 inch siêu rộng</h4>
<p class="ql-align-justify">
  Galaxy Z Fold6 nổi bật với màn hình chính 7.6 inch siêu rộng, mang đến trải nghiệm tuyệt vời cho cả công việc và giải trí. Khi mở ra, màn hình lớn này tạo ra không gian rộng rãi cho đa nhiệm, giúp bạn dễ dàng xem video, chơi game, hay làm việc với nhiều ứng dụng cùng lúc mà không bị gián đoạn. Độ phân giải cao và tần số quét 120Hz kết hợp cùng công nghệ Dynamic AMOLED 2X. Vừa mang lại hình ảnh sắc nét vừa mượt mà, nâng cao trải nghiệm người dùng và làm cho mọi thao tác trở nên dễ dàng hơn.
</p>
<p class="ql-align-justify">
  Màn hình chính của chiếc máy này còn được thiết kế để hỗ trợ các tính năng đa nhiệm tiên tiến. Giúp người dùng tối ưu hóa hiệu quả công việc và giải trí trong mọi tình huống. Với khả năng chia màn hình và hoạt động mượt mà, bạn có thể dễ dàng làm việc với nhiều ứng dụng đồng thời mà không gặp phải tình trạng giật lag.
</p>
<h4>Màn hình phụ 6.4 inch tiện lợi</h4>
<p class="ql-align-justify">
  Màn hình phụ 6.4 inch của Galaxy Z Fold6 cũng không kém phần ấn tượng. Đây là điểm nhấn tuyệt vời cho những ai thường xuyên cần sử dụng điện thoại trong khi di chuyển. Màn hình phụ cung cấp không gian vừa đủ để kiểm tra thông báo, trả lời tin nhắn, và thực hiện các tác vụ cơ bản mà không cần mở máy ra.
</p>
<p class="ql-align-justify">
  Thiết kế màn hình phụ này cho phép người dùng dễ dàng truy cập vào các ứng dụng và thông tin quan trọng ngay cả khi điện thoại đang gập lại. Điều này mang lại sự tiện lợi và linh hoạt trong việc sử dụng thiết bị hàng ngày. Bạn có thể nhanh chóng kiểm tra các thông báo và cập nhật mà không cần mở toàn bộ màn hình chính.
</p>
<h4>Hiệu suất mạnh mẽ với Snapdragon 8 Gen 3</h4>
<p class="ql-align-justify">
  Galaxy Z Fold6 được trang bị bộ vi xử lý Snapdragon 8 Gen 3 For Galaxy, mang lại hiệu suất cực kỳ mạnh mẽ và mượt mà. Bạn sẽ tận hưởng tốc độ xử lý nhanh chóng cho mọi tác vụ, từ các ứng dụng đa nhiệm cho đến các trò chơi đồ họa cao cấp.
</p>
<p class="ql-align-justify">
  Bộ vi xử lý này còn hỗ trợ khả năng xử lý AI tiên tiến, giúp tối ưu hóa hiệu suất máy và tiết kiệm năng lượng hiệu quả. Điều này không chỉ cải thiện hiệu suất làm việc mà còn nâng cao trải nghiệm giải trí, giúp người dùng có thể tận hưởng các trò chơi và ứng dụng yêu thích một cách mượt mà nhất.
</p>
<h4>Trải nghiệm người dùng tối ưu với phần mềm</h4>
<p class="ql-align-justify">
  Galaxy Z Fold6 không chỉ nổi bật về phần cứng mà còn mang đến một trải nghiệm phần mềm tối ưu. Giao diện One UI được tối ưu hóa cho màn hình gập, giúp bạn dễ dàng truy cập vào các tính năng và ứng dụng mà không gặp phải rắc rối.
</p>
<p class="ql-align-justify">
  Các tính năng phần mềm đặc biệt như Flex Mode, Multi-Window và App Pair giúp người dùng tận dụng tối đa khả năng của màn hình gập. Điều này giúp bạn dễ dàng thực hiện các tác vụ đa nhiệm, từ việc làm việc với nhiều ứng dụng cùng lúc cho đến việc chia sẻ nội dung với bạn bè và đồng nghiệp.
</p>
<h4>Khả năng chụp ảnh ấn tượng với camera đa chức năng</h4>
<p class="ql-align-justify">
  Galaxy Z Fold6 được trang bị hệ thống camera đa chức năng, bao gồm camera chính 50MP, camera siêu rộng 12MP và camera tele 10MP. Hệ thống camera này cung cấp khả năng chụp ảnh chất lượng cao, từ những bức ảnh sắc nét và chi tiết cho đến những bức ảnh chân dung đẹp mắt.
</p>
<p class="ql-align-justify">
  Camera trước và camera trong cũng không kém phần ấn tượng, cho phép bạn chụp ảnh selfie và thực hiện video call với chất lượng cao. Bạn có thể tận hưởng những bức ảnh đẹp và video sắc nét mọi lúc, mọi nơi, với sự hỗ trợ của công nghệ camera tiên tiến.
</p>
<h4>Đặt hàng ngay hôm nay và nhận ưu đãi đặc biệt</h4>
<p class="ql-align-justify">
  Hãy nhanh tay đặt hàng Galaxy Z Fold6 tại Clickbuy để trải nghiệm sự đột phá trong công nghệ di động. Chúng tôi đang có nhiều ưu đãi đặc biệt và khuyến mãi hấp dẫn cho những đơn hàng sớm. Đừng bỏ lỡ cơ hội sở hữu thiết bị công nghệ tiên tiến này và tận hưởng những trải nghiệm tuyệt vời mà nó mang lại.
</p>
<p class="ql-align-justify">
  Để biết thêm chi tiết và đặt hàng, vui lòng truy cập vào <a href="https://clickbuy.com.vn/galaxy-z-fold-6" rel="noopener noreferrer" target="_blank" style="color: rgb(39, 138, 236);">trang sản phẩm Galaxy Z Fold6 tại Clickbuy</a>.
</p>

`;

function ProductDetail() {
    const [mainImage, setMainImage] = useState(
        'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const productContentRef = useRef(null);

    const changeImage = (src) => {
        setMainImage(src);
    };

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="app-prod">
            <header className="header-prod">
                <div className="grid wide">
                    <div className="product-container">
                        <div className="product-image-gallery">
                            <div className="main-image">
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/431/725/products/1-jpeg-69590f74-5a06-4138-9d86-93b58d2e6602.jpg?v=1629635931680"
                                    alt="Product"
                                    id="main-product-image"
                                />
                            </div>
                            <div className="image-thumbnails">
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/431/725/products/1-jpeg-69590f74-5a06-4138-9d86-93b58d2e6602.jpg?v=1629635931680"
                                    alt="Front View"
                                    onClick={() =>
                                        changeImage(
                                            'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
                                        )
                                    }
                                />
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/431/725/products/1-jpeg-69590f74-5a06-4138-9d86-93b58d2e6602.jpg?v=1629635931680"
                                    alt="Back View"
                                    onClick={() =>
                                        changeImage(
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s',
                                        )
                                    }
                                />
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/431/725/products/1-jpeg-69590f74-5a06-4138-9d86-93b58d2e6602.jpg?v=1629635931680"
                                    alt="Side View"
                                    onClick={() =>
                                        changeImage(
                                            'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
                                        )
                                    }
                                />
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/431/725/products/1-jpeg-69590f74-5a06-4138-9d86-93b58d2e6602.jpg?v=1629635931680"
                                    alt="Front View"
                                    onClick={() =>
                                        changeImage(
                                            'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
                                        )
                                    }
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s"
                                    alt="Back View"
                                    onClick={() =>
                                        changeImage(
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s',
                                        )
                                    }
                                />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s"
                                    alt="Side View"
                                    onClick={() =>
                                        changeImage(
                                            'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-3d-thien-nhien-001.jpg',
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="product-details">
                            <h1>Máy lọc không khí Xiaomi</h1>
                            <p className="price">
                                3,990,000 ₫ <span className="old-price">4,790,000 ₫</span>
                            </p>
                            <div className="colors">
                                <button className="color-button black"></button>
                                <button className="color-button yellow selected"></button>
                            </div>
                            <button style={{ borderRadius: '15px' }} className="buy-button">
                                MUA NGAY
                            </button>
                            <button style={{ borderRadius: '15px' }} className="add-to-cart-button">
                                Thêm giỏ hàng
                            </button>
                            <button style={{ borderRadius: '15px' }} className="installment-button">
                                Mua trả góp
                            </button>
                            <button style={{ borderRadius: '15px' }} className="installment-card-button">
                                Mua trả góp bằng thẻ
                            </button>
                            <div className="promotions">
                                <div className="additional-offers">
                                    <p>
                                        <strong>Ưu đãi thêm:</strong>
                                    </p>
                                    <ul>
                                        <li>Miễn phí giao hàng toàn quốc</li>
                                        <li>Đổi trả trong vòng 30 ngày</li>
                                    </ul>
                                </div>
                                <div className="promotions-list">
                                    <p>
                                        <strong>Khuyến mãi:</strong>
                                    </p>
                                    <ul>
                                        <li>Giảm 1% tối đa 100.000₫ khi thanh toán qua ZaloPay</li>
                                        <li>Giảm 1% tối đa 300.000₫ khi thanh toán qua VNPay</li>
                                        <li>Trả góp 0%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="product-info">
                <div className="grid wide">
                    <div className="product-details-section">
                        <h2>Thông tin sản phẩm</h2>
                        <div className={`product-content ${isExpanded ? 'expanded' : ''}`} ref={productContentRef}>
                            {parse(data)}
                        </div>
                        <button className="toggle-content-button" onClick={toggleContent}>
                            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>

                    <div className="technical-specs">
                        <h2>Thông số kỹ thuật</h2>
                        <ul>
                            <li>Model: Xiaomi Air Purifier 4</li>
                            <li>Diện tích phòng: 30-45 m²</li>
                            <li>Công suất: 50W</li>
                            <li>Độ ồn: 30 dB</li>
                            <li>Khả năng lọc: HEPA 3 lớp</li>
                        </ul>
                    </div>

                    <div className="shop-address">
                        <h2>Địa chỉ cửa hàng</h2>
                        <p>123 Đường XYZ, Quận ABC, Thành phố DEF, Việt Nam</p>
                    </div>

                    <div className="customer-reviews">
                        <h2>Bình luận của khách hàng</h2>
                        <div className="comment-form">
                            <h3>Gửi bình luận của bạn</h3>
                            <form id="commentForm">
                                <label htmlFor="name">Tên:</label>
                                <input type="text" id="name" name="name" required />

                                <label htmlFor="phone">Số điện thoại:</label>
                                <input type="tel" id="phone" name="phone" required />

                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />

                                <label htmlFor="comment">Nội dung bình luận:</label>
                                <textarea id="comment" name="comment" rows="4" required></textarea>

                                <button type="submit" className="submit-comment-button">
                                    Gửi bình luận
                                </button>
                            </form>
                        </div>

                        <div className="reviews-list">
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                            <div className="review">
                                <span>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQwSon87NY6OvMQ_zwqaYntbD1C-sKl7INg&s"
                                        alt=""
                                    />
                                    <div>
                                        <h4>Nguyễn Văn A</h4>
                                        <p>08-06-2024 10:54</p>
                                    </div>
                                </span>
                                <p>
                                    Hàng đẹp phết nha mua được 3 cái mà giá quá đã hàng lại rất là đẹp hàng rất là OK
                                    nha đáng mua lần này là khen thật lòng hàng rất ổn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;
