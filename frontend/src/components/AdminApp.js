import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './AdminApp.css';
import {
  clearAdminToken,
  createAdminUser,
  createAdminContentEntityItem,
  createAdminFaq,
  createAdminInsuranceType,
  createAdminNews,
  deleteAdminContentEntityItem,
  deleteAdminFaq,
  deleteAdminInsuranceType,
  deleteAdminNews,
  fetchAdminContentEntity,
  fetchAdminFaqs,
  fetchAdminInsuranceTypes,
  fetchAdminNews,
  fetchAdminOverview,
  fetchAdminQuotes,
  fetchAdminUsers,
  getAdminToken,
  loginAdmin,
  setAdminToken,
  updateAdminContentEntityItem,
  updateAdminFaq,
  updateAdminInsuranceType,
  updateAdminNews,
  updateAdminQuoteStatus,
  uploadAdminFile,
} from '../api';

const TABS = [
  { key: 'overview', label: 'Tong quan' },
  { key: 'users', label: 'Quan ly tai khoan' },
  { key: 'quotes', label: 'Yeu cau bao gia' },
  { key: 'contact', label: 'Cau hinh lien he' },
  { key: 'faqs', label: 'FAQ' },
  { key: 'news', label: 'Tin tuc' },
  { key: 'types', label: 'Loai bao hiem' },
  { key: 'content', label: 'Noi dung website' },
];

const STATUS_LABELS = {
  pending: 'Mới tiếp nhận',
  contacted: 'Đã liên hệ',
  completed: 'Hoàn tất',
  cancelled: 'Đã hủy',
};

const GROUP_LABELS = {
  Core: 'Cốt lõi',
  'Product & Quote': 'Sản phẩm và báo giá',
  'Homepage Blocks': 'Khối nội dung trang chủ',
  'Media & Trust': 'Truyền thông và uy tín',
  'Footer & Contact': 'Chân trang và liên hệ',
};

