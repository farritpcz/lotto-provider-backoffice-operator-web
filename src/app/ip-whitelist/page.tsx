/**
 * Operator — จัดการ IP Whitelist
 */
'use client'
import { useEffect, useState } from 'react'
import { operatorApi } from '@/lib/api'

export default function IPWhitelistPage() {
  const [ips, setIps] = useState('')
  const [newIP, setNewIP] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => { operatorApi.listIPs().then(res => setIps(res.data.data?.ip_whitelist || '')) }, [message])

  const addIP = async () => {
    if (!newIP) return
    await operatorApi.addIP({ ip: newIP })
    setMessage(`✅ เพิ่ม IP ${newIP} แล้ว`)
    setNewIP('')
  }

  const ipList = ips ? ips.split(',').map((ip: string) => ip.trim()).filter(Boolean) : []

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">🔒 IP Whitelist</h1>
      {message && <div className="bg-green-900/30 text-green-400 px-4 py-2 rounded-lg mb-4 text-sm">{message}</div>}

      <div className="bg-gray-800 rounded-xl p-4 mb-6 flex gap-3">
        <input type="text" value={newIP} onChange={e => setNewIP(e.target.value)} placeholder="เช่น 203.154.x.x"
          className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-4 py-2" />
        <button onClick={addIP} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">เพิ่ม IP</button>
      </div>

      <div className="space-y-2">
        {ipList.length === 0 ? (
          <div className="text-gray-500 text-center py-6">ยังไม่มี IP — อนุญาตทุก IP</div>
        ) : ipList.map((ip: string, i: number) => (
          <div key={i} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
            <span className="text-white font-mono">{ip}</span>
            <button className="text-red-400 text-sm hover:text-red-300">ลบ</button>
          </div>
        ))}
      </div>
    </div>
  )
}
