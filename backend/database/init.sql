CREATE TABLE IF NOT EXISTS page_settings (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) NOT NULL,
  key_name VARCHAR(100) NOT NULL,
  value_text TEXT NOT NULL,
  UNIQUE (section_name, key_name)
);

CREATE TABLE IF NOT EXISTS navigation_links (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS insurance_types (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS license_plate_regions (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  prefixes VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS why_choose_reasons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  number_text VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS benefits (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_key VARCHAR(100) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS process_steps (
  id SERIAL PRIMARY KEY,
  step_number VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  review TEXT NOT NULL,
  avatar_key VARCHAR(100) NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS app_features (
  id SERIAL PRIMARY KEY,
  feature_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255) NOT NULL,
  category_color VARCHAR(30) NOT NULL,
  published_at VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_key VARCHAR(100) NOT NULL,
  website_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS footer_links (
  id SERIAL PRIMARY KEY,
  section_title VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  href TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_infos (
  id SERIAL PRIMARY KEY,
  contact_type VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  value_text TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGSERIAL PRIMARY KEY,
  insurance_type_slug VARCHAR(100) NOT NULL,
  insurance_type_name VARCHAR(255) NOT NULL,
  license_plate_region_slug VARCHAR(100) NOT NULL,
  license_plate_region_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  notes TEXT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

TRUNCATE TABLE
  page_settings,
  navigation_links,
  insurance_types,
  license_plate_regions,
  why_choose_reasons,
  stats,
  benefits,
  process_steps,
  faqs,
  testimonials,
  app_features,
  news_articles,
  partners,
  footer_links,
  contact_infos
RESTART IDENTITY;

INSERT INTO page_settings (section_name, key_name, value_text) VALUES
  ('hero', 'banner_alt', 'DBV Insurance Banner'),
  ('quote', 'eyebrow', 'TÍNH PHÍ & MUA BẢO HIỂM NHANH CHÓNG'),
  ('quote', 'heading', 'CHỈ 1 PHÚT - NHẬN NGAY BÁO GIÁ'),
  ('quote', 'button_text', 'NHẬN BÁO GIÁ'),
  ('why_choose', 'eyebrow', 'VÌ SAO CHỌN DBV?'),
  ('why_choose', 'heading', 'CAM KẾT ĐỒNG HÀNH CÙNG BẠN'),
  ('products', 'eyebrow', 'SẢN PHẨM NỔI BẬT'),
  ('products', 'heading', 'ĐA DẠNG GIẢI PHÁP BẢO HIỂM'),
  ('products', 'subheading', 'Lựa chọn gói bảo hiểm phù hợp, tận hưởng hành trình trọn vẹn.'),
  ('products', 'button_text', 'XEM TẤT CẢ SẢN PHẨM'),
  ('benefits', 'eyebrow', 'QUYỀN LỢI KHI THAM GIA BẢO HIỂM DBV'),
  ('benefits', 'heading', 'BẢO VỆ TOÀN DIỆN - AN TÂM TRỌN VẸN'),
  ('process', 'eyebrow', 'QUY TRÌNH THAM GIA BẢO HIỂM'),
  ('process', 'heading', '4 BƯỚC ĐƠN GIẢN'),
  ('faq', 'eyebrow', 'CÂU HỎI THƯỜNG GẶP'),
  ('faq', 'heading', 'GIẢI ĐÁP THẮC MẮC CỦA BẠN'),
  ('testimonials', 'eyebrow', 'KHÁCH HÀNG NÓI GÌ VỀ DBV'),
  ('testimonials', 'heading', 'TRIỆU KHÁCH HÀNG TIN TƯỞNG'),
  ('mobile_app', 'eyebrow', 'ỨNG DỤNG DBV INSURANCE'),
  ('mobile_app', 'heading', 'QUẢN LÝ BẢO HIỂM DỄ DÀNG TRÊN ĐIỆN THOẠI'),
  ('mobile_app', 'app_store_text', 'Download on the App Store'),
  ('mobile_app', 'google_play_text', 'Get it on Google Play'),
  ('news', 'eyebrow', 'TIN TỨC MỚI NHẤT'),
  ('news', 'heading', 'CẬP NHẬT THÔNG TIN HỮU ÍCH'),
  ('news', 'button_text', 'XEM TẤT CẢ'),
  ('partners', 'heading', 'ĐỐI TÁC CỦA DBV'),
  ('banner', 'button_text', 'GỌI TƯ VẤN NGAY'),
  ('banner', 'phone_number', '1900 1234'),
  ('banner', 'support_text', 'Hỗ trợ 24/7 miễn phí'),
  ('contact_support', 'zalo_url', 'https://zalo.me/0901234567'),
  ('contact_support', 'zalo_label', 'Chat with Zalo'),
  ('contact_support', 'map_embed_url', 'https://maps.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&t=&z=15&ie=UTF8&iwloc=&output=embed'),
  ('contact_support', 'map_title', 'DBV office map'),
  ('footer', 'brand_name', 'DBV'),
  ('footer', 'brand_subtitle', 'Insurance'),
  ('footer', 'description', 'DBV cam kết mang đến các giải pháp bảo hiểm ưu việt, bảo vệ bạn và gia đình trước mọi rủi ro.'),
  ('footer', 'copyright', '© 2024 DBV Insurance. All rights reserved.');

INSERT INTO navigation_links (label, href, display_order) VALUES
  ('Trang chủ', '#home', 1),
  ('Sản phẩm', '#products', 2),
  ('Quyền lợi', '#benefits', 3),
  ('Tin tức', '#news', 4),
  ('Liên hệ', '#contact', 5);

INSERT INTO insurance_types (slug, name, description, icon_key, display_order) VALUES
  ('oto', 'Xe Ô Tô', 'Bảo vệ toàn diện cho xe và người ngồi trên xe', 'oto', 1),
  ('xemay', 'Xe Máy', 'An tâm vi vu trên mọi cung đường', 'xemay', 2),
  ('suckhoe', 'Sức Khỏe', 'Chăm sóc sức khỏe toàn diện cho bạn và gia đình', 'suckhoe', 3),
  ('dulich', 'Du Lịch', 'An tâm khám phá, trọn vẹn trải nghiệm', 'dulich', 4),
  ('hanghoa', 'Hàng Hóa', 'Bảo vệ hàng hóa trong quá trình vận chuyển', 'hanghoa', 5),
  ('nha', 'Nhà Tư Nhân', 'Bảo vệ ngôi nhà và tài sản trước mọi rủi ro', 'nha', 6);

INSERT INTO license_plate_regions (slug, name, prefixes, display_order) VALUES
  ('mien-tay', 'Miền Tây', '60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75', 1),
  ('hcm', 'TP.HCM', '50, 51, 52, 53, 54, 55, 56, 57, 58, 59', 2),
  ('mien-trung', 'Miền Trung', '36, 37, 38, 43, 47, 48, 49, 74, 75, 76, 77, 78, 79', 3),
  ('mien-bac', 'Miền Bắc', '11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 40', 4);

INSERT INTO why_choose_reasons (title, description, icon_key, display_order) VALUES
  ('Thương hiệu uy tín', 'Hơn 15 năm kinh nghiệm trong lĩnh vực bảo hiểm', 'why-1', 1),
  ('Quy trình đơn giản', 'Thủ tục nhanh gọn, dễ dàng, tiết kiệm thời gian', 'why-2', 2),
  ('Bồi thường minh bạch', 'Cam kết bồi thường rõ ràng, đúng quy định', 'why-3', 3),
  ('Mạng lưới rộng khắp', 'Hơn 200+ gara liên kết trên toàn quốc', 'why-4', 4),
  ('Công nghệ hiện đại', 'Nền tảng trực tuyến thông minh, trải nghiệm tiện lợi', 'why-5', 5);

INSERT INTO stats (number_text, label, icon_key, display_order) VALUES
  ('15+', 'Năm kinh nghiệm', 'stat-6', 1),
  ('500,000+', 'Khách hàng tin tưởng', 'stat-7', 2),
  ('98%', 'Tỷ lệ bồi thường thành công', 'stat-8', 3),
  ('24/7', 'Hỗ trợ khách hàng', 'stat-9', 4);

INSERT INTO benefits (title, description, icon_key, display_order) VALUES
  ('Bảo vệ toàn diện', 'Đa dạng quyền lợi phù hợp nhu cầu', 'benefit-10', 1),
  ('Chi phí hợp lý', 'Mức phí cạnh tranh, nhiều ưu đãi hấp dẫn', 'benefit-11', 2),
  ('Hỗ trợ 24/7', 'Tư vấn và hỗ trợ mọi lúc, mọi nơi', 'benefit-12', 3),
  ('Bồi thường nhanh chóng', 'Quy trình đơn giản, nhận bồi thường nhanh', 'benefit-13', 4),
  ('Tự do lựa chọn', 'Linh hoạt lựa chọn gói bảo hiểm phù hợp', 'benefit-14', 5);

INSERT INTO process_steps (step_number, title, description, display_order) VALUES
  ('1', 'Chọn sản phẩm', 'Lựa chọn gói bảo hiểm phù hợp nhu cầu', 1),
  ('2', 'Cung cấp thông tin', 'Điền đầy đủ thông tin theo hướng dẫn', 2),
  ('3', 'Thanh toán', 'Thanh toán trực tuyến nhanh chóng, an toàn', 3),
  ('4', 'Nhận hợp đồng', 'Nhận hợp đồng điện tử và giấy chứng nhận', 4);

INSERT INTO faqs (question, answer, display_order) VALUES
  ('Bảo hiểm xe ô tô có bắt buộc không?', 'Theo quy định của pháp luật Việt Nam, bảo hiểm trách nhiệm dân sự của chủ xe cơ giới là bắt buộc. Đây là loại bảo hiểm cơ bản nhất mà mọi chủ xe ô tô phải mua để được lưu hành trên đường.', 1),
  ('Thời gian bồi thường mất bao lâu?', 'Thời gian bồi thường phụ thuộc vào từng trường hợp cụ thể. Đối với các trường hợp đơn giản, thời gian bồi thường thường từ 7-15 ngày làm việc. Đối với các trường hợp phức tạp cần điều tra thêm, thời gian có thể kéo dài hơn nhưng không quá 30 ngày.', 2),
  ('Tôi có thể mua bảo hiểm online được không?', 'Có, bạn hoàn toàn có thể mua bảo hiểm online thông qua website chính thức của DBV. Quy trình đơn giản, nhanh chóng và an toàn. Bạn sẽ nhận được hợp đồng điện tử ngay sau khi thanh toán thành công.', 3),
  ('Làm thế nào để yêu cầu bồi thường?', 'Khi xảy ra sự cố, bạn cần: 1) Báo ngay cho công ty bảo hiểm qua hotline 24/7, 2) Bảo vệ hiện trường và thu thập bằng chứng, 3) Chuẩn bị đầy đủ hồ sơ theo yêu cầu, 4) Nộp hồ sơ tại văn phòng gần nhất hoặc online. Đội ngũ chuyên viên sẽ hỗ trợ bạn trong suốt quá trình.', 4),
  ('Chi phí bảo hiểm được tính như thế nào?', 'Chi phí bảo hiểm được tính dựa trên nhiều yếu tố như: loại xe, giá trị xe, mục đích sử dụng, khu vực hoạt động, lịch sử bồi thường, và các quyền lợi bổ sung bạn lựa chọn. DBV cung cấp nhiều gói bảo hiểm linh hoạt phù hợp với từng nhu cầu và ngân sách.', 5);

INSERT INTO testimonials (name, location, review, avatar_key, rating, display_order) VALUES
  ('Nguyễn Hoàng Nam', 'Khách hàng tại Hà Nội', 'Dịch vụ rất nhanh chóng và chuyên nghiệp. Tôi đã được bồi thường chỉ sau 2 ngày, rất hài lòng!', 'avt1', 5, 1),
  ('Trần Thu Trang', 'Khách hàng tại Đà Nẵng', 'Mua bảo hiểm online rất tiện lợi, thủ tục đơn giản. Nhân viên tư vấn nhiệt tình, hỗ trợ 24/7.', 'avt2', 5, 2),
  ('Lê Minh Đức', 'Khách hàng tại TP.HCM', 'Quyền lợi tốt, chi phí hợp lý. DBV là lựa chọn số 1 của tôi và gia đình.', 'avt1', 5, 3),
  ('Phạm Thị Lan', 'Khách hàng tại Hải Phòng', 'Tôi đã sử dụng dịch vụ bảo hiểm của DBV được 3 năm. Rất tin tưởng và hài lòng với chất lượng phục vụ.', 'avt2', 5, 4);

INSERT INTO app_features (feature_text, display_order) VALUES
  ('Mua bảo hiểm nhanh chóng', 1),
  ('Theo dõi hợp đồng, lịch sử bồi thường', 2),
  ('Nhận thông báo và ưu đãi hấp dẫn', 3),
  ('Hỗ trợ 24/7 mọi lúc mọi nơi', 4);

INSERT INTO news_articles (category, category_color, published_at, title, description, image_url, link_url, display_order) VALUES
  ('Kinh nghiệm', '#1a6b2f', '20/04/2024', '5 kinh nghiệm lái xe an toàn mùa mưa bão', 'Những lưu ý quan trọng giúp bạn lái xe an toàn trong điều kiện thời tiết xấu.', 'https://bhdbv.com/wp-content/uploads/2020/10/bhdbv-baohiemxe-autocare-1024x512.jpg', '#', 1),
  ('Tin tức', '#1a6b2f', '18/04/2024', 'DBV ra mắt gói bảo hiểm xe ô tô toàn diện mới', 'Quyền lợi vượt trội, phí cạnh tranh, bảo vệ tối ưu cho xe yêu của bạn.', 'https://bhdbv.com/wp-content/uploads/2026/03/dbv-allianz-partners-thailand-buoc-ngoat-bao-hiem-xe-co-gioi-viet-nam-1024x512.jpg', '#', 2),
  ('Hướng dẫn', '#1a6b2f', '15/04/2024', 'Hướng dẫn yêu cầu bồi thường trực tuyến', 'Các bước đơn giản để yêu cầu bồi thường nhanh chóng và thuận tiện.', 'https://bhdbv.com/wp-content/uploads/2026/02/trien-khai-cap-giay-chung-nhan-dang-kiem-dien-tu-01-3-2026-1024x512.jpg', '#', 3);

INSERT INTO partners (name, logo_key, website_url, display_order) VALUES
  ('Toyota', 'toyota', '#', 1),
  ('Honda', 'honda', '#', 2),
  ('Ford', 'ford', '#', 3),
  ('VinFast', 'vin', '#', 4),
  ('Thaco', 'thaco', '#', 5),
  ('Mitsubishi', 'mitsubishi', '#', 6),
  ('MG', 'mg', '#', 7),
  ('OMODA', 'omoda', '#', 8),
  ('BYD', 'byd', '#', 9),
  ('MEC', 'mec', '#', 10),
  ('Lexus', 'lexus', '#', 11);

INSERT INTO footer_links (section_title, label, href, display_order) VALUES
  ('SẢN PHẨM', 'Bảo hiểm xe ô tô', '#', 1),
  ('SẢN PHẨM', 'Bảo hiểm xe máy', '#', 2),
  ('SẢN PHẨM', 'Bảo hiểm sức khỏe', '#', 3),
  ('SẢN PHẨM', 'Bảo hiểm du lịch', '#', 4),
  ('SẢN PHẨM', 'Bảo hiểm hàng hóa', '#', 5),
  ('HỖ TRỢ', 'Hướng dẫn mua bảo hiểm', '#', 1),
  ('HỖ TRỢ', 'Hướng dẫn bồi thường', '#', 2),
  ('HỖ TRỢ', 'Câu hỏi thường gặp', '#', 3),
  ('HỖ TRỢ', 'Điều khoản bảo hiểm', '#', 4),
  ('HỖ TRỢ', 'Liên hệ hỗ trợ', '#', 5),
  ('VỀ DBV', 'Giới thiệu', '#', 1),
  ('VỀ DBV', 'Tin tức', '#', 2),
  ('VỀ DBV', 'Tuyển dụng', '#', 3),
  ('VỀ DBV', 'Chính sách bảo mật', '#', 4),
  ('VỀ DBV', 'Điều khoản sử dụng', '#', 5);

INSERT INTO contact_infos (contact_type, label, value_text, display_order) VALUES
  ('phone', 'Hotline', '1900 1234', 1),
  ('email', 'Email', 'hotro@dbv.com.vn', 2),
  ('address', 'Địa chỉ', 'Tầng 12, Tòa nhà DBV, Quận 1, TP. Hồ Chí Minh', 3);
