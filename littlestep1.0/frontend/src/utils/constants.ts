// 作业类、生活类、习惯类 - 展示用标签
export const CATEGORY_LABELS: Record<string, { title: string; tags?: string[]; icon?: string }> = {
  homework: { title: '作业类', tags: ['语文', '数学', '英语'], icon: '📚' },
  life: { title: '生活类', tags: ['运动', '家务', '休息'], icon: '🏠' },
  habit: { title: '习惯类', tags: ['眼保健操', '阅读'], icon: '🔁' },
}

export const CATEGORY_ORDER: string[] = ['homework', 'life', 'habit']
