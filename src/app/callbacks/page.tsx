/**
 * Operator — ตั้งค่า Callback URL
 */
'use client'
import { useState } from 'react'
import { operatorApi } from '@/lib/api'

export default function CallbacksPage() {
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  const save = async () => {
    await operatorApi.updateCallbacks({ callback_url: url })
    setMessage('✅ บันทึก Callback URL สำเร็จ')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">📡 Callback URLs</h1>
      {message && <div className="bg-green-900/30 text-green-400 px-4 py-2 rounded-lg mb-4 text-sm">{message}</div>}
      <div className="bg-gray-800 rounded-xl p-5">
        <label className="text-gray-400 text-sm">Callback URL</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://your-site.com/api/lotto-callback"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-3 mt-1 mb-3" />
        <p className="text-gray-500 text-xs mb-4">Provider จะ POST ไปที่ URL นี้เมื่อมีผลแพ้ชนะ, เปิด/ปิดรอบ</p>
        <button onClick={save} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">บันทึก</button>
      </div>
    </div>
  )
}
