import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Minus,
  RotateCcw,
  Send,
  Square,
  BookOpen,
} from "lucide-react";

// ============================================================================
// KONFIGURASI ENDPOINT CHATBOT BACKEND (FASTAPI / SSE STREAMING)
// Sesuai konfigurasi reverse proxy: http://chatbot.akbarwibisono.my.id
// Cloudflare CDN mendukung HTTPS secara otomatis.
// ============================================================================
export const CHATBOT_API_URL = "https://chatbot.akbarwibisono.my.id/api/chat";
export const CHATBOT_HEALTH_URL = "https://chatbot.akbarwibisono.my.id/api/health";

// Pesan sambutan awal
const INITIAL_MESSAGES = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Halo! Saya **Layanan Informasi SKADUTA**, asisten digital resmi SMK Negeri 2 Yogyakarta. Ada yang bisa saya bantu terkait jurusan/konsentrasi keahlian, SPMB, profil sekolah, atau fasilitas?",
    time: "Baru saja",
  },
];

// Id unik untuk pesan (di luar scope komponen agar lint purity tetap bersih)
const generateMessageId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function ChatbotBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking"); // 'online' | 'offline' | 'checking'
  const [serverModel, setServerModel] = useState("qwen2.5:1.5b");

  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Cek status kesehatan backend saat pertama kali dibuka
  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        // Coba HTTPS dulu, jika gagal coba endpoint relatif /api/health (vite proxy)
        let res;
        try {
          res = await fetch(CHATBOT_HEALTH_URL, { method: "GET" });
        } catch {
          res = await fetch("/api/health", { method: "GET" });
        }

        if (res && res.ok) {
          const data = await res.json();
          if (isMounted) {
            setServerStatus("online");
            if (data.model) setServerModel(data.model);
          }
        } else {
          if (isMounted) setServerStatus("online"); // fallback
        }
      } catch {
        if (isMounted) setServerStatus("online");
      }
    };

    checkHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto scroll ke bawah saat pesan baru masuk
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Fokuskan input saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Format teks markdown sederhana (bold, list, paragraf)
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      // Bold replacement: **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs leading-relaxed">
            {formattedLine}
          </li>
        );
      }

      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <div key={idx} className="ml-2 text-xs leading-relaxed">
            {formattedLine}
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  // Prettify nama file sumber RAG (misal: "05-jurusan-sija.md" -> "Jurusan SIJA")
  const formatSourceTitle = (filename) => {
    if (!filename) return "";
    return filename
      .replace(/^\d+-/, "")
      .replace(/\.md$/, "")
      .replace(/-/g, " ")
      .toUpperCase();
  };

  // Kirim pesan ke API SSE Backend
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isStreaming) return;

    setInputVal("");

    const userMessageId = generateMessageId("user");
    const botMessageId = generateMessageId("bot");

    const newUserMessage = {
      id: userMessageId,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const initialBotMessage = {
      id: botMessageId,
      role: "assistant",
      content: "",
      sources: null,
      meta: null,
      isStreaming: true,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage, initialBotMessage]);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Coba panggil HTTPS dulu, jika gagal koneksi coba endpoint proxy /api/chat
      let response;
      try {
        response = await fetch(CHATBOT_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: abortController.signal,
        });
      } catch {
        // Fallback panggil via /api/chat (proxy Vite / reverse proxy Nginx)
        response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: abortController.signal,
        });
      }

      if (!response.ok) {
        throw new Error(`Server status: ${response.status} (${response.statusText})`);
      }

      if (!response.body) {
        throw new Error("Response body tidak tersedia untuk streaming SSE.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const data = JSON.parse(jsonStr);

            // Abaikan paket ping
            if (data.ping) continue;

            // Update metadata RAG jika ada
            if (data.meta) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? {
                        ...m,
                        meta: data.meta,
                        sources: data.meta.sources
                          ? data.meta.sources.split(",").map((s) => s.trim())
                          : m.sources,
                      }
                    : m
                )
              );
            }

            // Tambahkan potongan teks streaming
            if (data.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? { ...m, content: m.content + data.text }
                    : m
                )
              );
            }

            // Ketika respons selesai
            if (data.done) {
              let finalSources = null;
              if (data.sources) {
                finalSources = data.sources.split(",").map((s) => s.trim());
              }

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMessageId
                    ? {
                        ...m,
                        isStreaming: false,
                        sources: finalSources || m.sources,
                      }
                    : m
                )
              );
            }
          } catch (err) {
            console.warn("Gagal parse chunk SSE:", jsonStr, err);
          }
        }
      }

      // Pastikan flag streaming dimatikan di akhir
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err) {
      if (err.name === "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  isStreaming: false,
                  content:
                    m.content ||
                    "*(Respons dihentikan oleh pengguna)*",
                }
              : m
          )
        );
      } else {
        console.error("Kesalahan koneksi Chatbot:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId
              ? {
                  ...m,
                  isStreaming: false,
                  error: true,
                  content:
                    m.content ||
                    "Maaf, terjadi kendala saat menghubungkan ke server chatbot. Silakan periksa koneksi atau coba beberapa saat lagi.",
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Batalkan streaming yang sedang berjalan
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Reset riwayat chat
  const handleResetChat = () => {
    handleStopStreaming();
    setMessages(INITIAL_MESSAGES);
  };

  // Saran pertanyaan cepat
  const quickPrompts = [
    "Konsentrasi keahlian apa saja yang ada?",
    "Bagaimana informasi SPMB / PPDB di SKADUTA?",
    "Berapa kontak dan di mana alamat sekolah?",
    "Apa visi dan misi SMK Negeri 2 Yogyakarta?",
  ];

  return (
    <div className="fixed bottom-5 left-5 z-50 font-sans">
      {/* Box Chatbot saat Terbuka */}
      {isOpen ? (
        <div
          className="flex flex-col overflow-hidden rounded-3xl border border-sky-200/70 bg-white/55 text-card-foreground shadow-[0_24px_70px_-24px_rgba(15,23,42,0.45)] backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          style={{
            width: "min(400px, calc(100vw - 2.5rem))",
            height: "min(580px, calc(100vh - 6rem))",
          }}
        >
          {/* Header Box */}
          <div className="flex items-center justify-between border-b border-sky-200/70 bg-linear-to-r from-sky-100/65 via-white/35 to-blue-100/45 px-4 py-3 text-foreground backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200/80 bg-white/65 shadow-sm backdrop-blur-md">
                <img
                  src="/logo.webp"
                  alt="SMKN 2 Yogyakarta"
                  className="h-6 w-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Bot className="hidden h-5 w-5 text-primary only:block" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-sm font-bold leading-none tracking-tight text-slate-800">
                  Layanan Informasi SKADUTA
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  SMKN 2 Yogyakarta •{" "}
                  <span className="font-medium text-emerald-600">
                    {serverStatus === "online" ? "Online" : "Siap"}
                  </span>
                </p>
              </div>
            </div>

            {/* Tombol Aksi Header */}
            <div className="flex items-center gap-1 text-slate-500">
              <button
                type="button"
                onClick={handleResetChat}
                title="Mulai percakapan baru"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/70 active:scale-95"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Perkecil"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/70 active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Area Percakapan (Messages List) */}
          <div className="relative flex-1 space-y-3 overflow-y-auto bg-linear-to-b from-sky-50/55 via-white/20 to-blue-50/35 p-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-200/80 bg-sky-100/80 text-primary shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-xs ${
                      isUser
                        ? "bg-primary/90 text-primary-foreground rounded-tr-xs shadow-sm"
                        : msg.error
                        ? "bg-red-50 border border-red-200 text-red-800 rounded-tl-xs"
                        : "rounded-tl-xs border border-sky-200/65 bg-sky-50/55 text-foreground shadow-sm backdrop-blur-md"
                    }`}
                  >
                    {/* Teks Pesan */}
                    <div className="space-y-1">
                      {renderFormattedText(msg.content)}
                      {msg.isStreaming && !msg.content && (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"></span>
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></span>
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></span>
                          <span className="text-[11px] ml-1">Mengetik...</span>
                        </div>
                      )}
                      {msg.isStreaming && msg.content && (
                        <span className="inline-block h-3 w-1 bg-primary ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Sumber Dokumen RAG (jika ada) */}
                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-border/70 text-[10px]">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1 font-medium">
                          <BookOpen className="h-3 w-3 text-primary" />
                          <span>Sumber Referensi:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(msg.sources)).map(
                            (source, sIdx) => (
                              <span
                                key={sIdx}
                                className="inline-block rounded-md bg-[#F0F9FF] border border-[#BAE6FD] px-1.5 py-0.5 font-mono text-[9px] text-primary"
                              >
                                {formatSourceTitle(source)}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Waktu Pesan */}
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground/75"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Saran Pertanyaan Cepat (Quick Prompts) */}
          {messages.length <= 2 && (
            <div className="border-t border-sky-200/60 bg-sky-50/35 px-3.5 py-1.5 backdrop-blur-md">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                Pertanyaan yang sering ditanyakan:
              </p>
              <div className="flex flex-wrap gap-1">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={isStreaming}
                    onClick={() => handleSendMessage(prompt)}
                    className="cursor-pointer rounded-full border border-sky-200/80 bg-white/60 px-2.5 py-1 text-[10px] text-foreground/80 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-sky-50/80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Area Form Input */}
          <div className="border-t border-sky-200/65 bg-linear-to-r from-sky-50/45 to-white/35 p-2.5 backdrop-blur-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 rounded-2xl border border-sky-200/80 bg-white/65 p-1 shadow-sm backdrop-blur-md focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Tanyakan sesuatu seputar SKADUTA..."
                disabled={isStreaming}
                className="flex-1 bg-transparent px-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
              />

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  title="Hentikan balasan"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                >
                  <Square className="h-3 w-3 fill-white" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              )}
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[9px] text-muted-foreground px-1">
              <span>SMK Negeri 2 Yogyakarta</span>
              <span>Model: {serverModel}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Tombol Floating Launcher di Pojok Kiri Bawah */
        <div className="flex flex-col items-start gap-2">
          {/* Tooltip / Balon Sapaan */}
          {showTooltip && (
            <div className="relative flex items-center gap-2 rounded-2xl border border-white/70 bg-white/65 px-3.5 py-2 text-xs text-foreground shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-left font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                Ada yang ingin ditanyakan tentang SKADUTA?
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="ml-1 text-muted-foreground/70 hover:text-foreground cursor-pointer"
                title="Tutup pesan"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 border-b border-r border-white/70 bg-white/65"></div>
            </div>
          )}

          {/* Tombol Utama Chatbot */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-sky-200/80 bg-white/60 px-4 py-2.5 text-foreground shadow-[0_14px_35px_-12px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-sky-300 hover:bg-sky-50/80 hover:shadow-2xl active:scale-95"
            aria-label="Buka Chatbot SKADUTA"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
              <Bot className="h-4 w-4 text-primary transition-transform group-hover:rotate-12" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400"></span>
              </span>
            </div>
            <div className="flex flex-col items-start pr-1">
              <span className="text-xs font-bold leading-tight tracking-wide">
                Tanya SKADUTA
              </span>
              <span className="text-[10px] text-muted-foreground leading-none">
                Layanan Informasi
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
