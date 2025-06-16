import React from 'react';

const SubscriptionPrompt = () => {
    return (
        <section className="subscription-prompt">
            <h2>Nhận thông báo sách mới</h2>
            <p>Đăng ký nhận bản tin của chúng tôi để không bỏ lỡ bất kỳ cuốn sách công nghệ mới nào!</p>
            <form className="subscription-form">
                <input type="email" placeholder="Nhập email của bạn" className="email-input" />
                <button type="submit" className="subscribe-button">Đăng ký</button>
            </form>
        </section>
    );
};

export default SubscriptionPrompt;
