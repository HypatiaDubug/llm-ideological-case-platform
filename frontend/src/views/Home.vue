<template>
  <div class="page home">
    <!-- 横幅 -->
    <div class="hero">
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <el-icon><MagicStick /></el-icon>大语言模型驱动 · AI 辅助、人工把关
        </div>
        <h1>基于大语言模型的<br />课程思政案例库信息化平台</h1>
        <p>汇聚优质课程思政案例，AI 赋能智慧备课，让专业教学与价值塑造同频共振。</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="$router.push('/cases')">
            <el-icon class="mr-4"><Search /></el-icon>浏览案例库
          </el-button>
          <el-button v-if="canAI" size="large" class="hero-btn" @click="$router.push('/ai-generate')">
            <el-icon class="mr-4"><MagicStick /></el-icon>AI 生成案例
          </el-button>
        </div>

        <!-- 平台数据 -->
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-num">{{ indexData.totalCases }}</div>
            <div class="stat-label">案例总数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-num">{{ indexData.collectedCaseCount }}</div>
            <div class="stat-label">网络采集案例</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-num">{{ indexData.totalTags }}</div>
            <div class="stat-label">思政标签</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-num">{{ indexData.totalAiGenerated }}</div>
            <div class="stat-label">AI 生成总量</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 平台优势 -->
    <div class="section">
      <div class="section-title">平台优势</div>
      <div class="feature-grid">
        <div class="feature-card card card-hover">
          <div class="feature-icon" style="background: linear-gradient(135deg, #409eff, #6a5af9)">
            <el-icon :size="24"><MagicStick /></el-icon>
          </div>
          <div class="feature-name">AI 智能生成</div>
          <div class="feature-desc">输入专业知识点与思政方向，AI 多稿生成、自动择优，一键产出高质量案例初稿，大幅降低备课门槛。</div>
        </div>
        <div class="feature-card card card-hover">
          <div class="feature-icon" style="background: linear-gradient(135deg, #67c23a, #36c99a)">
            <el-icon :size="24"><Search /></el-icon>
          </div>
          <div class="feature-name">多维度精准检索</div>
          <div class="feature-desc">关键词 + 思政标签 + 专业组合检索，语义匹配，快速定位教学所需案例。</div>
        </div>
        <div class="feature-card card card-hover">
          <div class="feature-icon" style="background: linear-gradient(135deg, #e6a23c, #f0a020)">
            <el-icon :size="24"><ChatDotRound /></el-icon>
          </div>
          <div class="feature-name">案例智能问答</div>
          <div class="feature-desc">针对任意案例提问，AI 基于案例内容流式解答并举证，帮助师生深度理解思政内涵。</div>
        </div>
        <div class="feature-card card card-hover">
          <div class="feature-icon" style="background: linear-gradient(135deg, #f56c6c, #ec5b5b)">
            <el-icon :size="24"><CircleCheck /></el-icon>
          </div>
          <div class="feature-name">规范共建与审核</div>
          <div class="feature-desc">来源可追溯、敏感词与价值观校验，管理员人工终审兜底，保障案例真实与价值观正确。</div>
        </div>
      </div>
    </div>

    <!-- 最新案例 -->
    <div class="section">
      <div class="section-header">
        <div class="section-title">最新案例</div>
        <el-button text type="primary" @click="$router.push('/cases')">更多 &gt;</el-button>
      </div>
      <div v-loading="loading" class="case-grid">
        <el-row :gutter="16">
          <el-col v-for="c in cases" :key="c.id" :xs="24" :sm="12" :md="8" class="col">
            <CaseCard :item="c" @detail="openDetail" @favorite="toggleFav" />
          </el-col>
        </el-row>
        <el-empty v-if="!loading && !cases.length" description="暂无案例" />
      </div>
    </div>

    <CaseDetailDialog v-model="detailVisible" :case-id="detailId" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getCaseListApi, getHomeIndexApi, addFavoriteApi, removeFavoriteApi } from '@/api'
import CaseCard from '@/components/CaseCard.vue'
import CaseDetailDialog from '@/components/CaseDetailDialog.vue'

const userStore = useUserStore()
const canAI = computed(() => userStore.canAI)

const cases = ref([])
const loading = ref(false)
const indexData = ref({ totalCases: 0, collectedCaseCount: 0, totalTags: 0, totalAiGenerated: 0 })
const detailVisible = ref(false)
const detailId = ref(null)

async function loadCases() {
  loading.value = true
  try {
    const res = await getCaseListApi({ sort: 'new', page: 1, size: 6 })
    if (res.code === 0) cases.value = res.data.records
  } finally {
    loading.value = false
  }
}

async function loadIndex() {
  const res = await getHomeIndexApi()
  if (res.code === 0) indexData.value = res.data
}

function openDetail(c) {
  detailId.value = c.id
  detailVisible.value = true
}

async function toggleFav(c) {
  if (c.isFavorite) {
    const res = await removeFavoriteApi(c.id)
    if (res.code === 0) c.isFavorite = false
  } else {
    const res = await addFavoriteApi(c.id)
    if (res.code === 0) c.isFavorite = true
  }
}

onMounted(() => {
  loadCases()
  loadIndex()
})
</script>

<style scoped>
.mr-4 {
  margin-right: 4px;
}

/* ===== 横幅 ===== */
.hero {
  border-radius: 16px;
  background: linear-gradient(120deg, #1e3a8a 0%, #3b82f6 55%, #60a5fa 100%);
  padding: 56px 48px 0;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
}
.hero-glow-1 {
  width: 320px;
  height: 320px;
  background: #60a5fa;
  top: -120px;
  right: -60px;
}
.hero-glow-2 {
  width: 240px;
  height: 240px;
  background: #6a5af9;
  bottom: 40px;
  right: 200px;
}
.hero-content {
  position: relative;
  z-index: 1;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  margin-bottom: 20px;
}
.hero-content h1 {
  font-size: 32px;
  line-height: 1.4;
  margin: 0 0 16px;
}
.hero-content p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.92);
  max-width: 560px;
  margin: 0;
  line-height: 1.7;
}
.hero-actions {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}
.hero-btn {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
}
.hero-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: #fff;
}
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 22px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}
.stat {
  text-align: center;
  flex: 1;
}
.stat-num {
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}
.stat-label {
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.82);
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
}

/* ===== 通用 ===== */
.section {
  margin-top: 32px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
  position: relative;
  padding-left: 12px;
}
.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  bottom: 2px;
  width: 4px;
  background: #409eff;
  border-radius: 2px;
}

/* ===== 平台优势 ===== */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.feature-card {
  padding: 22px 20px;
}
.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 14px;
}
.feature-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.feature-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.7;
}

/* ===== 最新案例 ===== */
.case-grid {
  min-height: 120px;
}
.col {
  margin-bottom: 16px;
}
</style>
