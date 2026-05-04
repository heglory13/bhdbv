require('dotenv').config();

const path = require('path');
const cors = require('cors');
const express = require('express');
const {
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
} = require('./contentRepository');
const { createAdminToken, requireAdminAuth } = require('./auth');
const {
  createAdminUser,
  ensureAdminUsersTable,
  ensureDefaultAdminUser,
  listAdminUsers,
  verifyAdminCredentials,
} = require('./adminUsers');
const { upload, uploadsDir } = require('./uploads');

const app = express();
const adminRouter = express.Router();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function toDisplayOrder(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : 0;
}

function requireFields(res, payload, fields) {
  const missing = fields.filter((field) => !String(payload[field] ?? '').trim());

  if (missing.length > 0) {
    res.status(400).json({
      message: `Missing required fields: ${missing.join(', ')}`,
    });
    return false;
  }

  return true;
}

function validateQuotePayload(body) {
  const insuranceType = String(body.insuranceType || '').trim();
  const licensePlateRegion = String(body.licensePlateRegion || '').trim();
  const phoneNumber = String(body.phoneNumber || '').trim();

  if (!insuranceType || !licensePlateRegion || !phoneNumber) {
    return { error: 'Missing required data for quote request.' };
  }

  if (!/^(0|\+84)\d{9,10}$/.test(phoneNumber)) {
    return { error: 'Phone number is invalid.' };
  }

  return {
    value: {
      insuranceType,
      licensePlateRegion,
      phoneNumber,
      notes: String(body.notes || '').trim() || null,
    },
  };
}

function normalizeFaqPayload(body) {
  return {
    question: String(body.question || '').trim(),
    answer: String(body.answer || '').trim(),
    displayOrder: toDisplayOrder(body.displayOrder),
  };
}

function normalizeNewsPayload(body) {
  return {
    category: String(body.category || '').trim(),
    categoryColor: String(body.categoryColor || '').trim(),
    publishedAt: String(body.publishedAt || '').trim(),
    title: String(body.title || '').trim(),
    description: String(body.description || '').trim(),
    imageUrl: String(body.imageUrl || '').trim(),
    linkUrl: String(body.linkUrl || '').trim(),
    displayOrder: toDisplayOrder(body.displayOrder),
  };
}

function normalizeInsuranceTypePayload(body) {
  return {
    slug: String(body.slug || '').trim(),
    name: String(body.name || '').trim(),
    description: String(body.description || '').trim(),
    iconKey: String(body.iconKey || '').trim(),
    displayOrder: toDisplayOrder(body.displayOrder),
  };
}

app.get('/api/health', async (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/home-content', async (_req, res) => {
  try {
    const content = await getHomeContent();
    res.json(content);
  } catch (error) {
    console.error('Failed to load home content:', error);
    res.status(500).json({
      message: 'Failed to load home content.',
    });
  }
});