const CONTENT_ENTITY_CONFIGS = [
  {
    key: 'page-settings',
    label: 'Thiết lập trang',
    group: 'Core',
    fields: [
      { key: 'section_name', label: 'Tên nhóm' },
      { key: 'key_name', label: 'Khóa dữ liệu' },
      { key: 'value_text', label: 'Nội dung', type: 'textarea' },
    ],
  },
  {
    key: 'navigation-links',
    label: 'Liên kết điều hướng',
    group: 'Core',
    fields: [
      { key: 'label', label: 'Nhãn hiển thị' },
      { key: 'href', label: 'Đường dẫn' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'license-plate-regions',
    label: 'Khu vực biển số',
    group: 'Product & Quote',
    fields: [
      { key: 'slug', label: 'Slug' },
      { key: 'name', label: 'Tên khu vực' },
      { key: 'prefixes', label: 'Đầu số' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'why-choose-reasons',
    label: 'Lý do chọn DBV',
    group: 'Homepage Blocks',
    fields: [
      { key: 'title', label: 'Tiêu đề' },
      { key: 'description', label: 'Mô tả', type: 'textarea' },
      { key: 'icon_key', label: 'Mã biểu tượng' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'stats',
    label: 'Thống kê nổi bật',
    group: 'Homepage Blocks',
    fields: [
      { key: 'number_text', label: 'Con số' },
      { key: 'label', label: 'Nhãn' },
      { key: 'icon_key', label: 'Mã biểu tượng' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'benefits',
    label: 'Quyền lợi',
    group: 'Homepage Blocks',
    fields: [
      { key: 'title', label: 'Tiêu đề' },
      { key: 'description', label: 'Mô tả', type: 'textarea' },
      { key: 'icon_key', label: 'Mã biểu tượng' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'process-steps',
    label: 'Các bước quy trình',
    group: 'Homepage Blocks',
    fields: [
      { key: 'step_number', label: 'Số bước' },
      { key: 'title', label: 'Tiêu đề' },
      { key: 'description', label: 'Mô tả', type: 'textarea' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'testimonials',
    label: 'Đánh giá khách hàng',
    group: 'Media & Trust',
    fields: [
      { key: 'name', label: 'Tên khách hàng' },
      { key: 'location', label: 'Khu vực' },
      { key: 'review', label: 'Nội dung đánh giá', type: 'textarea' },
      { key: 'avatar_key', label: 'Ảnh đại diện / URL', upload: true },
      { key: 'rating', label: 'Số sao', type: 'number' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'app-features',
    label: 'Tính năng ứng dụng',
    group: 'Homepage Blocks',
    fields: [
      { key: 'feature_text', label: 'Nội dung tính năng', type: 'textarea' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'partners',
    label: 'Đối tác',
    group: 'Media & Trust',
    fields: [
      { key: 'name', label: 'Tên đối tác' },
      { key: 'logo_key', label: 'Logo / URL', upload: true },
      { key: 'website_url', label: 'Trang web' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'footer-links',
    label: 'Liên kết chân trang',
    group: 'Footer & Contact',
    fields: [
      { key: 'section_title', label: 'Tên nhóm' },
      { key: 'label', label: 'Nhãn hiển thị' },
      { key: 'href', label: 'Đường dẫn' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
  {
    key: 'contact-infos',
    label: 'Thông tin liên hệ',
    group: 'Footer & Contact',
    fields: [
      { key: 'contact_type', label: 'Loại liên hệ' },
      { key: 'label', label: 'Nhãn hiển thị' },
      { key: 'value_text', label: 'Nội dung', type: 'textarea' },
      { key: 'display_order', label: 'Thứ tự hiển thị', type: 'number' },
    ],
  },
];

const DEFAULT_LOGIN_FORM = { username: '', password: '' };
const DEFAULT_FAQ_FORM = { question: '', answer: '', displayOrder: 0 };
const DEFAULT_NEWS_FORM = {
  category: '',
  categoryColor: '#1a6b2f',
  publishedAt: '',
  title: '',
  description: '',
  imageUrl: '',
  linkUrl: '',
  displayOrder: 0,
};
const DEFAULT_TYPE_FORM = { slug: '', name: '', description: '', iconKey: '', displayOrder: 0 };
const DEFAULT_USER_FORM = { displayName: '', username: '', password: '', role: 'admin' };
const DEFAULT_CONTACT_SETTINGS = {
  brandName: '',
  brandSubtitle: '',
  footerDescription: '',
  copyright: '',
  hotline: '',
  supportText: '',
  zaloUrl: '',
  zaloLabel: '',
  facebookUrl: '',
  youtubeUrl: '',
  mapEmbedUrl: '',
  mapTitle: '',
  phoneLabel: 'Hotline',
  phoneValue: '',
  emailLabel: 'Email',
  emailValue: '',
  addressLabel: 'Địa chỉ',
  addressValue: '',
};

function createEmptyGenericForm(entityKey) {
  const config = CONTENT_ENTITY_CONFIGS.find((item) => item.key === entityKey);
  if (!config) {
    return {};
  }

  return config.fields.reduce((acc, field) => {
    acc[field.key] = field.type === 'number' ? 0 : '';
    return acc;
  }, {});
}

function isImageValue(value) {
  return typeof value === 'string' && /^(https?:\/\/|\/uploads\/)/.test(value);
}

function groupContentConfigs() {
  return CONTENT_ENTITY_CONFIGS.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});
}

function getStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function formatDateTime(value) {
  if (!value) {
    return 'Chưa có dữ liệu';
  }

  try {
    return new Date(value).toLocaleString('vi-VN');
  } catch (_error) {
    return value;
  }
}

function findSettingItem(items, sectionName, keyName) {
  return items.find((item) => item.section_name === sectionName && item.key_name === keyName) || null;
}

function findContactItem(items, contactType) {
  return items.find((item) => item.contact_type === contactType) || null;
}

function UploadField({ label, value, onChange, onUpload, disabled }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const uploaded = await onUpload(file);
      onChange(uploaded.fileUrl);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  return (
    <label>
      {label}
      <input value={value ?? ''} onChange={(event) => onChange(event.target.value)} disabled={disabled || uploading} />
      <div className="admin-upload-row">
        <label className="admin-upload-button">
          {uploading ? 'Đang tải ảnh...' : 'Tải ảnh lên'}
          <input type="file" accept="image/*" onChange={handleFileChange} hidden disabled={disabled || uploading} />
        </label>
      </div>
      {isImageValue(value) && <img src={value} alt={label} className="admin-preview-image" />}
    </label>
  );
}

function AdminLogin({ onLogin, error, loading }) {
  const [form, setForm] = useState(DEFAULT_LOGIN_FORM);
  const [localError, setLocalError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      setLocalError('Vui long nhap day du ten dang nhap va mat khau.');
      return;
    }

    setLocalError('');
    await onLogin({ username, password });
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-orb admin-login-orb--one" />
      <div className="admin-login-orb admin-login-orb--two" />
      <div className="admin-login-grid">
        <section className="admin-login-showcase">
          <p className="admin-brand">DBV ADMIN</p>
          <h1 className="admin-login-heading">Dang nhap khu vuc quan tri</h1>
          <p className="admin-login-copy">
            Theo doi khach hang tiem nang, cap nhat noi dung website va van hanh he thong tu van trong mot khong gian lam viec gon gang, an toan.
          </p>
          <div className="admin-login-highlights">
            <article>
              <strong>01</strong>
              <span>Quan ly bao gia theo thoi gian thuc</span>
            </article>
            <article>
              <strong>02</strong>
              <span>Chinh noi dung website ma khong can sua code tay</span>
            </article>
            <article>
              <strong>03</strong>
              <span>Dong bo anh, FAQ, tin tuc va cac kenh ho tro</span>
            </article>
          </div>
        </section>

        <form className="admin-login-card" onSubmit={handleSubmit}>
          <div className="admin-login-badge">Bao mat noi bo</div>
          <h2 className="admin-login-title">Xin chao, moi ban dang nhap</h2>
          <p className="admin-login-subtitle">Su dung tai khoan quan tri de truy cap dashboard dieu hanh cua DBV.</p>
          <label>
            Ten dang nhap
            <input
              autoComplete="username"
              placeholder="Nhap ten dang nhap"
              value={form.username}
              onChange={(event) => {
                setLocalError('');
                setForm((current) => ({ ...current, username: event.target.value }));
              }}
            />
          </label>
          <label>
            Mat khau
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Nhap mat khau"
              value={form.password}
              onChange={(event) => {
                setLocalError('');
                setForm((current) => ({ ...current, password: event.target.value }));
              }}
            />
          </label>
          {localError && <div className="admin-message admin-message--error">{localError}</div>}
          {error && <div className="admin-message admin-message--error">{error}</div>}
          <button type="submit" className="admin-btn admin-btn--primary admin-login-button" disabled={loading}>
            {loading ? 'Dang dang nhap...' : 'Vao trang quan tri'}
          </button>
          <p className="admin-login-note">Neu chua co tai khoan hoac can cap lai mat khau, vui long lien he quan tri he thong.</p>
        </form>
      </div>
    </div>
  );
}

function AdminApp() {
  const [authenticated, setAuthenticated] = useState(Boolean(getAdminToken()));
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [news, setNews] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [faqForm, setFaqForm] = useState(DEFAULT_FAQ_FORM);
  const [newsForm, setNewsForm] = useState(DEFAULT_NEWS_FORM);
  const [typeForm, setTypeForm] = useState(DEFAULT_TYPE_FORM);
  const [userForm, setUserForm] = useState(DEFAULT_USER_FORM);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editingTypeId, setEditingTypeId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [contentEntity, setContentEntity] = useState('page-settings');
  const [contentItems, setContentItems] = useState([]);
  const [contentForm, setContentForm] = useState(() => createEmptyGenericForm('page-settings'));
  const [editingContentId, setEditingContentId] = useState(null);
  const [contactSettings, setContactSettings] = useState(DEFAULT_CONTACT_SETTINGS);
  const [contactLoading, setContactLoading] = useState(false);

  async function handleLogin(form) {
    try {
      setAuthLoading(true);
      setAuthError('');
      const response = await loginAdmin(form);
      setAdminToken(response.token);
      setAuthenticated(true);
    } catch (loginError) {
      setAuthError(loginError.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    clearAdminToken();
    setAuthenticated(false);
    setOverview(null);
    setQuotes([]);
    setFaqs([]);
    setNews([]);
    setInsuranceTypes([]);
    setAdminUsers([]);
    setContentItems([]);
    setNotice('');
    setError('');
  }

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [overviewData, quotesData, faqsData, newsData, insuranceTypesData, adminUsersData] = await Promise.all([
        fetchAdminOverview(),
        fetchAdminQuotes(),
        fetchAdminFaqs(),
        fetchAdminNews(),
        fetchAdminInsuranceTypes(),
        fetchAdminUsers(),
      ]);

      setOverview(overviewData);
      setQuotes(quotesData);
      setFaqs(faqsData);
      setNews(newsData);
      setInsuranceTypes(insuranceTypesData);
      setAdminUsers(adminUsersData);
    } catch (loadError) {
      if (String(loadError.message).includes('authentication')) {
        handleLogout();
        setAuthError('Phien dang nhap da het han. Vui long dang nhap lai.');
        return;
      }
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  function showNotice(message) {
    setNotice(message);
    window.clearTimeout(showNotice.timeoutId);
    showNotice.timeoutId = window.setTimeout(() => setNotice(''), 2500);
  }

  async function refreshOverview() {
    const overviewData = await fetchAdminOverview();
    setOverview(overviewData);
  }

  const loadContentEntity = useCallback(async (entityKey) => {
    try {
      const data = await fetchAdminContentEntity(entityKey);
      setContentItems(data);
    } catch (loadError) {
      setError(loadError.message);
    }
  }, []);

  const loadContactSettings = useCallback(async () => {
    try {
      setContactLoading(true);
      setError('');

      const [pageSettings, contactInfos] = await Promise.all([
        fetchAdminContentEntity('page-settings'),
        fetchAdminContentEntity('contact-infos'),
      ]);

      setContactSettings({
        brandName: findSettingItem(pageSettings, 'footer', 'brand_name')?.value_text || '',
        brandSubtitle: findSettingItem(pageSettings, 'footer', 'brand_subtitle')?.value_text || '',
        footerDescription: findSettingItem(pageSettings, 'footer', 'description')?.value_text || '',
        copyright: findSettingItem(pageSettings, 'footer', 'copyright')?.value_text || '',
        hotline: findSettingItem(pageSettings, 'banner', 'phone_number')?.value_text || '',
        supportText: findSettingItem(pageSettings, 'banner', 'support_text')?.value_text || '',
        zaloUrl: findSettingItem(pageSettings, 'contact_support', 'zalo_url')?.value_text || '',
        zaloLabel: findSettingItem(pageSettings, 'contact_support', 'zalo_label')?.value_text || '',
        facebookUrl: findSettingItem(pageSettings, 'contact_support', 'facebook_url')?.value_text || '',
        youtubeUrl: findSettingItem(pageSettings, 'contact_support', 'youtube_url')?.value_text || '',
        mapEmbedUrl: findSettingItem(pageSettings, 'contact_support', 'map_embed_url')?.value_text || '',
        mapTitle: findSettingItem(pageSettings, 'contact_support', 'map_title')?.value_text || '',
        phoneLabel: findContactItem(contactInfos, 'phone')?.label || 'Hotline',
        phoneValue: findContactItem(contactInfos, 'phone')?.value_text || '',
        emailLabel: findContactItem(contactInfos, 'email')?.label || 'Email',
        emailValue: findContactItem(contactInfos, 'email')?.value_text || '',
        addressLabel: findContactItem(contactInfos, 'address')?.label || 'Địa chỉ',
        addressValue: findContactItem(contactInfos, 'address')?.value_text || '',
      });
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setContactLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadAllData();
    } else {
      setLoading(false);
    }
  }, [authenticated, loadAllData]);

  useEffect(() => {
    if (authenticated && activeTab === 'content') {
      loadContentEntity(contentEntity);
    }
  }, [authenticated, activeTab, contentEntity, loadContentEntity]);

  useEffect(() => {
    if (authenticated && activeTab === 'contact') {
      loadContactSettings();
    }
  }, [authenticated, activeTab, loadContactSettings]);

  async function handleUpload(file) {
    try {
      const uploaded = await uploadAdminFile(file);
      showNotice('Tải ảnh lên thành công.');
      return uploaded;
    } catch (uploadError) {
      setError(uploadError.message);
      throw uploadError;
    }
  }

  async function handleQuoteStatusChange(id, status) {
    try {
      const updated = await updateAdminQuoteStatus(id, status);
      setQuotes((current) => current.map((item) => (item.id === id ? updated : item)));
      await refreshOverview();
      showNotice('Đã cập nhật trạng thái yêu cầu.');
    } catch (updateError) {
      setError(updateError.message);
    }
  }

  async function handleUserSubmit(event) {
    event.preventDefault();

    const username = String(userForm.username || '').trim();
    const password = String(userForm.password || '').trim();
    const displayName = String(userForm.displayName || '').trim();

    if (!username || !password) {
      setError('Vui long nhap username va password cho tai khoan moi.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const created = await createAdminUser({
        username,
        password,
        displayName,
        role: userForm.role || 'admin',
      });

      setAdminUsers((current) => [created, ...current]);
      setUserForm(DEFAULT_USER_FORM);
      await refreshOverview();
      showNotice('Da tao tai khoan admin moi thanh cong.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleFaqSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = { ...faqForm, displayOrder: Number(faqForm.displayOrder) || 0 };

      if (editingFaqId) {
        const updated = await updateAdminFaq(editingFaqId, payload);
        setFaqs((current) => current.map((item) => (item.id === editingFaqId ? updated : item)));
        showNotice('Đã cập nhật câu hỏi thường gặp.');
      } else {
        const created = await createAdminFaq(payload);
        setFaqs((current) => [...current, created].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id));
        await refreshOverview();
        showNotice('Đã tạo câu hỏi thường gặp mới.');
      }

      setFaqForm(DEFAULT_FAQ_FORM);
      setEditingFaqId(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleFaqDelete(id) {
    try {
      await deleteAdminFaq(id);
      setFaqs((current) => current.filter((item) => item.id !== id));
      if (editingFaqId === id) {
        setEditingFaqId(null);
        setFaqForm(DEFAULT_FAQ_FORM);
      }
      await refreshOverview();
      showNotice('Đã xóa câu hỏi thường gặp.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function handleNewsSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = { ...newsForm, displayOrder: Number(newsForm.displayOrder) || 0 };

      if (editingNewsId) {
        const updated = await updateAdminNews(editingNewsId, payload);
        setNews((current) => current.map((item) => (item.id === editingNewsId ? updated : item)));
        showNotice('Đã cập nhật bài tin tức.');
      } else {
        const created = await createAdminNews(payload);
        setNews((current) => [...current, created].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id));
        await refreshOverview();
        showNotice('Đã tạo bài tin tức mới.');
      }

      setNewsForm(DEFAULT_NEWS_FORM);
      setEditingNewsId(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleNewsDelete(id) {
    try {
      await deleteAdminNews(id);
      setNews((current) => current.filter((item) => item.id !== id));
      if (editingNewsId === id) {
        setEditingNewsId(null);
        setNewsForm(DEFAULT_NEWS_FORM);
      }
      await refreshOverview();
      showNotice('Đã xóa bài tin tức.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function handleTypeSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = { ...typeForm, displayOrder: Number(typeForm.displayOrder) || 0 };

      if (editingTypeId) {
        const updated = await updateAdminInsuranceType(editingTypeId, payload);
        setInsuranceTypes((current) => current.map((item) => (item.id === editingTypeId ? updated : item)));
        showNotice('Đã cập nhật loại bảo hiểm.');
      } else {
        const created = await createAdminInsuranceType(payload);
        setInsuranceTypes((current) => [...current, created].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id));
        await refreshOverview();
        showNotice('Đã tạo loại bảo hiểm mới.');
      }

      setTypeForm(DEFAULT_TYPE_FORM);
      setEditingTypeId(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleTypeDelete(id) {
    try {
      await deleteAdminInsuranceType(id);
      setInsuranceTypes((current) => current.filter((item) => item.id !== id));
      if (editingTypeId === id) {
        setEditingTypeId(null);
        setTypeForm(DEFAULT_TYPE_FORM);
      }
      await refreshOverview();
      showNotice('Đã xóa loại bảo hiểm.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function handleContentSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);

      if (editingContentId) {
        const updated = await updateAdminContentEntityItem(contentEntity, editingContentId, contentForm);
        setContentItems((current) => current.map((item) => (item.id === editingContentId ? updated : item)));
        showNotice('Đã cập nhật nội dung.');
      } else {
        const created = await createAdminContentEntityItem(contentEntity, contentForm);
        setContentItems((current) => [...current, created]);
        showNotice('Đã tạo nội dung mới.');
      }

      setEditingContentId(null);
      setContentForm(createEmptyGenericForm(contentEntity));
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleContentDelete(id) {
    try {
      await deleteAdminContentEntityItem(contentEntity, id);
      setContentItems((current) => current.filter((item) => item.id !== id));
      if (editingContentId === id) {
        setEditingContentId(null);
        setContentForm(createEmptyGenericForm(contentEntity));
      }
      showNotice('Đã xóa nội dung.');
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function upsertPageSetting(sectionName, keyName, valueText) {
    const pageSettings = await fetchAdminContentEntity('page-settings');
    const existing = findSettingItem(pageSettings, sectionName, keyName);
    const payload = { section_name: sectionName, key_name: keyName, value_text: valueText };

    if (existing) {
      return updateAdminContentEntityItem('page-settings', existing.id, payload);
    }

    return createAdminContentEntityItem('page-settings', payload);
  }

  async function upsertContactInfo(contactType, label, valueText, displayOrder) {
    const contactInfos = await fetchAdminContentEntity('contact-infos');
    const existing = findContactItem(contactInfos, contactType);
    const payload = {
      contact_type: contactType,
      label,
      value_text: valueText,
      display_order: displayOrder,
    };

    if (existing) {
      return updateAdminContentEntityItem('contact-infos', existing.id, payload);
    }

    return createAdminContentEntityItem('contact-infos', payload);
  }

  async function handleContactSettingsSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      await Promise.all([
        upsertPageSetting('footer', 'brand_name', contactSettings.brandName),
        upsertPageSetting('footer', 'brand_subtitle', contactSettings.brandSubtitle),
        upsertPageSetting('footer', 'description', contactSettings.footerDescription),
        upsertPageSetting('footer', 'copyright', contactSettings.copyright),
        upsertPageSetting('banner', 'phone_number', contactSettings.hotline),
        upsertPageSetting('banner', 'support_text', contactSettings.supportText),
        upsertPageSetting('contact_support', 'zalo_url', contactSettings.zaloUrl),
        upsertPageSetting('contact_support', 'zalo_label', contactSettings.zaloLabel),
        upsertPageSetting('contact_support', 'facebook_url', contactSettings.facebookUrl),
        upsertPageSetting('contact_support', 'youtube_url', contactSettings.youtubeUrl),
        upsertPageSetting('contact_support', 'map_embed_url', contactSettings.mapEmbedUrl),
        upsertPageSetting('contact_support', 'map_title', contactSettings.mapTitle),
        upsertContactInfo('phone', contactSettings.phoneLabel, contactSettings.phoneValue, 1),
        upsertContactInfo('email', contactSettings.emailLabel, contactSettings.emailValue, 2),
        upsertContactInfo('address', contactSettings.addressLabel, contactSettings.addressValue, 3),
      ]);

      showNotice('Đã lưu cấu hình liên hệ và thông tin trang chính.');
      await loadContactSettings();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  }

  const sortedQuotes = useMemo(
    () => [...quotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [quotes]
  );
  const activeContentConfig = CONTENT_ENTITY_CONFIGS.find((item) => item.key === contentEntity);
  const groupedContentConfigs = useMemo(() => groupContentConfigs(), []);
  const activeTabLabel = TABS.find((tab) => tab.key === activeTab)?.label || 'Tổng quan';

  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} error={authError} loading={authLoading} />;
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-brand">DBV ADMIN</p>
          <h1 className="admin-title">Bảng điều khiển nội dung</h1>
          <p className="admin-subtitle">
            Theo dõi khách hàng, quản lý nội dung trang chủ, hình ảnh và các kênh hỗ trợ từ một nơi duy nhất.
          </p>
        </div>

        <nav className="admin-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`admin-tab ${activeTab === tab.key ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-actions">
          <a className="admin-back-link" href="/">
            Quay về website
          </a>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="admin-header-label">Khu vực quản trị</p>
            <h2 className="admin-header-title">{activeTabLabel}</h2>
          </div>
          <button type="button" className="admin-refresh" onClick={loadAllData}>
            Tải lại dữ liệu
          </button>
        </header>

        {loading && <div className="admin-message">Đang tải dữ liệu quản trị...</div>}
        {error && <div className="admin-message admin-message--error">{error}</div>}
        {notice && <div className="admin-message admin-message--success">{notice}</div>}

        {!loading && activeTab === 'overview' && overview && (
          <section className="admin-grid admin-grid--stats">
            <article className="admin-stat-card">
              <span className="admin-stat-label">Yêu cầu báo giá</span>
              <strong className="admin-stat-value">{overview.counts.quotes}</strong>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-label">Câu hỏi thường gặp</span>
              <strong className="admin-stat-value">{overview.counts.faqs}</strong>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-label">Bài tin tức</span>
              <strong className="admin-stat-value">{overview.counts.newsArticles}</strong>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-label">Loại bảo hiểm</span>
              <strong className="admin-stat-value">{overview.counts.insuranceTypes}</strong>
            </article>
            <article className="admin-panel admin-panel--wide">
              <h3>Phạm vi quản trị được bảo vệ</h3>
              <div className="admin-chip-list">
                {overview.quoteStatuses.map((status) => (
                  <span key={status} className="admin-chip">
                    {getStatusLabel(status)}
                  </span>
                ))}
              </div>
              <p className="admin-panel-note">
                Toàn bộ API quản trị và tính năng tải ảnh đều yêu cầu đăng nhập bằng token hợp lệ.
              </p>
            </article>
          </section>
        )}

        {!loading && activeTab === 'users' && (
          <section className="admin-grid">
            <form className="admin-panel admin-form" onSubmit={handleUserSubmit}>
              <h3>Tao tai khoan admin moi</h3>
              <p className="admin-panel-note">
                Dung muc nay de cap tai khoan admin cho nhan su hoac doi tac can truy cap khu quan tri.
              </p>
              <label>
                Ten hien thi
                <input
                  value={userForm.displayName}
                  onChange={(event) => setUserForm((current) => ({ ...current, displayName: event.target.value }))}
                />
              </label>
              <label>
                Username
                <input
                  value={userForm.username}
                  onChange={(event) => setUserForm((current) => ({ ...current, username: event.target.value }))}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
                />
              </label>
              <label>
                Role
                <select
                  className="admin-select"
                  value={userForm.role}
                  onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}
                >
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
              </label>
              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Dang tao...' : 'Tao tai khoan'}
                </button>
                <button type="button" className="admin-btn" onClick={() => setUserForm(DEFAULT_USER_FORM)}>
                  Lam moi form
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Danh sach tai khoan admin</h3>
              <div className="admin-list">
                {adminUsers.map((item) => (
                  <article key={item.id} className="admin-list-item">
                    <div>
                      <strong>{item.displayName || item.username}</strong>
                      <p>Username: {item.username}</p>
                      <span>Role: {item.role} | Trang thai: {item.isActive ? 'active' : 'inactive'}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && activeTab === 'quotes' && (
          <section className="admin-panel">
            <h3>Danh sách yêu cầu báo giá</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Loại bảo hiểm</th>
                    <th>Khu vực</th>
                    <th>Số điện thoại</th>
                    <th>Trạng thái</th>
                    <th>Thời gian tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>{quote.id}</td>
                      <td>{quote.insuranceTypeName}</td>
                      <td>{quote.licensePlateRegionName}</td>
                      <td>{quote.customerPhone}</td>
                      <td>
                        <select
                          value={quote.status}
                          className="admin-select"
                          onChange={(event) => handleQuoteStatusChange(quote.id, event.target.value)}
                        >
                          {(overview?.quoteStatuses || []).map((status) => (
                            <option key={status} value={status}>
                              {getStatusLabel(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{formatDateTime(quote.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {!loading && activeTab === 'contact' && (
          <section className="admin-grid admin-grid--contact">
            <form className="admin-panel admin-form" onSubmit={handleContactSettingsSubmit}>
              <h3>Cấu hình liên hệ trang chính</h3>
              <p className="admin-panel-note">
                Bạn có thể cập nhật hotline, email, địa chỉ, tên công ty, link Zalo và vị trí bản đồ sẽ hiển thị ngoài trang chủ.
              </p>

              <label>
                Tên thương hiệu
                <input
                  value={contactSettings.brandName}
                  onChange={(event) => setContactSettings((current) => ({ ...current, brandName: event.target.value }))}
                />
              </label>
              <label>
                Phụ đề thương hiệu
                <input
                  value={contactSettings.brandSubtitle}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, brandSubtitle: event.target.value }))
                  }
                />
              </label>
              <label>
                Mô tả chân trang
                <textarea
                  rows="4"
                  value={contactSettings.footerDescription}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, footerDescription: event.target.value }))
                  }
                />
              </label>
              <label>
                Hotline nổi bật
                <input
                  value={contactSettings.hotline}
                  onChange={(event) => setContactSettings((current) => ({ ...current, hotline: event.target.value }))}
                />
              </label>
              <label>
                Dòng mô tả hotline
                <input
                  value={contactSettings.supportText}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, supportText: event.target.value }))
                  }
                />
              </label>
              <label>
                Nhãn số điện thoại
                <input
                  value={contactSettings.phoneLabel}
                  onChange={(event) => setContactSettings((current) => ({ ...current, phoneLabel: event.target.value }))}
                />
              </label>
              <label>
                Số điện thoại liên hệ
                <input
                  value={contactSettings.phoneValue}
                  onChange={(event) => setContactSettings((current) => ({ ...current, phoneValue: event.target.value }))}
                />
              </label>
              <label>
                Nhãn email
                <input
                  value={contactSettings.emailLabel}
                  onChange={(event) => setContactSettings((current) => ({ ...current, emailLabel: event.target.value }))}
                />
              </label>
              <label>
                Email liên hệ
                <input
                  value={contactSettings.emailValue}
                  onChange={(event) => setContactSettings((current) => ({ ...current, emailValue: event.target.value }))}
                />
              </label>
              <label>
                Nhãn địa chỉ
                <input
                  value={contactSettings.addressLabel}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, addressLabel: event.target.value }))
                  }
                />
              </label>
              <label>
                Địa chỉ / tên đường / vị trí văn phòng
                <textarea
                  rows="4"
                  value={contactSettings.addressValue}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, addressValue: event.target.value }))
                  }
                />
              </label>
              <label>
                Link Zalo
                <input
                  value={contactSettings.zaloUrl}
                  onChange={(event) => setContactSettings((current) => ({ ...current, zaloUrl: event.target.value }))}
                />
              </label>
              <label>
                Nút Zalo hiển thị
                <input
                  value={contactSettings.zaloLabel}
                  onChange={(event) => setContactSettings((current) => ({ ...current, zaloLabel: event.target.value }))}
                />
              </label>
              <label>
                Link Facebook
                <input
                  placeholder="https://facebook.com/..."
                  value={contactSettings.facebookUrl}
                  onChange={(event) => setContactSettings((current) => ({ ...current, facebookUrl: event.target.value }))}
                />
              </label>
              <label>
                Link YouTube
                <input
                  placeholder="https://youtube.com/..."
                  value={contactSettings.youtubeUrl}
                  onChange={(event) => setContactSettings((current) => ({ ...current, youtubeUrl: event.target.value }))}
                />
              </label>
              <label>
                Tiêu đề bản đồ
                <input
                  value={contactSettings.mapTitle}
                  onChange={(event) => setContactSettings((current) => ({ ...current, mapTitle: event.target.value }))}
                />
              </label>
              <label>
                Link nhúng Google Maps
                <textarea
                  rows="4"
                  value={contactSettings.mapEmbedUrl}
                  onChange={(event) =>
                    setContactSettings((current) => ({ ...current, mapEmbedUrl: event.target.value }))
                  }
                />
              </label>
              <label>
                Dòng bản quyền
                <input
                  value={contactSettings.copyright}
                  onChange={(event) => setContactSettings((current) => ({ ...current, copyright: event.target.value }))}
                />
              </label>

              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving || contactLoading}>
                  {saving ? 'Đang lưu...' : 'Lưu cấu hình liên hệ'}
                </button>
                <button type="button" className="admin-btn" onClick={loadContactSettings} disabled={contactLoading}>
                  Tải lại dữ liệu
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Xem nhanh thông tin sẽ hiển thị</h3>
              <div className="admin-contact-preview">
                <div className="admin-contact-preview__item">
                  <span>Thương hiệu</span>
                  <strong>{contactSettings.brandName || 'Chưa có tên thương hiệu'}</strong>
                </div>
                <div className="admin-contact-preview__item">
                  <span>Hotline</span>
                  <strong>{contactSettings.hotline || contactSettings.phoneValue || 'Chưa có số điện thoại'}</strong>
                </div>
                <div className="admin-contact-preview__item">
                  <span>Email</span>
                  <strong>{contactSettings.emailValue || 'Chưa có email'}</strong>
                </div>
                <div className="admin-contact-preview__item">
                  <span>Địa chỉ</span>
                  <p>{contactSettings.addressValue || 'Chưa có địa chỉ'}</p>
                </div>
                <div className="admin-contact-preview__item">
                  <span>Liên kết Zalo</span>
                  <p>{contactSettings.zaloUrl || 'Chưa có link Zalo'}</p>
                </div>
                <div className="admin-contact-preview__item">
                  <span>Bản đồ</span>
                  <p>{contactSettings.mapTitle || 'Chưa có tiêu đề bản đồ'}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {!loading && activeTab === 'faqs' && (
          <section className="admin-grid">
            <form className="admin-panel admin-form" onSubmit={handleFaqSubmit}>
              <h3>{editingFaqId ? 'Chỉnh sửa câu hỏi' : 'Tạo câu hỏi mới'}</h3>
              <label>
                Câu hỏi
                <input
                  value={faqForm.question}
                  onChange={(event) => setFaqForm((current) => ({ ...current, question: event.target.value }))}
                />
              </label>
              <label>
                Câu trả lời
                <textarea
                  rows="5"
                  value={faqForm.answer}
                  onChange={(event) => setFaqForm((current) => ({ ...current, answer: event.target.value }))}
                />
              </label>
              <label>
                Thứ tự hiển thị
                <input
                  type="number"
                  value={faqForm.displayOrder}
                  onChange={(event) => setFaqForm((current) => ({ ...current, displayOrder: event.target.value }))}
                />
              </label>
              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Đang lưu...' : editingFaqId ? 'Cập nhật câu hỏi' : 'Tạo câu hỏi'}
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => {
                    setEditingFaqId(null);
                    setFaqForm(DEFAULT_FAQ_FORM);
                  }}
                >
                  Làm mới form
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Danh sách câu hỏi</h3>
              <div className="admin-list">
                {faqs.map((item) => (
                  <article key={item.id} className="admin-list-item">
                    <div>
                      <strong>{item.question}</strong>
                      <p>{item.answer}</p>
                      <span>Thứ tự: {item.displayOrder}</span>
                    </div>
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-btn"
                        onClick={() => {
                          setEditingFaqId(item.id);
                          setFaqForm({
                            question: item.question,
                            answer: item.answer,
                            displayOrder: item.displayOrder,
                          });
                        }}
                      >
                        Sửa
                      </button>
                      <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleFaqDelete(item.id)}>
                        Xóa
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && activeTab === 'news' && (
          <section className="admin-grid">
            <form className="admin-panel admin-form" onSubmit={handleNewsSubmit}>
              <h3>{editingNewsId ? 'Chỉnh sửa bài tin' : 'Tạo bài tin mới'}</h3>
              <label>
                Danh mục
                <input
                  value={newsForm.category}
                  onChange={(event) => setNewsForm((current) => ({ ...current, category: event.target.value }))}
                />
              </label>
              <label>
                Màu danh mục
                <input
                  value={newsForm.categoryColor}
                  onChange={(event) => setNewsForm((current) => ({ ...current, categoryColor: event.target.value }))}
                />
              </label>
              <label>
                Ngày đăng
                <input
                  value={newsForm.publishedAt}
                  onChange={(event) => setNewsForm((current) => ({ ...current, publishedAt: event.target.value }))}
                />
              </label>
              <label>
                Tiêu đề
                <input
                  value={newsForm.title}
                  onChange={(event) => setNewsForm((current) => ({ ...current, title: event.target.value }))}
                />
              </label>
              <label>
                Mô tả
                <textarea
                  rows="4"
                  value={newsForm.description}
                  onChange={(event) => setNewsForm((current) => ({ ...current, description: event.target.value }))}
                />
              </label>
              <UploadField
                label="Ảnh bài viết"
                value={newsForm.imageUrl}
                onChange={(value) => setNewsForm((current) => ({ ...current, imageUrl: value }))}
                onUpload={handleUpload}
                disabled={saving}
              />
              <label>
                Liên kết bài viết
                <input
                  value={newsForm.linkUrl}
                  onChange={(event) => setNewsForm((current) => ({ ...current, linkUrl: event.target.value }))}
                />
              </label>
              <label>
                Thứ tự hiển thị
                <input
                  type="number"
                  value={newsForm.displayOrder}
                  onChange={(event) => setNewsForm((current) => ({ ...current, displayOrder: event.target.value }))}
                />
              </label>
              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Đang lưu...' : editingNewsId ? 'Cập nhật bài tin' : 'Tạo bài tin'}
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => {
                    setEditingNewsId(null);
                    setNewsForm(DEFAULT_NEWS_FORM);
                  }}
                >
                  Làm mới form
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Danh sách bài tin</h3>
              <div className="admin-list">
                {news.map((item) => (
                  <article key={item.id} className="admin-list-item">
                    <div>
                      {isImageValue(item.imageUrl) && <img src={item.imageUrl} alt={item.title} className="admin-list-thumb" />}
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                      <span>
                        {item.category} | {item.publishedAt} | thứ tự {item.displayOrder}
                      </span>
                    </div>
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-btn"
                        onClick={() => {
                          setEditingNewsId(item.id);
                          setNewsForm({
                            category: item.category,
                            categoryColor: item.categoryColor,
                            publishedAt: item.publishedAt,
                            title: item.title,
                            description: item.description,
                            imageUrl: item.imageUrl,
                            linkUrl: item.linkUrl,
                            displayOrder: item.displayOrder,
                          });
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleNewsDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && activeTab === 'types' && (
          <section className="admin-grid">
            <form className="admin-panel admin-form" onSubmit={handleTypeSubmit}>
              <h3>{editingTypeId ? 'Chỉnh sửa loại bảo hiểm' : 'Tạo loại bảo hiểm mới'}</h3>
              <label>
                Slug
                <input
                  value={typeForm.slug}
                  onChange={(event) => setTypeForm((current) => ({ ...current, slug: event.target.value }))}
                />
              </label>
              <label>
                Tên loại bảo hiểm
                <input
                  value={typeForm.name}
                  onChange={(event) => setTypeForm((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
              <label>
                Mô tả
                <textarea
                  rows="4"
                  value={typeForm.description}
                  onChange={(event) => setTypeForm((current) => ({ ...current, description: event.target.value }))}
                />
              </label>
              <label>
                Mã biểu tượng
                <input
                  value={typeForm.iconKey}
                  onChange={(event) => setTypeForm((current) => ({ ...current, iconKey: event.target.value }))}
                />
              </label>
              <label>
                Thứ tự hiển thị
                <input
                  type="number"
                  value={typeForm.displayOrder}
                  onChange={(event) => setTypeForm((current) => ({ ...current, displayOrder: event.target.value }))}
                />
              </label>
              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Đang lưu...' : editingTypeId ? 'Cập nhật loại bảo hiểm' : 'Tạo loại bảo hiểm'}
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => {
                    setEditingTypeId(null);
                    setTypeForm(DEFAULT_TYPE_FORM);
                  }}
                >
                  Làm mới form
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Danh sách loại bảo hiểm</h3>
              <div className="admin-list">
                {insuranceTypes.map((item) => (
                  <article key={item.id} className="admin-list-item">
                    <div>
                      <strong>
                        {item.name} ({item.slug})
                      </strong>
                      <p>{item.description}</p>
                      <span>
                        iconKey: {item.iconKey} | thứ tự {item.displayOrder}
                      </span>
                    </div>
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-btn"
                        onClick={() => {
                          setEditingTypeId(item.id);
                          setTypeForm({
                            slug: item.slug,
                            name: item.name,
                            description: item.description,
                            iconKey: item.iconKey,
                            displayOrder: item.displayOrder,
                          });
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleTypeDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!loading && activeTab === 'content' && activeContentConfig && (
          <section className="admin-grid admin-grid--content">
            <div className="admin-panel admin-content-browser">
              <h3>Nhóm nội dung chính</h3>
              {Object.entries(groupedContentConfigs).map(([groupName, items]) => (
                <div key={groupName} className="admin-content-group">
                  <p className="admin-content-group__title">{GROUP_LABELS[groupName] || groupName}</p>
                  <div className="admin-content-group__items">
                    {items.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className={`admin-entity-card ${contentEntity === item.key ? 'admin-entity-card--active' : ''}`}
                        onClick={() => {
                          setContentEntity(item.key);
                          setEditingContentId(null);
                          setContentForm(createEmptyGenericForm(item.key));
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <form className="admin-panel admin-form" onSubmit={handleContentSubmit}>
              <h3>{editingContentId ? `Chỉnh sửa ${activeContentConfig.label}` : `Tạo ${activeContentConfig.label}`}</h3>
              <p className="admin-panel-note">
                Khu vực này dùng để quản lý khối trang chủ, footer, thiết lập hỗ trợ và các dữ liệu hiển thị chung.
              </p>
              {activeContentConfig.fields.map((field) =>
                field.upload ? (
                  <UploadField
                    key={field.key}
                    label={field.label}
                    value={contentForm[field.key] ?? ''}
                    onChange={(value) => setContentForm((current) => ({ ...current, [field.key]: value }))}
                    onUpload={handleUpload}
                    disabled={saving}
                  />
                ) : (
                  <label key={field.key}>
                    {field.label}
                    {field.type === 'textarea' ? (
                      <textarea
                        rows="4"
                        value={contentForm[field.key] ?? ''}
                        onChange={(event) =>
                          setContentForm((current) => ({ ...current, [field.key]: event.target.value }))
                        }
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        value={contentForm[field.key] ?? ''}
                        onChange={(event) =>
                          setContentForm((current) => ({ ...current, [field.key]: event.target.value }))
                        }
                      />
                    )}
                  </label>
                )
              )}
              <div className="admin-actions">
                <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                  {saving ? 'Đang lưu...' : editingContentId ? 'Cập nhật nội dung' : 'Tạo nội dung'}
                </button>
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => {
                    setEditingContentId(null);
                    setContentForm(createEmptyGenericForm(contentEntity));
                  }}
                >
                  Làm mới form
                </button>
              </div>
            </form>

            <div className="admin-panel">
              <h3>Danh sách {activeContentConfig.label.toLowerCase()}</h3>
              <div className="admin-list">
                {contentItems.map((item) => (
                  <article key={item.id} className="admin-list-item">
                    <div>
                      <strong>ID: {item.id}</strong>
                      {activeContentConfig.fields.map((field) => (
                        <div key={field.key} className="admin-field-row">
                          <span className="admin-field-name">{field.label}</span>
                          {isImageValue(item[field.key]) ? (
                            <img src={item[field.key]} alt={field.label} className="admin-list-thumb" />
                          ) : (
                            <p>{String(item[field.key] ?? '')}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-btn"
                        onClick={() => {
                          setEditingContentId(item.id);
                          setContentForm(
                            activeContentConfig.fields.reduce((acc, field) => {
                              acc[field.key] = item[field.key];
                              return acc;
                            }, {})
                          );
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleContentDelete(item.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminApp;
