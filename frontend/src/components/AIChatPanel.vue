<template>
  <div class="chat-panel">
    <div class="chat-header">
      <el-icon><ChatDotRound /></el-icon>
      <span>AI 问答</span>
      <span class="chat-sub">{{ title }}</span>
    </div>
    <div ref="msgBox" class="chat-body">
      <div v-for="(m, i) in messages" :key="i" class="msg-row" :class="m.role">
        <div class="msg-bubble">{{ m.content }}<span v-if="m.streaming" class="cursor">▋</span></div>
      </div>
    </div>
    <div class="chat-input">
      <el-input
        v-model="question"
        type="textarea"
        :rows="2"
        placeholder="针对当前案例提问，例如：这个案例体现了哪些思政元素？"
        :disabled="answering"
        @keyup.enter.exact.prevent="send"
      />
      <el-button type="primary" :loading="answering" :disabled="!question.trim()" @click="send">
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { chatAskApi } from '@/api'
import { ElMessage } from 'element-plus'

const props = defineProps({
  title: { type: String, default: '' },
  caseData: { type: Object, default: null },
})

const msgBox = ref(null)
const question = ref('')
const answering = ref(false)
const messages = ref([])

// 预置引导消息
messages.value.push({
  role: 'ai',
  content: `你好，我可以针对「${props.title || '当前案例'}」为你解答问题。你可以问我：这个案例体现了哪些思政元素？它在专业教学中有何价值？`,
})

async function send() {
  const q = question.value.trim()
  if (!q || answering.value) return
  question.value = ''
  messages.value.push({ role: 'user', content: q })
  messages.value.push({ role: 'ai', content: '', streaming: true })
  scrollToBottom()
  answering.value = true
  try {
    await chatAskApi(props.caseData, q, {
      onChunk: (seg, received) => {
        const last = messages.value[messages.value.length - 1]
        last.content = received
        scrollToBottom()
      },
    })
    const last = messages.value[messages.value.length - 1]
    last.streaming = false
  } catch (e) {
    ElMessage.error('问答失败，请稍后重试')
    messages.value.pop()
  } finally {
    answering.value = false
    scrollToBottom()
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (msgBox.value) msgBox.value.scrollTop = msgBox.value.scrollHeight
  })
}
</script>

<style scoped>
.chat-panel {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
}
.chat-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #f5f7fa;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}
.chat-sub {
  font-weight: 400;
  color: #909399;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 60%;
}
.chat-body {
  height: 320px;
  overflow-y: auto;
  padding: 12px;
  background: #fff;
}
.msg-row {
  display: flex;
  margin-bottom: 10px;
}
.msg-row.ai {
  justify-content: flex-start;
}
.msg-row.user {
  justify-content: flex-end;
}
.msg-bubble {
  max-width: 78%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
}
.msg-row.ai .msg-bubble {
  background: #f0f2f5;
  color: #303133;
}
.msg-row.user .msg-bubble {
  background: #409eff;
  color: #fff;
}
.cursor {
  color: #409eff;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #e4e7ed;
  background: #fafbfc;
  align-items: flex-end;
}
.chat-input .el-button {
  flex-shrink: 0;
}
</style>