app.post('/api/quotes', async (req, res) => {
  const validation = validateQuotePayload(req.body || {});

  if (validation.error) {
    return res.status(400).json({ message: validation.error });
  }

  try {
    const quote = await createQuoteRequest(validation.value);

    res.status(201).json({
      message: 'Quote request recorded successfully. Our team will contact you soon.',
      data: quote,
    });
  } catch (error) {
    if (error.message === 'INVALID_INSURANCE_TYPE' || error.message === 'INVALID_LICENSE_PLATE_REGION') {
      return res.status(400).json({
        message: 'Insurance type or license plate region is invalid.',
      });
    }

    console.error('Failed to create quote request:', error);
    res.status(500).json({
      message: 'Failed to create quote request.',
    });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '').trim();

  try {
    const adminUser = await verifyAdminCredentials(username, password);

    if (!adminUser) {
      return res.status(401).json({
        message: 'Invalid admin username or password.',
      });
    }

    const token = createAdminToken(adminUser);
    return res.json({
      token,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        displayName: adminUser.display_name || adminUser.displayName,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('Failed to login admin user:', error);
    return res.status(500).json({
      message: 'Failed to login admin user.',
    });
  }
});

adminRouter.use(requireAdminAuth);

adminRouter.get('/overview', async (_req, res) => {
  try {
    const [quotes, faqs, news, insuranceTypes, adminUsers] = await Promise.all([
      listQuoteRequests(),
      listFaqs(),
      listNewsArticles(),
      listInsuranceTypes(),
      listAdminUsers(),
    ]);

    res.json({
      counts: {
        quotes: quotes.length,
        faqs: faqs.length,
        newsArticles: news.length,
        insuranceTypes: insuranceTypes.length,
        adminUsers: adminUsers.length,
      },
      quoteStatuses: QUOTE_STATUSES,
      adminEntities: Object.keys(ADMIN_ENTITIES),
    });
  } catch (error) {
    console.error('Failed to load admin overview:', error);
    res.status(500).json({ message: 'Failed to load admin overview.' });
  }
});

adminRouter.get('/users', async (_req, res) => {
  try {
    const users = await listAdminUsers();
    res.json(users);
  } catch (error) {
    console.error('Failed to list admin users:', error);
    res.status(500).json({ message: 'Failed to list admin users.' });
  }
});

adminRouter.post('/users', async (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '').trim();
  const displayName = String(req.body?.displayName || '').trim();
  const role = String(req.body?.role || 'admin').trim();

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.',
    });
  }

  try {
    const user = await createAdminUser(
      {
        username,
        password,
        displayName,
        role,
      },
      req.adminUser?.id || null
    );

    res.status(201).json(user);
  } catch (error) {
    if (error.message === 'ADMIN_USER_INVALID_PAYLOAD') {
      return res.status(400).json({ message: 'Admin user payload is invalid.' });
    }

    if (String(error.message || '').includes('duplicate key value')) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    console.error('Failed to create admin user:', error);
    res.status(500).json({ message: 'Failed to create admin user.' });
  }
});

adminRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File upload is required.' });
  }

  res.status(201).json({
    fileName: req.file.filename,
    originalName: req.file.originalname,
    fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  });
});

adminRouter.get('/content/:entity', async (req, res) => {
  try {
    const data = await listAdminEntityItems(req.params.entity);
    res.json(data);
  } catch (error) {
    if (error.message === 'ADMIN_ENTITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content entity not found.' });
    }

    console.error('Failed to list admin content entity:', error);
    res.status(500).json({ message: 'Failed to list admin content entity.' });
  }
});

adminRouter.post('/content/:entity', async (req, res) => {
  try {
    const data = await createAdminEntityItem(req.params.entity, req.body || {});
    res.status(201).json(data);
  } catch (error) {
    if (error.message === 'ADMIN_ENTITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content entity not found.' });
    }

    if (String(error.message || '').includes('duplicate key value')) {
      return res.status(409).json({ message: 'Duplicate data detected for this content item.' });
    }

    console.error('Failed to create admin content entity item:', error);
    res.status(500).json({ message: 'Failed to create admin content entity item.' });
  }
});

adminRouter.put('/content/:entity/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'Content item id is invalid.' });
  }

  try {
    const data = await updateAdminEntityItem(req.params.entity, id, req.body || {});
    res.json(data);
  } catch (error) {
    if (error.message === 'ADMIN_ENTITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content entity not found.' });
    }

    if (error.message === 'ADMIN_ENTITY_ITEM_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content item not found.' });
    }

    if (String(error.message || '').includes('duplicate key value')) {
      return res.status(409).json({ message: 'Duplicate data detected for this content item.' });
    }

    console.error('Failed to update admin content entity item:', error);
    res.status(500).json({ message: 'Failed to update admin content entity item.' });
  }
});

