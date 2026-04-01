/**
 * API Client สำหรับ lotto-provider-backoffice-operator-web (#11)
 *
 * ความสัมพันธ์:
 * - เรียก API ของ: #9 lotto-provider-backoffice-api (port 9081, path /api/v1/operator/*)
 * - ใช้ Operator JWT token (ไม่ใช่ admin)
 * - Operator จัดการแค่ config ของตัวเอง (ไม่เห็นข้อมูล operator อื่น)
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

// ⭐ backoffice API port 9081, path /operator/*
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9081/api/v1/operator'

const createApiClient = (): AxiosInstance => {
  const client = axios.create({ baseURL: API_BASE_URL, timeout: 30000, headers: { 'Content-Type': 'application/json' } })
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('operator_token') : null
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
  })
  client.interceptors.response.use(r => r, err => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('operator_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  })
  return client
}

export const api = createApiClient()

// Operator Dashboard API — จัดการ config ของ operator ตัวเอง
export const operatorApi = {
  login: (data: { username: string; password: string }) => api.post('/auth/login', data),
  dashboard: () => api.get('/dashboard'),
  // API Keys
  listApiKeys: () => api.get('/api-keys'),
  regenerateApiKey: () => api.post('/api-keys/regenerate'),
  // Games — เปิด/ปิดประเภทหวย
  listGames: () => api.get('/games'),
  toggleGame: (id: number, status: string) => api.put(`/games/${id}/status`, { status }),
  // Bans — เลขอั้น per operator
  listBans: (p?: Record<string, unknown>) => api.get('/bans', { params: p }),
  createBan: (d: Record<string, unknown>) => api.post('/bans', d),
  deleteBan: (id: number) => api.delete(`/bans/${id}`),
  // Rates — rate per operator
  listRates: (p?: Record<string, unknown>) => api.get('/rates', { params: p }),
  updateRate: (id: number, d: Record<string, unknown>) => api.put(`/rates/${id}`, d),
  // Callbacks
  updateCallbacks: (d: Record<string, unknown>) => api.put('/callbacks', d),
  // IP Whitelist
  listIPs: () => api.get('/ip-whitelist'),
  addIP: (d: Record<string, unknown>) => api.post('/ip-whitelist', d),
  removeIP: (id: number) => api.delete(`/ip-whitelist/${id}`),
  // Reports
  reportSummary: (p?: Record<string, unknown>) => api.get('/reports/summary', { params: p }),
  reportBets: (p?: Record<string, unknown>) => api.get('/reports/bets', { params: p }),
}
