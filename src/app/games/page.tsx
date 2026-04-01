/**
 * Operator — เปิด/ปิดประเภทหวย
 */
'use client'
import { useEffect, useState } from 'react'
import { operatorApi } from '@/lib/api'

interface Game { id: number; name: string; code: string; icon: string; enabled: boolean }

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => { operatorApi.listGames().then(res => setGames(res.data.data || [])) }, [])

  const toggle = async (id: number, current: boolean) => {
    await operatorApi.toggleGame(id, current ? 'disabled' : 'enabled')
    setGames(prev => prev.map(g => g.id === id ? { ...g, enabled: !current } : g))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">🎮 จัดการเกม</h1>
      <div className="space-y-3">
        {games.map(g => (
          <div key={g.id} className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{g.icon || '🎲'}</span>
              <div>
                <div className="text-white font-semibold">{g.name}</div>
                <div className="text-gray-500 text-xs">{g.code}</div>
              </div>
            </div>
            <button onClick={() => toggle(g.id, g.enabled)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition
                ${g.enabled ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
              {g.enabled ? 'เปิดอยู่' : 'ปิดอยู่'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