adminRouter.delete('/content/:entity/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'Content item id is invalid.' });
  }

  try {
    await deleteAdminEntityItem(req.params.entity, id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'ADMIN_ENTITY_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content entity not found.' });
    }

    if (error.message === 'ADMIN_ENTITY_ITEM_NOT_FOUND') {
      return res.status(404).json({ message: 'Admin content item not found.' });
    }

    console.error('Failed to delete admin content entity item:', error);
    res.status(500).json({ message: 'Failed to delete admin content entity item.' });
  }
});

adminRouter.get('/quotes', async (_req, res) => {
  try {
    const data = await listQuoteRequests();
    res.json(data);
  } catch (error) {
    console.error('Failed to list quote requests:', error);
    res.status(500).json({ message: 'Failed to list quote requests.' });
  }
});

adminRouter.patch('/quotes/:id/status', async (req, res) => {
  const id = parseId(req.params.id);
  const status = String(req.body?.status || '').trim();

  if (!id) {
    return res.status(400).json({ message: 'Quote request id is invalid.' });
  }

  if (!QUOTE_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `Status must be one of: ${QUOTE_STATUSES.join(', ')}`,
    });
  }

  try {
    const data = await updateQuoteStatus(id, status);
    res.json(data);
  } catch (error) {
    if (error.message === 'QUOTE_NOT_FOUND') {
      return res.status(404).json({ message: 'Quote request not found.' });
    }

    console.error('Failed to update quote status:', error);
    res.status(500).json({ message: 'Failed to update quote status.' });
  }
});

adminRouter.get('/faqs', async (_req, res) => {
  try {
    const data = await listFaqs();
    res.json(data);
  } catch (error) {
    console.error('Failed to list faqs:', error);
    res.status(500).json({ message: 'Failed to list faqs.' });
  }
});

adminRouter.post('/faqs', async (req, res) => {
  const payload = normalizeFaqPayload(req.body || {});

  if (!requireFields(res, payload, ['question', 'answer'])) {
    return;
  }

  try {
    const data = await createFaq(payload);
    res.status(201).json(data);
  } catch (error) {
    console.error('Failed to create faq:', error);
    res.status(500).json({ message: 'Failed to create faq.' });
  }
});

adminRouter.put('/faqs/:id', async (req, res) => {
  const id = parseId(req.params.id);
  const payload = normalizeFaqPayload(req.body || {});

  if (!id) {
    return res.status(400).json({ message: 'FAQ id is invalid.' });
  }

  if (!requireFields(res, payload, ['question', 'answer'])) {
    return;
  }

  try {
    const data = await updateFaq(id, payload);
    res.json(data);
  } catch (error) {
    if (error.message === 'FAQ_NOT_FOUND') {
      return res.status(404).json({ message: 'FAQ not found.' });
    }

    console.error('Failed to update faq:', error);
    res.status(500).json({ message: 'Failed to update faq.' });
  }
});

adminRouter.delete('/faqs/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'FAQ id is invalid.' });
  }

  try {
    await deleteFaq(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'FAQ_NOT_FOUND') {
      return res.status(404).json({ message: 'FAQ not found.' });
    }

    console.error('Failed to delete faq:', error);
    res.status(500).json({ message: 'Failed to delete faq.' });
  }
});

adminRouter.get('/news', async (_req, res) => {
  try {
    const data = await listNewsArticles();
    res.json(data);
  } catch (error) {
    console.error('Failed to list news articles:', error);
    res.status(500).json({ message: 'Failed to list news articles.' });
  }
});

adminRouter.post('/news', async (req, res) => {
  const payload = normalizeNewsPayload(req.body || {});

  if (!requireFields(res, payload, ['category', 'categoryColor', 'publishedAt', 'title', 'description', 'imageUrl', 'linkUrl'])) {
    return;
  }

  try {
    const data = await createNewsArticle(payload);
    res.status(201).json(data);
  } catch (error) {
    console.error('Failed to create news article:', error);
    res.status(500).json({ message: 'Failed to create news article.' });
  }
});

