const db = require('./db');

const SETTINGS_QUERY = `
  SELECT section_name, key_name, value_text
  FROM page_settings
  ORDER BY section_name, key_name
`;

const QUOTE_STATUSES = ['pending', 'contacted', 'completed', 'cancelled'];
const ADMIN_ENTITIES = {
  'page-settings': {
    tableName: 'page_settings',
    fields: ['section_name', 'key_name', 'value_text'],
    orderBy: 'section_name, key_name, id',
  },
  'navigation-links': {
    tableName: 'navigation_links',
    fields: ['label', 'href', 'display_order'],
    orderBy: 'display_order, id',
  },
  'license-plate-regions': {
    tableName: 'license_plate_regions',
    fields: ['slug', 'name', 'prefixes', 'display_order'],
    orderBy: 'display_order, id',
  },
  'why-choose-reasons': {
    tableName: 'why_choose_reasons',
    fields: ['title', 'description', 'icon_key', 'display_order'],
    orderBy: 'display_order, id',
  },
  stats: {
    tableName: 'stats',
    fields: ['number_text', 'label', 'icon_key', 'display_order'],
    orderBy: 'display_order, id',
  },
  benefits: {
    tableName: 'benefits',
    fields: ['title', 'description', 'icon_key', 'display_order'],
    orderBy: 'display_order, id',
  },
  'process-steps': {
    tableName: 'process_steps',
    fields: ['step_number', 'title', 'description', 'display_order'],
    orderBy: 'display_order, id',
  },
  testimonials: {
    tableName: 'testimonials',
    fields: ['name', 'location', 'review', 'avatar_key', 'rating', 'display_order'],
    orderBy: 'display_order, id',
  },
  'app-features': {
    tableName: 'app_features',
    fields: ['feature_text', 'display_order'],
    orderBy: 'display_order, id',
  },
  partners: {
    tableName: 'partners',
    fields: ['name', 'logo_key', 'website_url', 'display_order'],
    orderBy: 'display_order, id',
  },
  'footer-links': {
    tableName: 'footer_links',
    fields: ['section_title', 'label', 'href', 'display_order'],
    orderBy: 'section_title, display_order, id',
  },
  'contact-infos': {
    tableName: 'contact_infos',
    fields: ['contact_type', 'label', 'value_text', 'display_order'],
    orderBy: 'display_order, id',
  },
};

function groupSettings(rows) {
  return rows.reduce((acc, row) => {
    if (!acc[row.section_name]) {
      acc[row.section_name] = {};
    }

    acc[row.section_name][row.key_name] = row.value_text;
    return acc;
  }, {});
}

function looksMisencoded(value) {
  return typeof value === 'string' && /(?:Ã.|Â.|Ä.|áº|á»|ð)/.test(value);
}

function repairString(value) {
  if (!looksMisencoded(value)) {
    return value;
  }

  try {
    return Buffer.from(value, 'latin1').toString('utf8');
  } catch (_error) {
    return value;
  }
}

function repairData(value) {
  if (Array.isArray(value)) {
    return value.map(repairData);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairData(item)]));
  }

  if (typeof value === 'string') {
    return repairString(value);
  }

  return value;
}

function mapFooterLinks(rows) {
  return rows.reduce((acc, item) => {
    if (!acc[item.section_title]) {
      acc[item.section_title] = [];
    }

    acc[item.section_title].push({
      label: item.label,
      href: item.href,
    });

    return acc;
  }, {});
}

function mapInsuranceType(row) {
  return repairData({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    iconKey: row.icon_key,
    displayOrder: row.display_order,
  });
}

function mapFaq(row) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    displayOrder: row.display_order,
  };
}

function mapNewsArticle(row) {
  return {
    id: row.id,
    category: row.category,
    categoryColor: row.category_color,
    publishedAt: row.published_at,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    displayOrder: row.display_order,
  };
}

function mapQuote(row) {
  return {
    id: row.id,
    insuranceTypeSlug: row.insurance_type_slug,
    insuranceTypeName: row.insurance_type_name,
    licensePlateRegionSlug: row.license_plate_region_slug,
    licensePlateRegionName: row.license_plate_region_name,
    customerPhone: row.customer_phone,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
  };
}

