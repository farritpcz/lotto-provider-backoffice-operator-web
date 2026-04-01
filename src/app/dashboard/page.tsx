/**
 * Operator Dashboard — stats ของ operator ตัวเอง
 * เรียก API: operatorApi.dashboard() → backoffice-api (#9) /operator/dashboard
 */
'use client'
import { useEffect, useState } from 'react'
import { operatorApi } from '@/lib/api'

export default function OperatorDashboard() {
  const [stats, setStats] = useState({
    total_members: 0, total_bets_today: 0, total_amount_today: 0, total_win_today: 0, profit_today: 0,
  })
  useEffect(() => { operatorApi.dashboard().then(res => setStats(res.data.data || {})) }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Operator Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card label="สมาชิก" value={stats.total_members} color="blue" />
        <Card label="Bets วันนี้" value={stats.total_bets_today} color="purple" />
        <Card label="ยอดแทง" value={`฿${stats.total_amount_today.toLocaleString()}`} color="yellow" />
        <Card label="จ่ายรางวัล" value={`฿${stats.total_win_today.toLocaleString()}`} color="red" />
        <Card label="กำไร" value={`฿${stats.profit_today.toLocaleString()}`} color={stats.profit_today >= 0 ? 'green' : 'red'} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <NavCard href="/api-keys" icon="🔑" label="API Keys" />
        <NavCard href="/games" icon="🎮" label="จัดการเกม" />
        <NavCard href="/bans" icon="🚫" label="เลขอั้น" />
        <NavCard href="/rates" icon="💰" label="อัตราจ่าย" />
        <NavCard href="/callbacks" icon="📡" label="Callbacks" />
        <NavCard href="/ip-whitelist" icon="🔒" label="IP Whitelist" />
        <NavCard href="/reports" icon="📊" label="รายงาน" />
      </div>
    </div>
  )
}

function Card({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    blue: 'border-blue-500/30 text-blue-400', green: 'border-green-500/30 text-green-400',
    red: 'border-red-500/30 text-red-400', purple: 'border-purple-500/30 text-purple-400',
    yellow: 'border-yellow-500/30 text-yellow-400',
  }
  return (
    <div className={`bg-gray-800 border rounded-xl p-4 ${colors[color]}`}>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  )
}

function NavCard({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a href={href} className="bg-gray-800 hover:bg-gray-700 rounded-xl p-4 text-center transition">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-white text-sm">{label}</div>
    </a>
  )
}
