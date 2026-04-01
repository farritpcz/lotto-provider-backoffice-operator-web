/**
 * Operator — API Documentation (interactive)
 * แสดง Swagger/OpenAPI docs สำหรับ operator integrate
 */
'use client'

export default function APIDocsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">📚 API Documentation</h1>

      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Quick Start</h2>
        <div className="space-y-3 text-sm text-gray-300">
          <p>1. ดึง API Key + Secret จากหน้า <a href="/api-keys" className="text-blue-400">API Keys</a></p>
          <p>2. ทุก request ต้องมี headers:</p>
          <pre className="bg-gray-900 rounded-lg p-4 text-green-400 overflow-x-auto">{`X-API-Key: <your_api_key>
X-Signature: HMAC-SHA256(body + timestamp, secret_key)
X-Timestamp: <unix_timestamp>`}</pre>
          <p>3. เรียก <code className="text-yellow-400">POST /api/v1/games/launch</code> เพื่อสร้าง game URL สำหรับ player</p>
          <p>4. player เปิด URL ใน iframe → เล่นหวยได้ทันที</p>
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-4">
        <EndpointCard method="POST" path="/api/v1/wallet/balance" desc="ดึงยอดเงินของ player" />
        <EndpointCard method="POST" path="/api/v1/wallet/debit" desc="หักเงินจาก player (ตอนวางเดิมพัน)" />
        <EndpointCard method="POST" path="/api/v1/wallet/credit" desc="เติมเงินให้ player (ตอนชนะ)" />
        <EndpointCard method="POST" path="/api/v1/wallet/deposit" desc="โอนเงินเข้า provider (Transfer mode)" />
        <EndpointCard method="POST" path="/api/v1/wallet/withdraw" desc="โอนเงินออกจาก provider" />
        <EndpointCard method="GET" path="/api/v1/games" desc="รายการหวยทั้งหมด" />
        <EndpointCard method="GET" path="/api/v1/games/:id/rounds" desc="รอบที่เปิดรับแทง" />
        <EndpointCard method="POST" path="/api/v1/games/launch" desc="สร้าง game URL (iframe) + launch token" highlight />
        <EndpointCard method="GET" path="/api/v1/results" desc="ผลรางวัลล่าสุด" />
        <EndpointCard method="GET" path="/api/v1/reports/bets" desc="รายงานการเดิมพัน" />
      </div>

      <div className="bg-gray-800 rounded-xl p-6 mt-6">
        <h2 className="text-white font-semibold mb-4">Callbacks</h2>
        <p className="text-gray-300 text-sm mb-3">Provider จะ POST ไปยัง Callback URL ของคุณเมื่อ:</p>
        <div className="space-y-2">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <code className="text-yellow-400 text-sm">POST /bet-result</code>
            <p className="text-gray-400 text-xs mt-1">แจ้งผลแพ้ชนะ (player_id, bet_id, status, win_amount)</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <code className="text-yellow-400 text-sm">POST /round-start</code>
            <p className="text-gray-400 text-xs mt-1">แจ้งเมื่อรอบเปิดรับแทง</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <code className="text-yellow-400 text-sm">POST /round-end</code>
            <p className="text-gray-400 text-xs mt-1">แจ้งเมื่อรอบปิดรับแทง</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a href="https://github.com/farritpcz/lotto-provider-game-api/blob/master/docs/api-docs/openapi.yaml"
          target="_blank" rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          📄 ดู OpenAPI Spec ฉบับเต็ม
        </a>
      </div>
    </div>
  )
}

function EndpointCard({ method, path, desc, highlight }: { method: string; path: string; desc: string; highlight?: boolean }) {
  const methodColors: Record<string, string> = { GET: 'bg-green-600', POST: 'bg-blue-600', PUT: 'bg-yellow-600', DELETE: 'bg-red-600' }
  return (
    <div className={`bg-gray-800 rounded-lg p-4 flex items-center gap-4 ${highlight ? 'border-2 border-blue-500/50' : ''}`}>
      <span className={`${methodColors[method]} text-white text-xs font-bold px-3 py-1 rounded`}>{method}</span>
      <code className="text-white text-sm font-mono">{path}</code>
      <span className="text-gray-400 text-sm flex-1">{desc}</span>
      {highlight && <span className="text-blue-400 text-xs">⭐ สำคัญ</span>}
    </div>
  )
}