function getAdminEntityConfig(entityName) {
  return ADMIN_ENTITIES[entityName] || null;
}

function normalizeAdminEntityPayload(entityName, payload) {
  const config = getAdminEntityConfig(entityName);

  if (!config) {
    throw new Error('ADMIN_ENTITY_NOT_FOUND');
  }

  return config.fields.reduce((acc, field) => {
    const value = payload[field];

    if (field === 'display_order' || field === 'rating') {
      const parsed = Number(value);
      acc[field] = Number.isFinite(parsed) ? parsed : 0;
      return acc;
    }

    acc[field] = String(value ?? '').trim();
    return acc;
  }, {});
}

async function getHomeContent() {
  const [
    settingsResult,
    navigationResult,
    insuranceTypesResult,
    regionsResult,
    reasonsResult,
    statsResult,
    benefitsResult,
    processStepsResult,
    faqsResult,
    testimonialsResult,
    appFeaturesResult,
    newsResult,
    partnersResult,
    footerLinksResult,
    contactsResult,
  ] = await Promise.all([
    db.query(SETTINGS_QUERY),
    db.query('SELECT label, href, display_order FROM navigation_links ORDER BY display_order'),
    db.query('SELECT id, slug, name, description, icon_key, display_order FROM insurance_types ORDER BY display_order'),
    db.query('SELECT slug, name, prefixes, display_order FROM license_plate_regions ORDER BY display_order'),
    db.query('SELECT title, description, icon_key, display_order FROM why_choose_reasons ORDER BY display_order'),
    db.query('SELECT number_text, label, icon_key, display_order FROM stats ORDER BY display_order'),
    db.query('SELECT title, description, icon_key, display_order FROM benefits ORDER BY display_order'),
    db.query('SELECT step_number, title, description, display_order FROM process_steps ORDER BY display_order'),
    db.query('SELECT id, question, answer, display_order FROM faqs ORDER BY display_order'),
    db.query('SELECT name, location, review, avatar_key, rating, display_order FROM testimonials ORDER BY display_order'),
    db.query('SELECT feature_text, display_order FROM app_features ORDER BY display_order'),
    db.query('SELECT id, category, category_color, published_at, title, description, image_url, link_url, display_order FROM news_articles ORDER BY display_order'),
    db.query('SELECT name, logo_key, website_url, display_order FROM partners ORDER BY display_order'),
    db.query('SELECT section_title, label, href, display_order FROM footer_links ORDER BY section_title, display_order'),
    db.query('SELECT contact_type, label, value_text, display_order FROM contact_infos ORDER BY display_order'),
  ]);

  const settings = groupSettings(settingsResult.rows);
  const footerLinks = mapFooterLinks(footerLinksResult.rows);

  return {
    navigationLinks: navigationResult.rows.map((row) => ({
      label: row.label,
      href: row.href,
    })),
    hero: settings.hero || {},
    quoteSection: settings.quote || {},
    whyChoose: {
      eyebrow: settings.why_choose?.eyebrow || '',
      heading: settings.why_choose?.heading || '',
      reasons: reasonsResult.rows,
    },
    stats: {
      items: statsResult.rows.map((row) => ({
        number: row.number_text,
        label: row.label,
        iconKey: row.icon_key,
      })),
    },
    products: {
      eyebrow: settings.products?.eyebrow || '',
      heading: settings.products?.heading || '',
      subheading: settings.products?.subheading || '',
      buttonText: settings.products?.button_text || '',
      items: insuranceTypesResult.rows.map((row) => ({
        slug: row.slug,
        label: 'Bao hiem',
        name: row.name,
        description: row.description,
        iconKey: row.icon_key,
      })),
    },
    quoteOptions: {
      insuranceTypes: insuranceTypesResult.rows.map((row) => ({
        slug: row.slug,
        name: row.name,
      })),
      licensePlateRegions: regionsResult.rows.map((row) => ({
        slug: row.slug,
        name: row.name,
        prefixes: row.prefixes,
      })),
    },
    benefits: {
      eyebrow: settings.benefits?.eyebrow || '',
      heading: settings.benefits?.heading || '',
      items: benefitsResult.rows.map((row) => ({
        title: row.title,
        description: row.description,
        iconKey: row.icon_key,
      })),
    },
    process: {
      eyebrow: settings.process?.eyebrow || '',
      heading: settings.process?.heading || '',
      steps: processStepsResult.rows.map((row) => ({
        number: row.step_number,
        title: row.title,
        description: row.description,
      })),
    },
    faqs: {
      eyebrow: settings.faq?.eyebrow || '',
      heading: settings.faq?.heading || '',
      items: faqsResult.rows.map(mapFaq),
    },
    testimonials: {
      eyebrow: settings.testimonials?.eyebrow || '',
      heading: settings.testimonials?.heading || '',
      items: testimonialsResult.rows.map((row) => ({
        name: row.name,
        location: row.location,
        review: row.review,
        avatarKey: row.avatar_key,
        rating: row.rating,
      })),
    },
    mobileApp: {
      eyebrow: settings.mobile_app?.eyebrow || '',
      heading: settings.mobile_app?.heading || '',
      appStoreText: settings.mobile_app?.app_store_text || '',
      googlePlayText: settings.mobile_app?.google_play_text || '',
      features: appFeaturesResult.rows.map((row) => row.feature_text),
    },
    news: {
      eyebrow: settings.news?.eyebrow || '',
      heading: settings.news?.heading || '',
      buttonText: settings.news?.button_text || '',
      items: newsResult.rows.map((row) => ({
        category: row.category,
        categoryColor: row.category_color,
        date: row.published_at,
        title: row.title,
        description: row.description,
        image: row.image_url,
        link: row.link_url,
      })),
    },
    partners: {
      heading: settings.partners?.heading || '',
      items: partnersResult.rows.map((row) => ({
        name: row.name,
        logoKey: row.logo_key,
        websiteUrl: row.website_url,
      })),
    },
    banner: settings.banner || {},
    contactSupport: {
      zaloUrl: settings.contact_support?.zalo_url || 'https://zalo.me/0901234567',
      zaloLabel: settings.contact_support?.zalo_label || 'Chat with Zalo',
      mapEmbedUrl:
        settings.contact_support?.map_embed_url ||
        'https://www.google.com/maps?q=Quan+1,+Ho+Chi+Minh+City&z=15&output=embed',
      mapTitle: settings.contact_support?.map_title || 'DBV office map',
    },
    footer: {
      brandName: settings.footer?.brand_name || '',
      brandSubtitle: settings.footer?.brand_subtitle || '',
      description: settings.footer?.description || '',
      copyright: settings.footer?.copyright || '',
      links: footerLinks,
      contacts: contactsResult.rows.map((row) => ({
        type: row.contact_type,
        label: row.label,
        value: row.value_text,
      })),
    },
  };
}

