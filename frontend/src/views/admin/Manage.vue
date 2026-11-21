<template>
  <div>
    <!-- 思政标签（FR-42） -->
    <div class="card">
      <div class="block-header">
        <span class="block-title">思政标签管理</span>
        <el-button type="primary" size="small" @click="tagDialogVisible = true">
          <el-icon class="mr-4"><Plus /></el-icon>新增标签
        </el-button>
      </div>
      <el-table :data="tags" stripe :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column label="标签名称" prop="name" min-width="180" />
        <el-table-column label="使用量" prop="useCount" width="100" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 0 ? 'info' : 'success'" size="small">
              {{ row.status === 0 ? '已停用' : '启用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="140" />
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button size="small" plain @click="toggleTag(row)">
              {{ row.status === 0 ? '启用' : '停用' }}
            </el-button>
            <el-button size="small" type="danger" plain @click="removeTag(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 专业字典（FR-43） -->
    <div class="card" style="margin-top: 16px">
      <div class="block-header">
        <span class="block-title">专业管理</span>
        <el-button type="primary" size="small" @click="proDialogVisible = true">
          <el-icon class="mr-4"><Plus /></el-icon>新增专业
        </el-button>
      </div>
      <el-table :data="professions" stripe :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column label="专业名称" prop="name" min-width="200" />
        <el-table-column label="关联案例数" prop="caseCount" width="120" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 0 ? 'info' : 'success'" size="small">
              {{ row.status === 0 ? '已停用' : '启用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button size="small" plain @click="toggleProfession(row)">
              {{ row.status === 0 ? '启用' : '停用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增标签弹窗 -->
    <el-dialog v-model="tagDialogVisible" title="新增思政标签" width="480px">
      <el-form :model="tagForm" label-width="80px">
        <el-form-item label="标签名称">
          <el-input v-model="tagForm.name" placeholder="请输入思政标签名称，如：诚信教育" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="tagDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTag">保存</el-button>
      </template>
    </el-dialog>

    <!-- 新增专业弹窗 -->
    <el-dialog v-model="proDialogVisible" title="新增专业" width="480px">
      <el-form :model="proForm" label-width="80px">
        <el-form-item label="专业名称">
          <el-input v-model="proForm.name" placeholder="请输入专业名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="proDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProfession">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getTagListApi,
  addTagApi,
  updateTagApi,
  deleteTagApi,
  getProfessionListApi,
  addProfessionApi,
  updateProfessionApi,
} from '@/api'

const tags = ref([])
const professions = ref([])

async function loadAll() {
  const [t, p] = await Promise.all([getTagListApi(), getProfessionListApi()])
  tags.value = t.data || []
  professions.value = p.data || []
}

// ===== 思政标签 =====
const tagDialogVisible = ref(false)
const tagForm = ref({ name: '' })
async function saveTag() {
  if (!tagForm.value.name) {
    ElMessage.warning('请输入标签名称')
    return
  }
  const res = await addTagApi(tagForm.value)
  if (res.code === 0) {
    ElMessage.success('已新增')
    tagDialogVisible.value = false
    tagForm.value = { name: '' }
    loadAll()
  }
}
async function toggleTag(row) {
  const res = await updateTagApi(row.id, { status: row.status === 0 ? 1 : 0 })
  if (res.code === 0) {
    ElMessage.success(row.status === 0 ? '已启用' : '已停用（不影响历史关联）')
    loadAll()
  }
}
async function removeTag(row) {
  try {
    await ElMessageBox.confirm(`确定删除标签「${row.name}」吗？`, '提示', { type: 'warning' })
  } catch {
    return
  }
  const res = await deleteTagApi(row.id)
  if (res.code === 0) {
    ElMessage.success('已删除')
    loadAll()
  }
}

// ===== 专业字典 =====
const proDialogVisible = ref(false)
const proForm = ref({ name: '' })
async function saveProfession() {
  if (!proForm.value.name) {
    ElMessage.warning('请输入专业名称')
    return
  }
  const res = await addProfessionApi(proForm.value)
  if (res.code === 0) {
    ElMessage.success('已新增')
    proDialogVisible.value = false
    proForm.value = { name: '' }
    loadAll()
  } else {
    ElMessage.error(res.message)
  }
}
async function toggleProfession(row) {
  const res = await updateProfessionApi(row.id, { status: row.status === 0 ? 1 : 0 })
  if (res.code === 0) {
    ElMessage.success(row.status === 0 ? '已启用' : '已停用（不影响历史关联）')
    loadAll()
  }
}

onMounted(loadAll)
</script>

<style scoped>
.mr-4 {
  margin-right: 4px;
}
.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.block-title {
  font-size: 16px;
  font-weight: 600;
}
</style>
