/**
 * Operator — จัดการ API Keys
 * ดู API Key + regenerate (Secret แสดงครั้งเดียว)
 */
'use client'
import { useState, useEffect } from 'react'
import { operatorApi } from '@/lib/api'

export default function APIKeysPage() {
  const [keys, setKeys] = useState<{ api_key: string; secret_key: string; created_at: string } | null>(null)
  const [newSecret, setNewSecret] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => { operatorApi.listApiKeys().then(res => setKeys(res.data.data)) }, [])

  const regenerate = async () => {
    if (!confirm('⚠️ API Key เดิมจะใช้ไม่ได้ทันที ต้องอัพเดทในระบบของคุณ ดำเนินการ?')) return
    const res = await operatorApi.regenerateApiKey()
    setNewSecret(res.data.data?.secret_key || '')
    setKeys(res.data.data)
    setMessage('✅ API Keys สร้างใหม่แล้ว — บันทึก Secret Key ไว้!')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">🔑 API Keys</h1>
      {message && <div className="bg-green-900/30 text-green-400 px-4 py-2 rounded-lg mb-4 text-sm">{message}</div>}
      {newSecret && (
        <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-4 mb-4">
          <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Secret Key ใหม่ — บันทึกไว้ จะแสดงครั้งเดียว</h3>
          <code className="text-white bg-gray-900 p-3 rounded block font-mono text-sm break-all">{newSecret}</code>
        </div>
      )}
      {keys && (
        <div className="bg-gray-800 rounded-xl p-5 space-y-4">
          <div>
            <label className="text-gray-400 text-sm">API Key</label>
            <div className="text-white font-mono bg-gray-700 rounded-lg px-4 py-3 mt-1 break-all">{keys.api_key}</div>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Secret Key</label>
            <div className="text-gray-500 font-mono bg-gray-700 rounded-lg px-4 py-3 mt-1">{keys.secret_key}</div>
          </div>
          <button onClick={regenerate} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700">
            สร้าง API Key ใหม่
          </button>
        </div>
      )}
    </div>
  )
}