async function createQuoteRequest(payload) {
  const insuranceTypeResult = await db.query(
    'SELECT slug, name FROM insurance_types WHERE slug = $1 LIMIT 1',
    [payload.insuranceType]
  );

  if (insuranceTypeResult.rowCount === 0) {
    throw new Error('INVALID_INSURANCE_TYPE');
  }

  const regionResult = await db.query(
    'SELECT slug, name FROM license_plate_regions WHERE slug = $1 LIMIT 1',
    [payload.licensePlateRegion]
  );

  if (regionResult.rowCount === 0) {
    throw new Error('INVALID_LICENSE_PLATE_REGION');
  }

  const insertResult = await db.query(
    `
      INSERT INTO quote_requests (
        insurance_type_slug,
        insurance_type_name,
        license_plate_region_slug,
        license_plate_region_name,
        customer_phone,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, insurance_type_slug, insurance_type_name,
                license_plate_region_slug, license_plate_region_name,
                customer_phone, notes, status, created_at
    `,
    [
      insuranceTypeResult.rows[0].slug,
      insuranceTypeResult.rows[0].name,
      regionResult.rows[0].slug,
      regionResult.rows[0].name,
      payload.phoneNumber,
      payload.notes || null,
    ]
  );

  return insertResult.rows[0];
}