adminRouter.put('/news/:id', async (req, res) => {
  const id = parseId(req.params.id);
  const payload = normalizeNewsPayload(req.body || {});

  if (!id) {
    return res.status(400).json({ message: 'News article id is invalid.' });
  }

  if (!requireFields(res, payload, ['category', 'categoryColor', 'publishedAt', 'title', 'description', 'imageUrl', 'linkUrl'])) {
    return;
  }

  try {
    const data = await updateNewsArticle(id, payload);
    res.json(data);
  } catch (error) {
    if (error.message === 'NEWS_NOT_FOUND') {
      return res.status(404).json({ message: 'News article not found.' });
    }

    console.error('Failed to update news article:', error);
    res.status(500).json({ message: 'Failed to update news article.' });
  }
});

adminRouter.delete('/news/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'News article id is invalid.' });
  }

  try {
    await deleteNewsArticle(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NEWS_NOT_FOUND') {
      return res.status(404).json({ message: 'News article not found.' });
    }

    console.error('Failed to delete news article:', error);
    res.status(500).json({ message: 'Failed to delete news article.' });
  }
});

adminRouter.get('/insurance-types', async (_req, res) => {
  try {
    const data = await listInsuranceTypes();
    res.json(data);
  } catch (error) {
    console.error('Failed to list insurance types:', error);
    res.status(500).json({ message: 'Failed to list insurance types.' });
  }
});

adminRouter.post('/insurance-types', async (req, res) => {
  const payload = normalizeInsuranceTypePayload(req.body || {});

  if (!requireFields(res, payload, ['slug', 'name', 'description', 'iconKey'])) {
    return;
  }

  try {
    const data = await createInsuranceType(payload);
    res.status(201).json(data);
  } catch (error) {
    if (String(error.message || '').includes('duplicate key value')) {
      return res.status(409).json({ message: 'Insurance type slug already exists.' });
    }

    console.error('Failed to create insurance type:', error);
    res.status(500).json({ message: 'Failed to create insurance type.' });
  }
});

adminRouter.put('/insurance-types/:id', async (req, res) => {
  const id = parseId(req.params.id);
  const payload = normalizeInsuranceTypePayload(req.body || {});

  if (!id) {
    return res.status(400).json({ message: 'Insurance type id is invalid.' });
  }

  if (!requireFields(res, payload, ['slug', 'name', 'description', 'iconKey'])) {
    return;
  }

  try {
    const data = await updateInsuranceType(id, payload);
    res.json(data);
  } catch (error) {
    if (error.message === 'INSURANCE_TYPE_NOT_FOUND') {
      return res.status(404).json({ message: 'Insurance type not found.' });
    }

    if (String(error.message || '').includes('duplicate key value')) {
      return res.status(409).json({ message: 'Insurance type slug already exists.' });
    }

    console.error('Failed to update insurance type:', error);
    res.status(500).json({ message: 'Failed to update insurance type.' });
  }
});

adminRouter.delete('/insurance-types/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: 'Insurance type id is invalid.' });
  }

  try {
    await deleteInsuranceType(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'INSURANCE_TYPE_NOT_FOUND') {
      return res.status(404).json({ message: 'Insurance type not found.' });
    }

    console.error('Failed to delete insurance type:', error);
    res.status(500).json({ message: 'Failed to delete insurance type.' });
  }
});

app.use('/api/admin', adminRouter);

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

async function waitForDatabase(maxRetries = 10, delayMs = 3000) {
  const db = require('./db');
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await db.query('SELECT 1');
      console.log('Database connection established.');
      return;
    } catch (error) {
      console.log(`Database not ready (attempt ${attempt}/${maxRetries}): ${error.message}`);
      if (attempt === maxRetries) {
        throw new Error('Could not connect to database after multiple attempts.');
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function startServer() {
  await waitForDatabase();
  await ensureAdminUsersTable();
  await ensureDefaultAdminUser();

  app.listen(port, () => {
    console.log(`DBV backend listening on http://localhost:${port}`);
    console.log(`Uploads directory: ${path.relative(process.cwd(), uploadsDir)}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});