async function listQuoteRequests() {
  const result = await db.query(
    `
      SELECT id, insurance_type_slug, insurance_type_name, license_plate_region_slug,
             license_plate_region_name, customer_phone, notes, status, created_at
      FROM quote_requests
      ORDER BY created_at DESC, id DESC
    `
  );

  return repairData(result.rows.map(mapQuote));
}

async function updateQuoteStatus(id, status) {
  const result = await db.query(
    `
      UPDATE quote_requests
      SET status = $2
      WHERE id = $1
      RETURNING id, insurance_type_slug, insurance_type_name, license_plate_region_slug,
                license_plate_region_name, customer_phone, notes, status, created_at
    `,
    [id, status]
  );

  if (result.rowCount === 0) {
    throw new Error('QUOTE_NOT_FOUND');
  }

  return mapQuote(result.rows[0]);
}

async function listFaqs() {
  const result = await db.query('SELECT id, question, answer, display_order FROM faqs ORDER BY display_order, id');
  return repairData(result.rows.map(mapFaq));
}

async function createFaq(payload) {
  const result = await db.query(
    `
      INSERT INTO faqs (question, answer, display_order)
      VALUES ($1, $2, $3)
      RETURNING id, question, answer, display_order
    `,
    [payload.question, payload.answer, payload.displayOrder]
  );

  return repairData(mapFaq(result.rows[0]));
}

async function updateFaq(id, payload) {
  const result = await db.query(
    `
      UPDATE faqs
      SET question = $2,
          answer = $3,
          display_order = $4
      WHERE id = $1
      RETURNING id, question, answer, display_order
    `,
    [id, payload.question, payload.answer, payload.displayOrder]
  );

  if (result.rowCount === 0) {
    throw new Error('FAQ_NOT_FOUND');
  }

  return repairData(mapFaq(result.rows[0]));
}

async function deleteFaq(id) {
  const result = await db.query('DELETE FROM faqs WHERE id = $1 RETURNING id', [id]);

  if (result.rowCount === 0) {
    throw new Error('FAQ_NOT_FOUND');
  }
}

async function listNewsArticles() {
  const result = await db.query(
    `
      SELECT id, category, category_color, published_at, title, description, image_url, link_url, display_order
      FROM news_articles
      ORDER BY display_order, id
    `
  );

  return repairData(result.rows.map(mapNewsArticle));
}

async function createNewsArticle(payload) {
  const result = await db.query(
    `
      INSERT INTO news_articles (
        category, category_color, published_at, title, description, image_url, link_url, display_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, category, category_color, published_at, title, description, image_url, link_url, display_order
    `,
    [
      payload.category,
      payload.categoryColor,
      payload.publishedAt,
      payload.title,
      payload.description,
      payload.imageUrl,
      payload.linkUrl,
      payload.displayOrder,
    ]
  );

  return repairData(mapNewsArticle(result.rows[0]));
}

async function updateNewsArticle(id, payload) {
  const result = await db.query(
    `
      UPDATE news_articles
      SET category = $2,
          category_color = $3,
          published_at = $4,
          title = $5,
          description = $6,
          image_url = $7,
          link_url = $8,
          display_order = $9
      WHERE id = $1
      RETURNING id, category, category_color, published_at, title, description, image_url, link_url, display_order
    `,
    [
      id,
      payload.category,
      payload.categoryColor,
      payload.publishedAt,
      payload.title,
      payload.description,
      payload.imageUrl,
      payload.linkUrl,
      payload.displayOrder,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error('NEWS_NOT_FOUND');
  }

  return repairData(mapNewsArticle(result.rows[0]));
}

async function deleteNewsArticle(id) {
  const result = await db.query('DELETE FROM news_articles WHERE id = $1 RETURNING id', [id]);

  if (result.rowCount === 0) {
    throw new Error('NEWS_NOT_FOUND');
  }
}

async function listInsuranceTypes() {
  const result = await db.query(
    'SELECT id, slug, name, description, icon_key, display_order FROM insurance_types ORDER BY display_order, id'
  );

  return repairData(result.rows.map(mapInsuranceType));
}

async function createInsuranceType(payload) {
  const result = await db.query(
    `
      INSERT INTO insurance_types (slug, name, description, icon_key, display_order)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, slug, name, description, icon_key, display_order
    `,
    [payload.slug, payload.name, payload.description, payload.iconKey, payload.displayOrder]
  );

  return repairData(mapInsuranceType(result.rows[0]));
}

async function updateInsuranceType(id, payload) {
  const result = await db.query(
    `
      UPDATE insurance_types
      SET slug = $2,
          name = $3,
          description = $4,
          icon_key = $5,
          display_order = $6
      WHERE id = $1
      RETURNING id, slug, name, description, icon_key, display_order
    `,
    [id, payload.slug, payload.name, payload.description, payload.iconKey, payload.displayOrder]
  );

  if (result.rowCount === 0) {
    throw new Error('INSURANCE_TYPE_NOT_FOUND');
  }

  return repairData(mapInsuranceType(result.rows[0]));
}

async function deleteInsuranceType(id) {
  const result = await db.query('DELETE FROM insurance_types WHERE id = $1 RETURNING id', [id]);

  if (result.rowCount === 0) {
    throw new Error('INSURANCE_TYPE_NOT_FOUND');
  }
}

async function listAdminEntityItems(entityName) {
  const config = getAdminEntityConfig(entityName);

  if (!config) {
    throw new Error('ADMIN_ENTITY_NOT_FOUND');
  }

  const result = await db.query(
    `SELECT id, ${config.fields.join(', ')} FROM ${config.tableName} ORDER BY ${config.orderBy}`
  );

  return repairData(result.rows);
}

async function createAdminEntityItem(entityName, payload) {
  const config = getAdminEntityConfig(entityName);

  if (!config) {
    throw new Error('ADMIN_ENTITY_NOT_FOUND');
  }

  const normalizedPayload = normalizeAdminEntityPayload(entityName, payload);
  const columns = config.fields.join(', ');
  const placeholders = config.fields.map((_, index) => `$${index + 1}`).join(', ');
  const values = config.fields.map((field) => normalizedPayload[field]);

  const result = await db.query(
    `INSERT INTO ${config.tableName} (${columns}) VALUES (${placeholders}) RETURNING id, ${columns}`,
    values
  );

  return repairData(result.rows[0]);
}

async function updateAdminEntityItem(entityName, id, payload) {
  const config = getAdminEntityConfig(entityName);

  if (!config) {
    throw new Error('ADMIN_ENTITY_NOT_FOUND');
  }

  const normalizedPayload = normalizeAdminEntityPayload(entityName, payload);
  const assignments = config.fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const values = [id, ...config.fields.map((field) => normalizedPayload[field])];

  const result = await db.query(
    `UPDATE ${config.tableName} SET ${assignments} WHERE id = $1 RETURNING id, ${config.fields.join(', ')}`,
    values
  );

  if (result.rowCount === 0) {
    throw new Error('ADMIN_ENTITY_ITEM_NOT_FOUND');
  }

  return repairData(result.rows[0]);
}

async function deleteAdminEntityItem(entityName, id) {
  const config = getAdminEntityConfig(entityName);

  if (!config) {
    throw new Error('ADMIN_ENTITY_NOT_FOUND');
  }

  const result = await db.query(`DELETE FROM ${config.tableName} WHERE id = $1 RETURNING id`, [id]);

  if (result.rowCount === 0) {
    throw new Error('ADMIN_ENTITY_ITEM_NOT_FOUND');
  }
}

module.exports = {
  ADMIN_ENTITIES,
  QUOTE_STATUSES,
  getHomeContent,
  createQuoteRequest,
  listQuoteRequests,
  updateQuoteStatus,
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  listNewsArticles,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  listInsuranceTypes,
  createInsuranceType,
  updateInsuranceType,
  deleteInsuranceType,
  listAdminEntityItems,
  createAdminEntityItem,
  updateAdminEntityItem,
  deleteAdminEntityItem,
};
